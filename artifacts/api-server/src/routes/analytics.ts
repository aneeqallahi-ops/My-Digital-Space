import { Router, type IRouter } from "express";
import { db, pageViewsTable } from "@workspace/db";
import { sql, desc, count } from "drizzle-orm";

const router: IRouter = Router();

router.post("/track", async (req, res) => {
  try {
    const { path } = req.body;
    if (!path || typeof path !== "string") {
      res.status(400).json({ error: "path is required" });
      return;
    }
    const sanitised = path.startsWith("/") ? path : `/${path}`;
    await db.insert(pageViewsTable).values({ path: sanitised });
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: "Failed to record view" });
  }
});

router.get("/analytics", async (_req, res) => {
  try {
    const days = 7;

    const dailyRows = await db.execute(sql`
      SELECT
        to_char(date_trunc('day', visited_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS date,
        COUNT(*)::int AS count
      FROM page_views
      WHERE visited_at >= NOW() - INTERVAL '${sql.raw(String(days))} days'
      GROUP BY 1
      ORDER BY 1 ASC
    `);

    const byPageRows = await db.execute(sql`
      SELECT path, COUNT(*)::int AS count
      FROM page_views
      GROUP BY path
      ORDER BY count DESC
      LIMIT 10
    `);

    const totalRow = await db.execute(sql`
      SELECT COUNT(*)::int AS count FROM page_views
    `);

    const todayRow = await db.execute(sql`
      SELECT COUNT(*)::int AS count FROM page_views
      WHERE visited_at >= date_trunc('day', NOW() AT TIME ZONE 'UTC')
    `);

    const weekRow = await db.execute(sql`
      SELECT COUNT(*)::int AS count FROM page_views
      WHERE visited_at >= NOW() - INTERVAL '7 days'
    `);

    res.json({
      daily: dailyRows.rows,
      byPage: byPageRows.rows,
      total: (totalRow.rows[0] as { count: number })?.count ?? 0,
      today: (todayRow.rows[0] as { count: number })?.count ?? 0,
      thisWeek: (weekRow.rows[0] as { count: number })?.count ?? 0,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
