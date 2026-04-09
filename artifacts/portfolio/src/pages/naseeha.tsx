import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";

/* ── types ──────────────────────────────────────────────────── */

type NodeType = "trigger" | "processing" | "conditional" | "human-review" | "output";

interface PipelineNode {
  id: string;
  step: number;
  type: NodeType;
  label: string;
  sublabel: string;
  description: string;
  detail: string;
  side?: "left" | "right";
}

/* ── colour palette by node type ────────────────────────────── */

const COLORS: Record<NodeType, { border: string; bg: string; glow: string; text: string; badge: string }> = {
  trigger:      { border: "#22c55e", bg: "rgba(34,197,94,0.08)",   glow: "rgba(34,197,94,0.35)",   text: "#4ade80", badge: "Trigger" },
  processing:   { border: "#6366f1", bg: "rgba(99,102,241,0.08)",  glow: "rgba(99,102,241,0.35)",  text: "#818cf8", badge: "Processing" },
  conditional:  { border: "#f59e0b", bg: "rgba(245,158,11,0.08)",  glow: "rgba(245,158,11,0.35)",  text: "#fbbf24", badge: "Conditional" },
  "human-review":{ border: "#f43f5e", bg: "rgba(244,63,94,0.08)",  glow: "rgba(244,63,94,0.35)",   text: "#fb7185", badge: "Human-in-the-Loop" },
  output:       { border: "#14b8a6", bg: "rgba(20,184,166,0.08)",  glow: "rgba(20,184,166,0.35)",  text: "#2dd4bf", badge: "Output" },
};

/* ── pipeline node data ──────────────────────────────────────── */

const NODES: PipelineNode[] = [
  {
    id: "drive", step: 0, type: "trigger",
    label: "Google Drive Trigger", sublabel: "New lecture file uploaded",
    description: "The pipeline activates the moment a new lecture recording appears in the designated Google Drive folder — no manual trigger, no human involvement at this stage.",
    detail: "n8n Google Drive Trigger Node",
  },
  {
    id: "wait", step: 1, type: "processing",
    label: "Wait Node", sublabel: "Transcript build buffer",
    description: "A configurable time buffer pauses execution after the Drive trigger, giving AssemblyAI sufficient processing time before the transcript fetch is attempted. Prevents failed pulls on large audio files.",
    detail: "Configurable delay · Prevents failed fetches",
  },
  {
    id: "assemblyai", step: 2, type: "processing",
    label: "AssemblyAI Transcription", sublabel: "Arabic · English · Urdu",
    description: "The audio is passed to AssemblyAI via its native n8n integration. Multilingual transcription runs across all three languages present in the lecture in a single pass.",
    detail: "AssemblyAI Universal-1 · Native n8n node",
  },
  {
    id: "context-check", step: 3, type: "conditional",
    label: "Context Notes Check", sublabel: "IF / conditional branch",
    description: "An IF node checks whether the lecturer submitted pre-lecture context notes for this session. Two downstream paths are available depending on the result.",
    detail: "n8n IF Node · Boolean condition · Two branches",
  },
  {
    id: "no-notes", step: 4, type: "conditional",
    label: "Transcript Only", sublabel: "No notes branch",
    description: "When no context notes exist, the pipeline routes the raw transcript alone to the LLM, which generates the summary from the audio content exclusively.",
    detail: "Lean path · Raw transcript → LLM",
    side: "left",
  },
  {
    id: "with-notes", step: 4, type: "conditional",
    label: "Transcript + Context", sublabel: "With notes branch",
    description: "When notes are present, they are merged with the transcript before summarisation — enriching the LLM output with the lecturer's own framing, references, and thematic intent.",
    detail: "Enriched path · Notes + Transcript → LLM",
    side: "right",
  },
  {
    id: "merged", step: 5, type: "conditional",
    label: "Merged Branch", sublabel: "Both paths converge here",
    description: "Both conditional paths reconverge at a merge node before entering the summarisation stage, ensuring a consistent downstream flow regardless of which branch was taken.",
    detail: "n8n Merge Node · Unified pipeline output",
  },
  {
    id: "llm", step: 6, type: "processing",
    label: "LLM Summarisation", sublabel: "System prompt + message prompt",
    description: "Claude Haiku generates a structured summary covering key points, Quranic and Hadith references, and thematic takeaways. The system prompt defines organisational tone and output structure; the message prompt carries session-specific inputs.",
    detail: "Claude Haiku · Role-segregated for credit efficiency",
  },
  {
    id: "google-doc", step: 7, type: "processing",
    label: "Branded Google Doc Template", sublabel: "HTTP node → paste + append",
    description: "The summary is inserted into a pre-designed Google Doc template via a structured HTTP node call, preserving Naseeha's logos, typography, section headers, and formatting throughout.",
    detail: "HTTP Node · Google Docs API · Template injection",
  },
  {
    id: "human-review", step: 8, type: "human-review",
    label: "Human-in-the-Loop Review", sublabel: "Editable Google Doc · approval logic",
    description: "The draft is routed to designated reviewers via a shared editable Google Doc link. The pipeline holds at this stage until the configured approval condition is satisfied.",
    detail: "Google Doc share link · Configurable hold",
  },
  {
    id: "approval", step: 9, type: "human-review",
    label: "Approval Logic Options", sublabel: "Any 1 of 4 · min 2 · expert feedback loop",
    description: "Three approval modes: any one of four reviewers approves via a one-click email link; a minimum of two must approve; or a reviewer submits feedback that is looped back into the LLM for auto-edits before final re-review.",
    detail: "3 configurable modes · LLM feedback loop supported",
  },
  {
    id: "pdf", step: 10, type: "processing",
    label: "PDF Generation", sublabel: "Branded template → convert to PDF",
    description: "The approved Google Doc is converted to a formatted PDF, retaining all organisational branding — ready for WhatsApp distribution to registered attendees.",
    detail: "Google Docs → PDF · Full branding preserved",
  },
  {
    id: "sheets", step: 11, type: "processing",
    label: "Google Sheets Query", sublabel: "Filter registrants: last 7 days only",
    description: "Registration data from the session's Google Form is queried and filtered to only include participants who signed up within the past 7 days, preventing repeat delivery and maintaining clean data hygiene.",
    detail: "Google Sheets API · 7-day filter · Deduplication",
  },
  {
    id: "loop", step: 12, type: "processing",
    label: "Loop Over Registrants", sublabel: "Wait between sends · anti-spam buffer",
    description: "The pipeline iterates over each registrant entry with a configurable delay inserted between each WhatsApp send — preventing API spam detection and ensuring reliable, throttled delivery.",
    detail: "n8n Loop Node · Configurable delay · Anti-spam guard",
  },
  {
    id: "whatsapp", step: 13, type: "output",
    label: "WhatsApp Dispatch (WHAPI)", sublabel: "Personalised name + session title per send",
    description: "Each registrant receives a personalised WhatsApp message — addressed by name, referencing the specific lecture session they attended — with the branded PDF attached via WHAPI's HTTP integration.",
    detail: "WHAPI · HTTP Node · Personalised per recipient",
  },
  {
    id: "tracking", step: 14, type: "output",
    label: "Attendance & Funnel Tracking", sublabel: "Repeat participants · stream transitions",
    description: "Registration data feeds a longitudinal attendance dataset, building a week-by-week picture of repeat participants and tracking which attendees transition into other Naseeha programme offerings over time.",
    detail: "Google Sheets dataset · Funnel analytics · Long-term tracking",
  },
];

const TOTAL_STEPS = 15;
const STEP_MS = 750;
const END_PAUSE_MS = 1400;

/* ── animated connector (SVG stroke-dashoffset) ──────────────── */

function Connector({ active, color, height = 48 }: { active: boolean; color: string; height?: number }) {
  return (
    <svg width="12" height={height} className="block mx-auto overflow-visible" aria-hidden="true">
      {/* static track */}
      <line x1="6" y1="0" x2="6" y2={height} stroke={`${color}22`} strokeWidth="2" />
      {/* animated data-flow: CSS stroke-dasharray + stroke-dashoffset */}
      <motion.line
        x1="6" y1="0" x2="6" y2={height}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 8"
        animate={active
          ? { strokeDashoffset: [0, -16], opacity: 0.9 }
          : { opacity: 0 }
        }
        transition={active
          ? {
              strokeDashoffset: { duration: 0.4, ease: "linear", repeat: Infinity, repeatType: "loop" },
              opacity: { duration: 0.15 },
            }
          : { duration: 0.15 }
        }
      />
    </svg>
  );
}

/* ── branch connector SVGs ───────────────────────────────────── */

function SplitConnector({ active }: { active: boolean }) {
  const c = COLORS["conditional"];
  const dashProps = { strokeDasharray: "5 3", strokeWidth: 1.5, fill: "none" as const };
  return (
    <svg viewBox="0 0 400 52" preserveAspectRatio="none" width="100%" height="52" className="block">
      {/* track */}
      <path d="M 200 0 L 200 22 L 110 52" stroke={`${c.border}33`} {...dashProps} />
      <path d="M 200 0 L 200 22 L 290 52" stroke={`${c.border}33`} {...dashProps} />
      {/* animated flow via stroke-dashoffset */}
      <motion.path
        d="M 200 0 L 200 22 L 110 52"
        stroke={c.border} {...dashProps}
        animate={active ? { strokeDashoffset: [0, -8], opacity: 1 } : { opacity: 0.3 }}
        transition={active ? { strokeDashoffset: { duration: 0.35, ease: "linear", repeat: Infinity }, opacity: { duration: 0.15 } } : { duration: 0.15 }}
      />
      <motion.path
        d="M 200 0 L 200 22 L 290 52"
        stroke={c.border} {...dashProps}
        animate={active ? { strokeDashoffset: [0, -8], opacity: 1 } : { opacity: 0.3 }}
        transition={active ? { strokeDashoffset: { duration: 0.35, ease: "linear", repeat: Infinity }, opacity: { duration: 0.15 } } : { duration: 0.15 }}
      />
    </svg>
  );
}

function MergeConnector({ active }: { active: boolean }) {
  const c = COLORS["conditional"];
  const dashProps = { strokeDasharray: "5 3", strokeWidth: 1.5, fill: "none" as const };
  return (
    <svg viewBox="0 0 400 52" preserveAspectRatio="none" width="100%" height="52" className="block">
      {/* track */}
      <path d="M 110 0 L 200 30 L 200 52" stroke={`${c.border}33`} {...dashProps} />
      <path d="M 290 0 L 200 30 L 200 52" stroke={`${c.border}33`} {...dashProps} />
      {/* animated flow via stroke-dashoffset */}
      <motion.path
        d="M 110 0 L 200 30 L 200 52"
        stroke={c.border} {...dashProps}
        animate={active ? { strokeDashoffset: [0, -8], opacity: 1 } : { opacity: 0.3 }}
        transition={active ? { strokeDashoffset: { duration: 0.35, ease: "linear", repeat: Infinity }, opacity: { duration: 0.15 } } : { duration: 0.15 }}
      />
      <motion.path
        d="M 290 0 L 200 30 L 200 52"
        stroke={c.border} {...dashProps}
        animate={active ? { strokeDashoffset: [0, -8], opacity: 1 } : { opacity: 0.3 }}
        transition={active ? { strokeDashoffset: { duration: 0.35, ease: "linear", repeat: Infinity }, opacity: { duration: 0.15 } } : { duration: 0.15 }}
      />
    </svg>
  );
}

/* ── single pipeline node box ────────────────────────────────── */

function NodeBox({
  node, isActive, isSelected, onClick,
}: {
  node: PipelineNode; isActive: boolean; isSelected: boolean; onClick: () => void;
}) {
  const c = COLORS[node.type];

  return (
    <motion.div
      layout
      className="w-full cursor-pointer select-none"
      style={{ maxWidth: node.side ? "100%" : 380 }}
      onClick={onClick}
    >
      <motion.div
        animate={isActive ? { scale: 1.03 } : { scale: 1 }}
        transition={{ duration: 0.25 }}
        className="border px-4 py-3 transition-all duration-300"
        style={{
          borderColor: isActive || isSelected ? c.border : `${c.border}44`,
          background: isActive || isSelected ? c.bg : "rgba(255,255,255,0.02)",
          boxShadow: isActive ? `0 0 20px ${c.glow}, 0 0 40px ${c.glow}` : isSelected ? `0 0 12px ${c.glow}` : "none",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* status dot */}
            <span
              className="shrink-0 w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: isActive ? c.text : `${c.border}66`,
                boxShadow: isActive ? `0 0 6px ${c.text}` : "none",
              }}
            />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white leading-tight truncate" style={{ color: isActive || isSelected ? c.text : "#e2e8f0" }}>
                {node.label}
              </p>
              <p className="text-xs mt-0.5 truncate" style={{ color: `${c.text}88` }}>
                {node.sublabel}
              </p>
            </div>
          </div>
          <span
            className="shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 border"
            style={{ borderColor: `${c.border}55`, color: c.text, background: `${c.bg}` }}
          >
            {c.badge}
          </span>
        </div>
      </motion.div>

      {/* expanded detail panel */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div
              className="px-4 py-4 border-x border-b text-sm"
              style={{ borderColor: `${c.border}44`, background: `${c.bg}` }}
            >
              <p className="text-white/70 font-light leading-relaxed mb-3">{node.description}</p>
              <span
                className="inline-block text-[11px] font-medium px-2.5 py-1 border"
                style={{ borderColor: `${c.border}55`, color: c.text }}
              >
                {node.detail}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── main pipeline diagram ───────────────────────────────────── */

function PipelineDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const endPauseRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stepRef = useRef(0);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    if (endPauseRef.current) { clearTimeout(endPauseRef.current); endPauseRef.current = null; }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    timerRef.current = setInterval(() => {
      const next = (stepRef.current + 1) % TOTAL_STEPS;
      if (next === 0) {
        stopTimer();
        endPauseRef.current = setTimeout(() => {
          endPauseRef.current = null;
          stepRef.current = 0;
          setActiveStep(0);
          startTimer();
        }, END_PAUSE_MS);
      } else {
        stepRef.current = next;
        setActiveStep(next);
      }
    }, STEP_MS);
  }, [stopTimer]);

  useEffect(() => {
    if (isPlaying) {
      startTimer();
    } else {
      stopTimer();
    }
    return stopTimer;
  }, [isPlaying, startTimer, stopTimer]);

  function handleNodeClick(id: string, step: number) {
    if (selectedId === id) {
      setSelectedId(null);
      setIsPlaying(true);
    } else {
      setSelectedId(id);
      setIsPlaying(false);
      stepRef.current = step;
      setActiveStep(step);
    }
  }

  function handleResume() {
    setSelectedId(null);
    setIsPlaying(true);
  }

  const mainNodes = NODES.filter(n => !n.side);
  const leftBranch = NODES.find(n => n.side === "left")!;
  const rightBranch = NODES.find(n => n.side === "right")!;

  function isNodeActive(node: PipelineNode) { return activeStep === node.step; }
  function isNodeSelected(node: PipelineNode) { return selectedId === node.id; }

  // Render the sequence: drive(0), wait(1), assemblyai(2), context-check(3),
  // [branch split], no-notes(4) | with-notes(4), [merge], merged(5), llm(6)...
  const beforeBranch = mainNodes.filter(n => n.step <= 3);
  const afterBranch = mainNodes.filter(n => n.step >= 5);

  return (
    <section className="py-20 px-6" style={{ background: "#080f1a" }}>
      <div className="max-w-3xl mx-auto">
        {/* header */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Pipeline Visualisation</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-white mb-4">How the Pipeline Works — End to End</h2>
          <p className="text-white/50 text-sm font-light max-w-lg mx-auto leading-relaxed">
            Click any node to inspect it. The animation pauses so you can read — resume when ready.
          </p>
        </div>

        {/* legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          {(Object.entries(COLORS) as [NodeType, typeof COLORS[NodeType]][]).map(([type, c]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: c.border }} />
              <span className="text-xs text-white/40 font-medium">{c.badge}</span>
            </div>
          ))}
        </div>

        {/* controls */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => { if (isPlaying) { setIsPlaying(false); } else { handleResume(); } }}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-widest border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            {isPlaying ? (
              <><span className="w-3 h-3 grid grid-cols-2 gap-0.5"><span className="bg-current"/><span className="bg-current"/></span>Pause</>
            ) : (
              <><span>▶</span>Resume</>
            )}
          </button>
        </div>

        {/* diagram */}
        <div className="flex flex-col items-center">
          {/* nodes before branch */}
          {beforeBranch.map((node, i) => (
            <div key={node.id} className="w-full flex flex-col items-center" style={{ maxWidth: 380 }}>
              {i > 0 && (
                <Connector
                  active={activeStep === node.step}
                  color={COLORS[node.type].border}
                />
              )}
              <NodeBox
                node={node}
                isActive={isNodeActive(node)}
                isSelected={isNodeSelected(node)}
                onClick={() => handleNodeClick(node.id, node.step)}
              />
            </div>
          ))}

          {/* branch split */}
          <div className="w-full" style={{ maxWidth: 380 }}>
            <SplitConnector active={activeStep === 4} />
          </div>

          {/* branch nodes — single column on mobile, two on md+ */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxWidth: 380 }}>
            {[leftBranch, rightBranch].map((node) => (
              <NodeBox
                key={node.id}
                node={node}
                isActive={isNodeActive(node)}
                isSelected={isNodeSelected(node)}
                onClick={() => handleNodeClick(node.id, node.step)}
              />
            ))}
          </div>

          {/* merge connectors */}
          <div className="w-full" style={{ maxWidth: 380 }}>
            <MergeConnector active={activeStep === 5} />
          </div>

          {/* nodes after branch */}
          {afterBranch.map((node) => (
            <div key={node.id} className="w-full flex flex-col items-center" style={{ maxWidth: 380 }}>
              <NodeBox
                node={node}
                isActive={isNodeActive(node)}
                isSelected={isNodeSelected(node)}
                onClick={() => handleNodeClick(node.id, node.step)}
              />
              {node.step < 14 && (
                <Connector
                  active={activeStep === node.step + 1}
                  color={COLORS[afterBranch.find(n => n.step === node.step + 1)?.type ?? node.type].border}
                />
              )}
            </div>
          ))}
        </div>

        {/* resume hint when paused */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center mt-10"
            >
              <button
                onClick={handleResume}
                className="text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
              >
                ▶ Resume animation
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── nav ─────────────────────────────────────────────────────── */

function NaseehaNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-white/5 backdrop-blur-md border-b border-white/10"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <Link href="/" className={`font-serif font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
          AA.
        </Link>
        <Link
          href="/"
          onClick={() => { setTimeout(() => { document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" }); }, 80); }}
          className={`text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
            scrolled ? "text-muted-foreground hover:text-foreground" : "text-white/70 hover:text-white"
          }`}
        >
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
          Back to Portfolio
        </Link>
      </div>
    </nav>
  );
}

/* ── hero ────────────────────────────────────────────────────── */

function NaseehaHero() {
  return (
    <section className="relative min-h-[52vh] flex flex-col justify-end overflow-hidden" style={{ background: "#0c1220" }}>
      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* left accent */}
      <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-primary/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 md:px-14 xl:px-20 pt-40 pb-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-5">
            AI · Automation
          </span>
          <h1 className="font-serif text-4xl md:text-5xl xl:text-6xl font-semibold text-white leading-[1.05] tracking-tight mb-6">
            Lecture Intelligence<br className="hidden md:block" /> Pipeline
          </h1>
          <p className="text-white/60 font-light leading-relaxed text-base md:text-lg max-w-2xl mb-8">
            An end-to-end n8n automation that transcribes multilingual weekly Islamic lectures, generates AI-powered summaries, routes them through a human review workflow, formats branded PDFs, and delivers them personally to registered attendees over WhatsApp — turning each physical gathering into a scalable digital content loop.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
            <span className="text-sm text-white/40 font-light">
              Built for <span className="text-white/70 font-medium">Naseeha</span> — a non-profit dedicated to the academic study of Islam, running a recurring weekly lecture series in Lahore.
            </span>
          </div>
        </motion.div>
      </div>

      {/* wave */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20" style={{ lineHeight: 0 }}>
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full" style={{ display: "block", height: 60 }}>
          <path d="M0,40 C480,10 960,55 1440,30 L1440,60 L0,60 Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}

/* ── goal section ────────────────────────────────────────────── */

const GOALS = [
  {
    num: "01",
    title: "Capture and Scale the Physical Footprint",
    body: "Create a digital content artefact — a summarised, branded PDF — that gives attendees a reason to register in person and extends the session's value beyond the physical gathering.",
  },
  {
    num: "02",
    title: "Track Repeat Attendance",
    body: "Build a longitudinal picture of who is returning week after week, giving the institute its first systematic view of its most engaged community members.",
  },
  {
    num: "03",
    title: "Map Funnel Transitions",
    body: "Understand which regular attendees move into deeper institute offerings — advanced courses, volunteer programmes, structured study circles — providing a complete view of community engagement depth.",
  },
];

function GoalSection() {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">The Goal</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-5">What We Were Trying to Solve</h2>
          <p className="text-muted-foreground font-light leading-relaxed max-w-2xl">
            Naseeha's weekly lectures were reaching people in the room — but stopping there. No systematic way to extend the session's value, no attendance intelligence, no funnel visibility. The pipeline was designed to address three interconnected goals simultaneously — without any manual overhead.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {GOALS.map(g => (
            <div key={g.num} className="border border-border/50 p-7">
              <span className="block font-serif text-4xl font-semibold text-primary/20 mb-5 leading-none">{g.num}</span>
              <h3 className="text-base font-semibold text-foreground mb-3 leading-snug">{g.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── architecture section ────────────────────────────────────── */

const ARCH = [
  {
    title: "Conditional and Merged Branching",
    body: "Not every session comes with pre-lecture context notes from the lecturer. The pipeline handles this gracefully through a conditional IF branch: when context notes are present, they are merged with the transcript before being passed to the LLM, enriching the summary with the lecturer's own framing and references. When absent, the pipeline routes to a separate branch that proceeds with the transcript alone. Both branches converge at a merge node before entering summarisation — ensuring a consistent downstream structure regardless of the path taken.",
  },
  {
    title: "Human-in-the-Loop with Configurable Approval Logic",
    body: "The review stage is built to be flexible rather than fixed. Three approval modes can be configured: any one of four designated reviewers can approve via a one-click email link; a minimum of two reviewers must approve before the pipeline proceeds; or a reviewer (such as a religious scholar) can submit written feedback, which is automatically looped back into the LLM for targeted edits and regeneration before routing back for final sign-off.",
  },
  {
    title: "Branded Templating via HTTP Node",
    body: "Rather than generating a plain-text output, the pipeline populates a pre-designed Google Doc template carrying the organisation's branding — logo, typography, section headers, and formatting. Content is inserted and appended to the correct sections via a structured HTTP node call, ensuring every PDF looks like an official Naseeha publication rather than a raw LLM output.",
  },
  {
    title: "LLM Role Segregation for Credits Efficiency",
    body: "The summarisation workstream uses Claude Haiku — capable enough for nuanced, structured multilingual comprehension while remaining cost-efficient. The system prompt defines organisational context, tone, and output structure; the message prompt passes session-specific inputs. This separation keeps the model focused and the outputs consistent across weeks without over-spending on heavier models for routine tasks.",
  },
  {
    title: "Guard Rails and Wait Nodes",
    body: "Two deliberate guards sit in the pipeline. A wait node after the Drive trigger gives AssemblyAI sufficient processing time before the transcript fetch is attempted — preventing failed pulls on large audio files. A configurable loop delay is inserted between each WhatsApp send within the registrant iteration, preventing the WHAPI account from being flagged for bulk messaging and ensuring reliable delivery.",
  },
  {
    title: "WhatsApp Loop and Anti-Spam Architecture",
    body: "The Google Sheets query applies a 7-day date filter to the registration data before the loop begins — ensuring only participants from the current week receive the summary and preventing accidental re-delivery to prior attendees. Each loop iteration dispatches a personalised message with the recipient's name and the specific session title, giving the delivery a personal rather than broadcast feel despite being fully automated.",
  },
];

function ArchitectureSection() {
  return (
    <section className="py-20 px-6 bg-background border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Technical Architecture</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">Under the Hood — What Makes It Work</h2>
        </div>
        <div className="space-y-10">
          {ARCH.map((item, i) => (
            <div key={i} className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-10">
              <h3 className="text-sm font-semibold text-foreground leading-snug pt-0.5">{item.title}</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── outcomes section ────────────────────────────────────────── */

const OUTCOMES = [
  "Deployed a fully automated multilingual transcription and summarisation pipeline across Arabic, English, and Urdu — eliminating all manual transcription and note-taking overhead for a recurring weekly event.",
  "Built a configurable human-in-the-loop review layer with three approval modes and an expert feedback loop, ensuring every output meets the organisation's scholarly and editorial standards before distribution.",
  "Established a physical-to-digital attendance capture mechanism — each in-person registrant receives a personalised AI-generated summary via WhatsApp, creating a tangible incentive for sign-up and building a longitudinal attendance dataset.",
  "Created the data infrastructure to track repeat participation and funnel transitions across Naseeha's programme offerings — giving the institute its first systematic view of community engagement depth.",
  "Automated branded PDF generation from a pre-designed organisational template, ensuring every distributed document is visually consistent with Naseeha's identity.",
];

function OutcomesSection() {
  return (
    <section className="py-20 px-6 bg-muted/30 border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Key Outcomes</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">What This Delivered</h2>
        </div>
        <ul className="space-y-5">
          {OUTCOMES.map((o, i) => (
            <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground font-light leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── tools section ───────────────────────────────────────────── */

const TOOL_LOGOS = [
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "AssemblyAI", slug: "assemblyai", color: "00D4AA" },
  { name: "Anthropic", slug: "anthropic", color: "D4A27F" },
  { name: "Google Drive", slug: "googledrive", color: "4285F4" },
  { name: "Google Docs", slug: "googledocs", color: "4285F4" },
  { name: "Google Sheets", slug: "googlesheets", color: "34A853" },
  { name: "WhatsApp", slug: "whatsapp", color: "25D366" },
];

const TOOL_TAGS = [
  "n8n Automation", "AssemblyAI", "Claude Haiku (LLM)", "Google Drive",
  "Google Docs", "Google Sheets", "WhatsApp API (WHAPI)", "HTTP Node",
  "PDF Conversion", "Conditional Branching", "Multilingual Transcription",
  "Human-in-the-Loop Workflow", "Workflow Orchestration",
];

function ToolsSection() {
  return (
    <section className="py-20 px-6 bg-background border-t border-border/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest font-semibold text-primary mb-3">Tools & Stack</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground">What It's Built With</h2>
        </div>

        {/* logo strip */}
        <div className="flex flex-wrap items-center gap-8 mb-12">
          {TOOL_LOGOS.map(tool => (
            <div key={tool.slug} className="group flex flex-col items-center gap-2">
              <div className="w-10 h-10 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-all duration-300 grayscale group-hover:grayscale-0">
                <img
                  src={`https://cdn.simpleicons.org/${tool.slug}/${tool.color}`}
                  alt={tool.name}
                  className="w-8 h-8 object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground transition-colors font-medium">
                {tool.name}
              </span>
            </div>
          ))}
        </div>

        {/* tag grid */}
        <div className="flex flex-wrap gap-2">
          {TOOL_TAGS.map(tag => (
            <span key={tag} className="px-3 py-1.5 text-xs font-medium border border-border/60 text-muted-foreground bg-muted/30">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── back to portfolio ───────────────────────────────────────── */

function BackToPortfolio() {
  return (
    <section className="py-16 px-6 bg-background border-t border-border/30 text-center">
      <Link
        href="/"
        onClick={() => { setTimeout(() => { document.getElementById("ai")?.scrollIntoView({ behavior: "smooth" }); }, 80); }}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
      >
        <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
        Back to Portfolio — AI &amp; Automation
      </Link>
    </section>
  );
}

/* ── page ────────────────────────────────────────────────────── */

export default function NaseehaPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Lecture Intelligence Pipeline — Aneeq Allahi";
  }, []);

  return (
    <div>
      <NaseehaNav />
      <NaseehaHero />
      <GoalSection />
      <PipelineDiagram />
      <ArchitectureSection />
      <OutcomesSection />
      <ToolsSection />
      <BackToPortfolio />
    </div>
  );
}
