import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface DailyRow {
  date: string;
  path: string;
  count: number;
}
interface PageRow {
  path: string;
  count: number;
}
interface AnalyticsData {
  daily: DailyRow[];
  byPage: PageRow[];
  total: number;
  today: number;
  thisWeek: number;
  days: number;
}

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/lecture-intelligence": "Lecture Intelligence",
  "/analytics": "Analytics",
};
function pageLabel(path: string) {
  return PAGE_LABELS[path] ?? path;
}

const PAGE_COLORS = [
  "hsl(221,83%,55%)",
  "hsl(160,60%,45%)",
  "hsl(38,85%,55%)",
  "hsl(280,60%,55%)",
  "hsl(0,65%,55%)",
];

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { month: "short", day: "numeric", timeZone: "UTC" });
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 p-5 rounded-sm">
      <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{label}</p>
      <p className="text-3xl font-serif font-semibold text-white">{value.toLocaleString()}</p>
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/analytics?days=7")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json() as Promise<AnalyticsData>;
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const { chartData, pages } = (() => {
    if (!data) return { chartData: [], pages: [] as string[] };

    const allPages = Array.from(new Set(data.daily.map((r) => r.path)));

    const byDateAndPage: Record<string, Record<string, number>> = {};
    for (const row of data.daily) {
      if (!byDateAndPage[row.date]) byDateAndPage[row.date] = {};
      byDateAndPage[row.date][row.path] = Number(row.count);
    }

    const days: { date: string;[key: string]: string | number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const entry: { date: string;[key: string]: string | number } = { date: formatDate(iso) };
      for (const p of allPages) {
        entry[p] = byDateAndPage[iso]?.[p] ?? 0;
      }
      days.push(entry);
    }
    return { chartData: days, pages: allPages };
  })();

  const hasData = chartData.some((d) => pages.some((p) => (d[p] as number) > 0));

  return (
    <div className="min-h-screen bg-[hsl(222,47%,6%)] text-white font-sans">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors mb-10"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Portfolio
        </a>

        <h1 className="font-serif font-semibold text-3xl sm:text-4xl text-white mb-1">Analytics</h1>
        <p className="text-sm text-white/40 mb-10">All-time page view data · self-hosted</p>

        {error && (
          <div className="border border-red-500/30 bg-red-500/10 text-red-400 text-sm px-4 py-3 rounded-sm mb-8">
            Could not load analytics. Make sure the API server is running.
          </div>
        )}

        {!data && !error && (
          <div className="text-white/30 text-sm animate-pulse">Loading…</div>
        )}

        {data && (
          <>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-10">
              <StatCard label="Total visits" value={data.total} />
              <StatCard label="Today" value={data.today} />
              <StatCard label="This week" value={data.thisWeek} />
            </div>

            <div className="border border-white/10 rounded-sm p-5 sm:p-6 mb-8">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-5">
                Daily visits by page — last 7 days
              </p>
              {!hasData ? (
                <p className="text-sm text-white/30 py-8 text-center">No visits recorded yet in the last 7 days.</p>
              ) : (
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={chartData} barSize={22}>
                    <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      allowDecimals={false}
                      tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                      axisLine={false}
                      tickLine={false}
                      width={28}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      contentStyle={{
                        background: "hsl(222,47%,9%)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 4,
                        fontSize: 12,
                        color: "#fff",
                      }}
                      itemStyle={{ color: "rgba(255,255,255,0.8)" }}
                      labelStyle={{ color: "rgba(255,255,255,0.5)", marginBottom: 2 }}
                      formatter={(value: number, key: string) => [value, pageLabel(key)]}
                    />
                    <Legend
                      formatter={(value) => (
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>{pageLabel(value)}</span>
                      )}
                    />
                    {pages.map((p, i) => (
                      <Bar
                        key={p}
                        dataKey={p}
                        name={p}
                        stackId="pages"
                        fill={PAGE_COLORS[i % PAGE_COLORS.length]}
                        radius={i === pages.length - 1 ? [3, 3, 0, 0] : undefined}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="border border-white/10 rounded-sm p-5 sm:p-6">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-4">Top pages (all time)</p>
              {data.byPage.length === 0 ? (
                <p className="text-sm text-white/30 py-4">No data yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.byPage.map((row, i) => {
                    const max = data.byPage[0].count;
                    const pct = max > 0 ? (row.count / max) * 100 : 0;
                    return (
                      <div key={row.path}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-white/70">{pageLabel(row.path)}</span>
                          <span className="text-sm text-white/50">{Number(row.count).toLocaleString()}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${pct}%`,
                              background: PAGE_COLORS[i % PAGE_COLORS.length],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
