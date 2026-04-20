import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface DailyRow {
  date: string;
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
}

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

const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/lecture-intelligence": "Lecture Intelligence",
};

function pageLabel(path: string) {
  return PAGE_LABELS[path] ?? path;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => {
        if (!r.ok) throw new Error("failed");
        return r.json() as Promise<AnalyticsData>;
      })
      .then(setData)
      .catch(() => setError(true));
  }, []);

  const chartData = data
    ? (() => {
        const map = Object.fromEntries(data.daily.map((r) => [r.date, r.count]));
        const days: { date: string; count: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date();
          d.setUTCDate(d.getUTCDate() - i);
          const iso = d.toISOString().slice(0, 10);
          days.push({ date: formatDate(iso), count: map[iso] ?? 0 });
        }
        return days;
      })()
    : [];

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
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-5">Daily visits — last 7 days</p>
              {chartData.every((d) => d.count === 0) ? (
                <p className="text-sm text-white/30 py-8 text-center">No visits recorded yet in the last 7 days.</p>
              ) : (
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={chartData} barSize={28}>
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
                    />
                    <Bar dataKey="count" name="Visits" fill="hsl(221,83%,55%)" radius={[3, 3, 0, 0]} />
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
                  {data.byPage.map((row) => {
                    const max = data.byPage[0].count;
                    const pct = max > 0 ? (row.count / max) * 100 : 0;
                    return (
                      <div key={row.path}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-white/70 font-mono">{pageLabel(row.path)}</span>
                          <span className="text-sm text-white/50">{row.count.toLocaleString()}</span>
                        </div>
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${pct}%` }}
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
