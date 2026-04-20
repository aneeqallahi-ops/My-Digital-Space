import { Router, type IRouter } from "express";
import { db, pageViewsTable } from "@workspace/db";
import { sql } from "drizzle-orm";

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
  } catch {
    res.status(500).json({ error: "Failed to record view" });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    const rawDays = Number(req.query["days"] ?? 7);
    const days = Number.isNaN(rawDays) || rawDays < 1 ? 7 : Math.min(rawDays, 365);

    const dailyByPageRows = await db.execute(sql`
      SELECT
        to_char(date_trunc('day', visited_at AT TIME ZONE 'UTC'), 'YYYY-MM-DD') AS date,
        path,
        COUNT(*)::int AS count
      FROM page_views
      WHERE visited_at >= NOW() - (${days} * INTERVAL '1 day')
      GROUP BY 1, 2
      ORDER BY 1 ASC, 3 DESC
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
      WHERE visited_at >= NOW() - (7 * INTERVAL '1 day')
    `);

    res.json({
      daily: dailyByPageRows.rows,
      byPage: byPageRows.rows,
      total: (totalRow.rows[0] as { count: number })?.count ?? 0,
      today: (todayRow.rows[0] as { count: number })?.count ?? 0,
      thisWeek: (weekRow.rows[0] as { count: number })?.count ?? 0,
      days,
    });
  } catch {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
});

export default router;
