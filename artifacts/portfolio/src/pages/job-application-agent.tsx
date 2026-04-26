import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DottedSurface } from "@/components/ui/dotted-surface";

/* ── phase data ──────────────────────────────────────────────── */

interface Phase {
  num: number;
  title: string;
  accent: string;
  panelBg: string;
  panelBorder: string;
  tools: string[];
  body: string;
  learned: string;
}

const PHASES: Phase[] = [
  {
    num: 1,
    title: "Alert Ingestion & Parsing",
    accent: "#7c3aed",
    panelBg: "#f5f3ff",
    panelBorder: "#c4b5fd",
    tools: ["n8n", "Email / Webhook"],
    body: "Job platform alerts arrive via email or webhook. n8n parses each alert for title, company, and URL, writes a new Airtable record with status Pending Assessment. Structured fields like work type and modality are captured in Phase 2 by fetching the full listing — not from the alert payload, which is too inconsistent to rely on.",
    learned: "Alert payloads vary by platform — don't rely on structured fields being present. Fetch the full listing in Phase 2 instead.",
  },
  {
    num: 2,
    title: "Relevance Assessment",
    accent: "#0d9488",
    panelBg: "#f0fdf9",
    panelBorder: "#a7f3d0",
    tools: ["Claude Haiku", "n8n", "Airtable"],
    body: "Fetches the listing page and extracts the job description via JSON-LD structured data — no fragile HTML scraping. Claude Haiku scores the role 0–10 against defined criteria (role type, seniority, deal-breakers) and generates a keyword brief for ATS optimisation downstream. Approved postings proceed to Phase 3; rejected ones are logged and archived.",
    learned: "JSON-LD over HTML scraping — most job platforms embed structured data in listing pages. Parsing that directly means the extractor never breaks on a UI redesign.",
  },
  {
    num: 3,
    title: "Resume & Cover Letter",
    accent: "#ea580c",
    panelBg: "#fff7f5",
    panelBorder: "#fed7aa",
    tools: ["Claude Sonnet", "Google Docs API", "Google Drive"],
    body: "Claude rewrites resume sections using the Phase 2 keyword brief, then generates a tailored cover letter in a second call. Both use a native Google Doc template with 7 placeholder replacements via batchUpdate. The completed documents are exported as PDFs, stored in Drive, and linked back to the Airtable record. Phase 4 is triggered automatically on completion.",
    learned: "Google Docs format trap — batchUpdate silently fails on .docx files even when stored in Drive. The template must be a native Google Docs file (File → Save as Google Docs), not an uploaded .docx.",
  },
  {
    num: 4,
    title: "Automated Submission",
    accent: "#d97706",
    panelBg: "#fffbeb",
    panelBorder: "#fde68a",
    tools: ["Skyvern", "n8n", "Slack", "Airtable"],
    body: "Skyvern (a browser-use AI agent) receives the job URL, resume, cover letter, and candidate details via API. It navigates to the portal, determines whether it's a platform-native form or an external ATS (Workday, Greenhouse, Lever), and submits. n8n polls the submission outcome, updates the Airtable record status, and fires a Slack notification with the result.",
    learned: "Slack message construction — build the full notification string inside a Code node and reference it as a single variable. Constructing multi-line strings in n8n's expression editor causes JSON parse failures on special characters.",
  },
];

/* ── complications data ──────────────────────────────────────── */

const COMPLICATIONS = [
  {
    title: "The Google Docs format trap",
    body: "The resume template was a .docx stored in Drive. batchUpdate silently fails on these even when opened in Drive. Fix: File → Save as Google Docs, update the document ID.",
  },
  {
    title: "JSON-LD over HTML scraping",
    body: "Most job platforms embed JSON-LD in listing pages — schema-compliant fields (employmentType, datePosted) that don't break on UI updates. No brittle scraper needed.",
  },
  {
    title: "Slack message construction in n8n",
    body: "Multi-line dynamic messages caused JSON parse failures on special characters. Build the full string inside a Code node, reference as a single variable in the HTTP node.",
  },
  {
    title: "Cross-node data without merging",
    body: "The cover letter node needed Phase 2 keyword data. n8n's $('Node').item.json.fieldName syntax gives direct reference — no merge node needed, the workflow stays linear and debuggable.",
  },
];

/* ── stack data ──────────────────────────────────────────────── */

const STACK = [
  { role: "Orchestration", tech: "n8n (self-hosted, webhook-triggered between phases)" },
  { role: "AI / LLM", tech: "Anthropic Claude — Haiku for extraction & scoring, Sonnet for generation" },
  { role: "Browser automation", tech: "Skyvern (AI browser-use agent for form navigation and submission)" },
  { role: "Data store", tech: "Airtable (central job tracking, status management)" },
  { role: "Document generation", tech: "Google Docs batchUpdate API + Google Drive (PDF export)" },
  { role: "Notifications", tech: "Slack (batch launch confirmation, submission outcome)" },
];

/* ── architecture phases ─────────────────────────────────────── */

const ARCH = [
  { num: 1, accent: "#7c3aed", label: "Phase 1", lines: ["Job alert", "→ n8n", "→ Airtable"] },
  { num: 2, accent: "#0d9488", label: "Phase 2", lines: ["Fetch listing", "→ Claude score", "→ approve/reject"] },
  { num: 3, accent: "#ea580c", label: "Phase 3", lines: ["Claude resume +", "cover letter →", "Google Doc → PDF → Drive"] },
  { num: 4, accent: "#d97706", label: "Phase 4", lines: ["Webhook → Skyvern", "→ poll →", "Airtable + Slack"] },
];

/* ── hero tool pills ─────────────────────────────────────────── */

const HERO_TOOLS = ["n8n", "Claude AI", "Skyvern", "Airtable", "Google Docs API", "Slack"];

const ease = [0.16, 1, 0.3, 1] as const;

/* ── nav ─────────────────────────────────────────────────────── */

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 h-[64px] bg-[hsl(222,47%,7%)]/90 backdrop-blur-xl border-b border-white/10">
      <Link href="/">
        <span className="font-serif font-bold text-xl text-white tracking-tight cursor-pointer">AA.</span>
      </Link>
      <Link href="/">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white/80 transition-colors cursor-pointer">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Portfolio
        </span>
      </Link>
    </nav>
  );
}

/* ── desktop stepper ─────────────────────────────────────────── */

function DesktopStepper({ active, setActive }: { active: number; setActive: (n: number) => void }) {
  const phase = PHASES[active - 1];

  return (
    <div>
      {/* track */}
      <div className="flex items-center gap-0 mb-8">
        {PHASES.map((p, i) => (
          <div key={p.num} className="flex items-center flex-1 last:flex-none">
            {/* node */}
            <button
              onClick={() => setActive(p.num)}
              className="relative flex-shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-all duration-300 focus:outline-none"
              style={{
                borderColor: active >= p.num ? p.accent : "#d1d5db",
                backgroundColor: active === p.num ? p.accent : active > p.num ? p.accent + "22" : "#fff",
                color: active === p.num ? "#fff" : active > p.num ? p.accent : "#6b7280",
                boxShadow: active === p.num ? `0 0 0 4px ${p.accent}25` : "none",
              }}
            >
              {active > p.num ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                p.num
              )}
            </button>
            {/* connector */}
            {i < PHASES.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-gray-200 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 transition-all duration-500"
                  style={{
                    right: active > p.num ? "0%" : "100%",
                    backgroundColor: p.accent,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* phase labels */}
      <div className="flex mb-8">
        {PHASES.map((p, i) => (
          <div key={p.num} className="flex-1" style={{ maxWidth: i < PHASES.length - 1 ? undefined : "none" }}>
            <p
              className="text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
              style={{ color: active === p.num ? p.accent : "#9ca3af" }}
            >
              Phase {p.num}
            </p>
            <p
              className="text-sm font-medium mt-0.5 transition-colors duration-200"
              style={{ color: active === p.num ? "#111827" : "#6b7280" }}
            >
              {p.title}
            </p>
          </div>
        ))}
      </div>

      {/* detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease }}
          className="rounded-sm border-l-4 p-6 sm:p-8"
          style={{
            backgroundColor: phase.panelBg,
            borderColor: phase.accent,
            borderLeftWidth: 4,
          }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <span
                className="inline-block text-[10px] uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-full mb-2"
                style={{ backgroundColor: phase.accent + "18", color: phase.accent }}
              >
                Phase {phase.num}
              </span>
              <h3 className="font-serif font-semibold text-xl text-gray-900">{phase.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {phase.tools.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-0.5 rounded-full border font-medium"
                  style={{ borderColor: phase.panelBorder, color: phase.accent, backgroundColor: "#fff" }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-5">{phase.body}</p>

          {/* learned the hard way */}
          <div
            className="rounded-sm border p-4"
            style={{ backgroundColor: "#fffbeb", borderColor: "#fde68a" }}
          >
            <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-600 mb-1.5">Learned the hard way</p>
            <p className="text-sm text-amber-900 leading-relaxed">{phase.learned}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* navigation arrows */}
      <div className="flex gap-3 mt-5">
        <button
          onClick={() => setActive(Math.max(1, active - 1))}
          disabled={active === 1}
          className="px-4 py-2 text-sm border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Prev
        </button>
        <button
          onClick={() => setActive(Math.min(4, active + 1))}
          disabled={active === 4}
          className="px-4 py-2 text-sm border border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

/* ── mobile stepper (accordion) ──────────────────────────────── */

function MobileStepper() {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {PHASES.map((p) => (
        <AccordionItem
          key={p.num}
          value={String(p.num)}
          className="border rounded-sm overflow-hidden"
          style={{ borderColor: p.panelBorder }}
        >
          <AccordionTrigger
            className="px-4 py-3 hover:no-underline"
            style={{ backgroundColor: p.panelBg }}
          >
            <div className="flex items-center gap-3 text-left">
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: p.accent }}
              >
                {p.num}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: p.accent }}>
                  Phase {p.num}
                </p>
                <p className="text-sm font-medium text-gray-900">{p.title}</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-4 pt-3" style={{ backgroundColor: p.panelBg }}>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {p.tools.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2 py-0.5 rounded-full border font-medium"
                  style={{ borderColor: p.panelBorder, color: p.accent }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed mb-4">{p.body}</p>
            <div className="rounded-sm border p-3 bg-amber-50 border-amber-200">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-600 mb-1">Learned the hard way</p>
              <p className="text-xs text-amber-900 leading-relaxed">{p.learned}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/* ── main page ───────────────────────────────────────────────── */

export default function JobApplicationAgentPage() {
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    document.title = "Autonomous Job Application Agent — Aneeq Allahi";
    return () => { document.title = "Aneeq Allahi"; };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />

      {/* ── hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-[72vh] flex items-center pt-16"
        style={{ background: "linear-gradient(135deg, hsl(222,47%,6%) 0%, hsl(230,40%,10%) 100%)" }}
      >
        <DottedSurface />
        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
          <motion.p
            className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-semibold mb-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Automation · AI Pipeline
          </motion.p>
          <motion.h1
            className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
          >
            Autonomous Job<br />Application Agent
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg text-white/65 max-w-2xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease }}
          >
            An end-to-end pipeline that monitors job platforms, assesses relevance, tailors application materials, and submits — fully automated from alert to submitted form.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            {HERO_TOOLS.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full border border-white/20 text-white/70 font-medium backdrop-blur-sm"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>
        {/* bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(var(--background)))" }} />
      </section>

      {/* ── content ──────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 py-16 sm:py-20 space-y-20">

        {/* the problem */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">The problem</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-5">Why build this?</h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
            The average professional job application takes 45–90 minutes to do properly — tailoring a resume, writing a cover letter, researching the company, navigating the portal. For someone applying at scale to consulting and knowledge-intensive roles, that's not a process; it's a second job. I built an autonomous agent to compress it end-to-end.
          </p>
        </motion.section>

        {/* stepper */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">The pipeline</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-8">Four phases, zero manual steps</h2>

          {/* desktop stepper */}
          <div className="hidden md:block">
            <DesktopStepper active={activePhase} setActive={setActivePhase} />
          </div>

          {/* mobile accordion */}
          <div className="block md:hidden">
            <MobileStepper />
          </div>
        </motion.section>

        {/* architecture diagram */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">Architecture</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-8">End-to-end pipeline</h2>

          <div className="border border-border rounded-sm overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4">
              {ARCH.map((a, i) => (
                <div
                  key={a.num}
                  className={`p-5 ${i < ARCH.length - 1 ? "border-b md:border-b-0 md:border-r border-dashed border-border" : ""}`}
                >
                  <div
                    className="text-[10px] uppercase tracking-widest font-bold mb-3 pb-2 border-b"
                    style={{ color: a.accent, borderColor: a.accent + "40" }}
                  >
                    {a.label}
                  </div>
                  {a.lines.map((l, li) => (
                    <p key={li} className="text-xs text-muted-foreground leading-relaxed">
                      {l}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* complications grid */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">What we figured out</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-8">Complications & solutions</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {COMPLICATIONS.map((c) => (
              <Card key={c.title} className="border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-foreground">{c.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* stack table */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">Stack</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-8">Tools & technologies</h2>

          <div className="border border-border rounded-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-40 font-semibold text-foreground text-xs uppercase tracking-wider py-3 px-5">Layer</TableHead>
                  <TableHead className="font-semibold text-foreground text-xs uppercase tracking-wider py-3 px-5">Technology</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STACK.map((s) => (
                  <TableRow key={s.role}>
                    <TableCell className="py-3.5 px-5 text-sm font-medium text-foreground whitespace-nowrap">{s.role}</TableCell>
                    <TableCell className="py-3.5 px-5 text-sm text-muted-foreground">{s.tech}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.section>

        {/* status */}
        <motion.section
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="pb-8"
        >
          <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground font-semibold mb-3">Status</p>
          <h2 className="font-serif font-semibold text-2xl sm:text-3xl text-foreground mb-5">Where it stands</h2>
          <div className="max-w-2xl space-y-4">
            <p className="text-base text-muted-foreground leading-relaxed">
              The full four-phase pipeline is built and operational. Phases 1 and 2 run daily, processing job platform alerts automatically. Phase 3 generates tailored resumes and cover letters on approval. Phase 4 handles submission across platform-native forms and external ATS portals.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              One honest limitation: Skyvern occasionally encounters portals requiring fresh authentication. These are flagged via Slack rather than retried — a deliberate choice to keep the human in the loop for edge cases.
            </p>
          </div>
        </motion.section>

      </div>

      {/* footer */}
      <footer className="border-t border-border py-8 px-5 sm:px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-serif font-bold text-lg text-muted-foreground">AA.</span>
          <p className="text-xs text-muted-foreground font-light">
            © {new Date().getFullYear()} Aneeq Allahi
          </p>
        </div>
      </footer>
    </div>
  );
}
