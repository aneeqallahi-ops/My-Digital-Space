import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, type Variants, useInView } from "framer-motion";
import { ProjectModal, CertModal } from "@/components/ProjectModal";
import { ResumeModal } from "@/components/ResumeModal";
import {
  consultingProjects,
  passionProjects,
  aiProjects,
  academicProjects,
  certifications,
  type ProjectItem,
  type CertificationItem,
} from "@/data/projects";

/* ── helpers ──────────────────────────────────────────────── */

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

const staggerGrid: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14 } },
};

function useViewOnce(margin = "-80px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin } as Parameters<typeof useInView>[1]);
  return { ref, inView };
}

/* ── nav ──────────────────────────────────────────────────── */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-background/90 backdrop-blur-xl border-b border-border/40 shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease }}
      data-testid="main-navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <a href="#hero" className="font-serif font-bold text-xl tracking-tight text-foreground" data-testid="nav-logo">
          AA.
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[["#about","About"],["#consulting","Consulting"],["#projects","Projects"],["#ai","AI & Automation"],["#experience","Experience"]].map(([href,label]) => (
            <a key={href} href={href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

/* ── hero ─────────────────────────────────────────────────── */

const STATS = [
  { value: "3.88", label: "CGPA — High Distinction" },
  { value: "2+", label: "Years Consulting" },
  { value: "$1B+", label: "JV Facilitated" },
  { value: "10+", label: "Projects Delivered" },
];

function Hero({ onResumeOpen }: { onResumeOpen: () => void }) {
  const { scrollY } = useScroll();
  const textY   = useTransform(scrollY, [0, 500], [0, 80]);
  const textOp  = useTransform(scrollY, [0, 280], [1, 0]);
  const imageY  = useTransform(scrollY, [0, 500], [0, 40]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center pt-20 overflow-hidden bg-background"
      data-testid="section-hero"
    >
      {/* subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)/.35) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)/.35) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 100%)",
        }}
      />

      {/* accent glow */}
      <div className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full bg-primary/6 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-0 lg:gap-16 items-center min-h-[80vh]">

          {/* ── text column ── */}
          <motion.div
            className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center py-16 lg:py-0 space-y-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease }}
            style={{ y: textY, opacity: textOp }}
          >
            {/* current role badge */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary" data-testid="text-hero-subtitle">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Senior Analyst
              </span>
              <span className="text-border text-sm">·</span>
              <img src="/intellia-logo.png" alt="Intellia" className="h-20 w-auto opacity-90" data-testid="img-intellia-logo-hero" />
            </div>

            {/* name */}
            <div>
              <h1
                className="font-serif font-semibold leading-[1.04] text-foreground"
                style={{ fontSize: "clamp(3.2rem, 7vw, 6rem)" }}
                data-testid="text-hero-title"
              >
                Aneeq<br />Allahi
              </h1>
            </div>

            {/* tagline */}
            <p
              className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md"
              data-testid="text-hero-tagline"
            >
              Orchestrating strategy, driving product, and unlocking scale through AI & automation.
            </p>

            {/* stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 pt-2 border-t border-border/40">
              {STATS.map((s) => (
                <div key={s.value}>
                  <p className="font-serif font-semibold text-2xl text-foreground leading-none">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-light mt-1 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>

            {/* cta */}
            <div>
              <button
                onClick={onResumeOpen}
                className="group inline-flex items-center gap-2.5 px-6 py-3 bg-foreground text-background text-sm font-medium hover:bg-primary hover:text-white transition-colors duration-300"
                data-testid="btn-view-resume"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                View Résumé
              </button>
            </div>
          </motion.div>

          {/* ── image column ── */}
          <motion.div
            className="hidden lg:flex lg:col-span-6 xl:col-span-5 justify-end items-center relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            style={{ y: imageY }}
          >
            {/* decorative outer frame */}
            <div className="relative w-[340px] xl:w-[390px]">

              {/* top-right corner accent */}
              <div className="absolute -top-4 -right-4 w-20 h-20 border-t-2 border-r-2 border-primary/60 pointer-events-none z-20" />
              {/* bottom-left corner accent */}
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-2 border-l-2 border-primary/60 pointer-events-none z-20" />

              {/* image container */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                {/* warm tone background so transparent edges blend cleanly */}
                <div className="absolute inset-0 bg-[#f2ede8]" />

                {/* portrait image */}
                <img
                  src="/aneeq-headshot.png"
                  alt="Aneeq Allahi"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{
                    filter: "contrast(1.08) saturate(0.88) brightness(1.02)",
                    imageRendering: "auto",
                  }}
                  data-testid="img-hero-headshot"
                />

                {/* subtle bottom vignette */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f2ede8]/70 to-transparent pointer-events-none" />
              </div>

              {/* floating name card */}
              <motion.div
                className="absolute -bottom-5 -left-6 bg-background border border-border/60 px-5 py-3 shadow-xl z-30"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1, ease }}
              >
                <p className="font-serif font-semibold text-sm text-foreground">Aneeq Allahi</p>
                <p className="text-[11px] text-muted-foreground font-light mt-0.5">Strategy · Product · AI</p>
              </motion.div>

              {/* floating badge top-left */}
              <motion.div
                className="absolute -top-5 -left-6 bg-primary text-white px-4 py-2 text-[11px] font-semibold uppercase tracking-wider z-30 shadow-lg"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease }}
              >
                LUMS '25 · High Distinction
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 2 }}
      >
        <div className="w-px h-12 bg-foreground/50 animate-[pulse_2s_ease-in-out_infinite]" />
        <span className="text-[10px] uppercase tracking-widest text-foreground font-medium">Scroll</span>
      </motion.div>
    </section>
  );
}

/* ── section heading ──────────────────────────────────────── */

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-16">
      {subtitle && (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-primary" />
          <span className="text-primary tracking-[0.2em] uppercase text-[11px] font-semibold">{subtitle}</span>
        </div>
      )}
      <h2 className="text-3xl md:text-[2.75rem] font-serif font-semibold leading-tight text-foreground">{title}</h2>
    </div>
  );
}

/* ── about ────────────────────────────────────────────────── */

const EXPERTISE = [
  { title: "Strategy & Consulting", body: "High-level business strategy, market entry analysis, JV structuring, and operational scale for enterprise and public-sector clients." },
  { title: "Product Management", body: "End-to-end product lifecycle ownership — from user research and roadmapping to technical execution and growth optimisation." },
  { title: "AI & Automation", body: "Leveraging LLMs, conversational agents, and workflow automations (n8n, web-scraping pipelines) to drive measurable operational value." },
];

function About() {
  const { ref, inView } = useViewOnce();
  return (
    <section id="about" className="py-28 bg-card/20" data-testid="section-about">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <SectionHeading title="The Intersections" subtitle="About" />
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-3 space-y-5 text-muted-foreground font-light leading-[1.85] text-[15px]">
              <p data-testid="text-about-bio">
                I'm a LUMS Management Sciences graduate (High Distinction, 2025) working at the intersection of strategy consulting, product management, and AI & automation. I'm drawn to problems that are structurally complex and humanly consequential — whether that's restructuring healthcare delivery, building AI-native products, or designing systems that scale.
              </p>
              <p data-testid="text-about-role">
                At Intellia AI, I engage high-stakes consulting projects spanning market entry strategy, financial modelling, and value creation planning — translating analytical rigour into decisions with measurable, real-world impact.
              </p>
            </div>
            <div className="lg:col-span-2 space-y-5">
              {EXPERTISE.map((e) => (
                <div key={e.title} className="group">
                  <div className="flex items-start gap-3">
                    <div className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0 group-hover:scale-150 transition-transform" />
                    <div>
                      <h3 className="text-foreground font-medium text-sm mb-1">{e.title}</h3>
                      <p className="text-xs text-muted-foreground font-light leading-relaxed">{e.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── project card ─────────────────────────────────────────── */

function ProjectCard({ title, category, description, id, onClick }: {
  title: string; category: string; description: string; id: string; onClick: () => void;
}) {
  return (
    <motion.button
      variants={fadeUp}
      className="group relative bg-background border border-border/50 p-7 flex flex-col h-full text-left w-full
                 hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/.15)]
                 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary overflow-hidden"
      data-testid={`card-${id}`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      {/* top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

      <span className="text-primary text-[10px] uppercase tracking-[0.18em] mb-4 block font-semibold">{category}</span>
      <h3 className="text-base font-serif font-medium mb-4 group-hover:text-primary transition-colors leading-snug">{title}</h3>
      <p className="text-muted-foreground text-sm font-light leading-relaxed flex-grow text-[13px]">{description}</p>
      <div className="mt-7 pt-5 border-t border-border/40 flex justify-between items-center">
        <span className="text-[11px] text-muted-foreground font-medium group-hover:text-primary transition-colors tracking-wide uppercase">
          View Details
        </span>
        <svg
          className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.button>
  );
}

/* ── consulting ───────────────────────────────────────────── */

function ConsultingWork({ onOpen }: { onOpen: (p: ProjectItem) => void }) {
  const { ref, inView } = useViewOnce();
  return (
    <section id="consulting" className="py-28" data-testid="section-consulting">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading subtitle="Consulting" title="Consulting Engagements" />
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerGrid}
        >
          {consultingProjects.map((p) => (
            <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── other projects ───────────────────────────────────────── */

function SubSection({ id, title, subtitle, projects, onOpen, cols = 2 }: {
  id?: string; title: string; subtitle: string; projects: ProjectItem[]; onOpen: (p: ProjectItem) => void; cols?: 2 | 3;
}) {
  const { ref, inView } = useViewOnce();
  return (
    <div id={id}>
      <SectionHeading title={title} subtitle={subtitle} />
      <motion.div
        ref={ref}
        className={`grid grid-cols-1 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-2 xl:grid-cols-3"} gap-5`}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerGrid}
      >
        {projects.map((p) => (
          <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
        ))}
      </motion.div>
    </div>
  );
}

function OtherProjects({ onOpen }: { onOpen: (p: ProjectItem) => void }) {
  return (
    <section id="projects" className="py-28 bg-card/20" data-testid="section-other-projects">
      <div className="max-w-6xl mx-auto px-6 space-y-28">
        <SubSection title="Passion Projects" subtitle="Explorations" projects={passionProjects} onOpen={onOpen} />
        <SubSection id="ai" title="AI & Automation" subtitle="Applied Tech" projects={aiProjects} onOpen={onOpen} />
        <SubSection title="Academic Research" subtitle="Foundation" projects={academicProjects} onOpen={onOpen} cols={3} />
      </div>
    </section>
  );
}

/* ── experience ───────────────────────────────────────────── */

function TimelineItem({ role, company, dates, description, logoSrc, isCurrent = false }: {
  role: string; company: string; dates: string; description: string; logoSrc?: string; isCurrent?: boolean;
}) {
  return (
    <div className="group grid md:grid-cols-[1fr_2px_1fr] gap-0 items-start">
      {/* left: meta */}
      <div className="md:text-right md:pr-10 pb-6 md:pb-0">
        <h3 className="text-lg font-serif font-medium text-foreground group-hover:text-primary transition-colors">{role}</h3>
        {logoSrc ? (
          <div className="flex items-center gap-2 md:justify-end mt-1.5">
            <img src={logoSrc} alt={company} className="h-6 w-auto opacity-90" data-testid={`img-logo-${company.toLowerCase().replace(/\s+/g, "-")}`} />
            <p className="text-muted-foreground text-sm font-medium">{company}</p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm font-medium mt-1">{company}</p>
        )}
        <span className={`inline-block text-xs font-semibold mt-2 px-2.5 py-0.5 ${isCurrent ? "bg-primary/10 text-primary" : "text-muted-foreground"}`}>
          {dates}
        </span>
      </div>

      {/* centre line */}
      <div className="hidden md:flex flex-col items-center pt-2">
        <div className={`w-2.5 h-2.5 rounded-full border-2 ${isCurrent ? "border-primary bg-primary" : "border-border bg-background"} transition-colors group-hover:border-primary`} />
        <div className="w-px flex-1 bg-border/60 mt-1" />
      </div>

      {/* right: description */}
      <div className="md:pl-10 pb-6 md:pb-0">
        <p className="text-muted-foreground text-sm font-light leading-[1.85]">{description}</p>
      </div>
    </div>
  );
}

function Experience() {
  const { ref, inView } = useViewOnce();
  return (
    <section id="experience" className="py-28" data-testid="section-experience">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Career Trajectory" subtitle="Experience" />
        <motion.div
          ref={ref}
          className="space-y-0"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerGrid}
        >
          {[
            { role: "Senior Analyst", company: "Intellia AI", logoSrc: "/intellia-logo.png", dates: "July 2025 — Present", isCurrent: true, description: "Lead multi-sector consulting engagements with measurable outcomes: facilitated a $1B JV negotiation in KSA through a 2,000+ data-point commercial viability analysis; co-developed a 3-year value creation plan for an oncology clinic to offset a $50M net loss; and built a forecasting model that reduced patient acquisition costs by 10%. Fast-tracked from Analyst to Senior Analyst." },
            { role: "Associate Product Manager", company: "SnackOut", logoSrc: "/snackout-logo.png", dates: "February 2025 — April 2025", description: "Built a conversational AI customer support agent that reduced operational costs by ~70%; implemented automated SEO blog generation via a locally hosted n8n server; and developed an AI-powered restaurant directory through automated web-scraping and form-filling agents." },
            { role: "Product Management Intern", company: "EZOffice", logoSrc: "/ezo-logo.png", dates: "June 2024 — August 2024", description: "Redesigned error messaging and inline guides to reduce helpdesk tickets; updated tutorial video content to align with the latest module functionalities, boosting engagement; and streamlined module workflows to improve operational efficiency and asset management capabilities." },
            { role: "Creative Lead", company: "Digital Khokha", logoSrc: "/digital-khokha-logo.png", dates: "July 2021 — October 2022", description: "Owned end-to-end creative content strategy: social media direction, copywriting, article and blog production, pitch deck proposals, marketing plans, website content, and campaign conceptualisation across digital and conventional channels." },
          ].map((item) => (
            <motion.div key={item.role + item.company} variants={fadeUp}>
              <TimelineItem {...item} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── certifications ───────────────────────────────────────── */

function Certifications({ onOpen }: { onOpen: (c: CertificationItem) => void }) {
  const { ref, inView } = useViewOnce();
  return (
    <section id="certifications" className="py-28 bg-card/20" data-testid="section-certifications">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Credentials" subtitle="Certifications" />
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerGrid}
        >
          {certifications.map((cert, i) => (
            <motion.button
              key={cert.id}
              variants={fadeUp}
              onClick={() => onOpen(cert)}
              className="group relative bg-background border border-border/50 p-6 flex flex-col items-center text-center
                         hover:border-primary/40 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/.15)]
                         transition-all duration-500 cursor-pointer w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              data-testid={`card-certification-${i + 1}`}
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <div className="w-11 h-11 bg-card/60 border border-border/40 flex items-center justify-center mb-4 group-hover:bg-primary/8 transition-colors">
                {cert.logoSrc ? (
                  <img src={cert.logoSrc} alt={cert.issuer} className="w-6 h-6 object-contain" />
                ) : (
                  <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                )}
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1.5 leading-snug">{cert.title}</h4>
              <p className="text-[11px] text-muted-foreground">{cert.issuer} · {cert.year}</p>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── footer ───────────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="relative bg-foreground text-background overflow-hidden" data-testid="main-footer">
      {/* decorative grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-end">
          {/* left */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-background/40 font-semibold mb-3">Let's Connect</p>
            <h2 className="font-serif font-semibold text-3xl md:text-4xl text-background leading-tight mb-8">
              Open to strategy,<br />product, and AI work.
            </h2>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:Aneeq.allahi@intelliaadvisors.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-background/30 text-background text-sm font-medium hover:bg-background hover:text-foreground transition-colors duration-300"
              >
                Send an Email
              </a>
              <a
                href="https://www.linkedin.com/in/aneeq-allahi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-background/10 text-background text-sm font-medium hover:bg-background hover:text-foreground transition-colors duration-300"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* right: contact details */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-background/40 font-semibold">My Contact Details</p>
            <div className="space-y-2">
              <a href="tel:+923049705122" className="block text-sm text-background/70 hover:text-background transition-colors font-light">
                +92 304 9705122
              </a>
              <a href="mailto:Aneeq.allahi@intelliaadvisors.com" className="block text-sm text-background/70 hover:text-background transition-colors font-light break-all">
                Aneeq.allahi@intelliaadvisors.com
              </a>
              <a href="https://www.linkedin.com/in/aneeq-allahi" target="_blank" rel="noopener noreferrer" className="block text-sm text-background/70 hover:text-background transition-colors font-light">
                linkedin.com/in/aneeq-allahi
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <span className="font-serif font-bold text-xl text-background/60">AA.</span>
          <p className="text-xs text-background/30 font-light">
            © {new Date().getFullYear()} Aneeq Allahi. Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── root ─────────────────────────────────────────────────── */

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        <Hero onResumeOpen={() => setResumeOpen(true)} />
        <About />
        <ConsultingWork onOpen={setActiveProject} />
        <OtherProjects onOpen={setActiveProject} />
        <Experience />
        <Certifications onOpen={setActiveCert} />
      </main>
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </div>
  );
}
