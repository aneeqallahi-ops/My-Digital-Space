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
        <a
          href="#hero"
          className={`font-serif font-bold text-xl tracking-tight transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}
          data-testid="nav-logo"
        >
          AA.
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[["#about","About"],["#consulting","Consulting"],["#projects","Projects"],["#ai","AI & Automation"],["#experience","Experience"]].map(([href,label]) => (
            <a
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors duration-200 ${
                scrolled
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-white/75 hover:text-white"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

/* ── hero ─────────────────────────────────────────────────── */

function Hero({ onResumeOpen }: { onResumeOpen: () => void }) {
  const { scrollY } = useScroll();
  const textOp = useTransform(scrollY, [0, 400], [1, 0]);
  const imgScale = useTransform(scrollY, [0, 600], [1, 1.06]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] overflow-hidden"
      style={{ background: "#000000" }}
      data-testid="section-hero"
    >
      {/* ── full-bleed photo ── */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imgScale }}
      >
        <img
          src="/aneeq-headshot-campus.jpg"
          alt="Aneeq Allahi"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center 15%" }}
          data-testid="img-hero-headshot"
        />
      </motion.div>

      {/* ── gradient overlays ── */}
      {/* heavy bottom-up black fade so text is always readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, #000000 38%, rgba(0,0,0,0.72) 58%, rgba(0,0,0,0.25) 80%, transparent 100%)",
        }}
      />
      {/* left vignette */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 55%)",
        }}
      />
      {/* blue accent glow bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 10% 95%, rgba(4,158,255,0.18) 0%, transparent 65%)",
        }}
      />

      {/* ── top-left small label ── */}
      <motion.div
        className="absolute top-[88px] left-8 md:left-14 xl:left-20 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        style={{ opacity: textOp }}
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-medium leading-relaxed">
          Hi, I'm a consultant<br />& product manager
        </p>
      </motion.div>

      {/* ── top-right availability tag ── */}
      <motion.div
        className="absolute top-[88px] right-8 md:right-14 xl:right-20 z-10 text-right hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ opacity: textOp }}
      >
        <p className="text-[11px] uppercase tracking-[0.22em] text-white/50 font-medium leading-relaxed">
          Based in Connecticut*<br />Available worldwide
        </p>
      </motion.div>

      {/* ── bottom content block ── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-10 px-8 md:px-14 xl:px-20 pb-20 md:pb-24"
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.1, ease }}
        style={{ opacity: textOp }}
      >
        {/* massive display name */}
        <h1
          className="font-black leading-[0.88] tracking-tighter text-white uppercase select-none"
          style={{ fontSize: "clamp(3.8rem, 11.5vw, 10.5rem)" }}
          data-testid="text-hero-title"
        >
          Aneeq<br />Allahi
        </h1>

        {/* role row */}
        <div className="mt-7 md:mt-9 flex flex-col md:flex-row md:items-center gap-5 md:gap-10">
          {/* role + company */}
          <div className="flex items-center gap-4 flex-wrap" data-testid="text-hero-subtitle">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-white/80">
              <span className="w-2 h-2 rounded-full bg-[#049EFF] animate-pulse shrink-0" />
              Senior Analyst
            </span>
            <span className="text-white/30 font-light">@</span>
            <img
              src="/intellia-logo.png"
              alt="Intellia AI"
              className="h-[4.2rem] w-auto opacity-80"
              style={{ filter: "brightness(0) invert(1)" }}
              data-testid="img-intellia-logo-hero"
            />
          </div>

          {/* divider (desktop) */}
          <div className="hidden md:block w-px h-8 bg-white/15 shrink-0" />

          {/* tagline */}
          <p
            className="text-[14px] md:text-[15px] text-white/55 font-light leading-[1.85] max-w-xs"
            data-testid="text-hero-tagline"
          >
            Orchestrating strategy, driving product, and unlocking scale through AI &amp; automation.
          </p>
        </div>

        {/* cta row */}
        <div className="mt-8 flex items-center gap-4 flex-wrap">
          <button
            onClick={onResumeOpen}
            className="inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/90 transition-colors duration-200"
            data-testid="btn-view-resume"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            View Résumé
          </button>
          <a
            href="#consulting"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full bg-white/10 text-white hover:bg-white/18 border border-white/15 transition-colors duration-200 backdrop-blur-sm"
          >
            See my work ↓
          </a>
        </div>
      </motion.div>

      {/* ── SVG wave transition ── */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 90"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
          style={{ display: "block", height: "90px" }}
        >
          <path
            d="M0,60 C360,90 1080,20 1440,55 L1440,90 L0,90 Z"
            fill="hsl(var(--primary))"
            fillOpacity="0.05"
          />
          <path
            d="M0,70 C400,30 1000,75 1440,45 L1440,90 L0,90 Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
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
    <div className="group">

      {/* ── DESKTOP: 3-col grid [meta | dot | description] ── */}
      <div className="hidden md:grid grid-cols-[1fr_48px_1fr] items-start">

        {/* LEFT: meta — right-aligned */}
        <div className="text-right pr-10">
          <h3 className="text-[1.05rem] font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
            {role}
          </h3>
          {logoSrc ? (
            <div className="flex items-center gap-2 justify-end mt-2">
              <img src={logoSrc} alt={company} className="h-5 w-auto opacity-75" data-testid={`img-logo-${company.toLowerCase().replace(/\s+/g, "-")}`} />
              <p className="text-muted-foreground text-sm font-medium">{company}</p>
            </div>
          ) : (
            <p className="text-muted-foreground text-sm font-medium mt-2">{company}</p>
          )}
          <span className={`inline-block text-[11px] font-semibold mt-2.5 tracking-wide ${isCurrent ? "text-primary" : "text-muted-foreground/60"}`}>
            {dates}
          </span>
        </div>

        {/* CENTER: dot — structurally in its own column, anchored to text baseline */}
        <div className="flex flex-col items-center pt-[6px]">
          <div className="w-2.5 h-2.5 rounded-full border-2 border-border bg-background group-hover:border-primary group-hover:bg-primary/20 transition-all duration-300 z-10 shrink-0" />
        </div>

        {/* RIGHT: description */}
        <div className="pl-10">
          <p className="text-muted-foreground text-sm font-light leading-[1.9]">{description}</p>
        </div>

      </div>

      {/* ── MOBILE: stacked with left border ── */}
      <div className="md:hidden pl-6 border-l-2 border-border/50 relative">
        <div className="absolute -left-[5px] top-[5px] w-2.5 h-2.5 rounded-full border-2 border-border bg-background" />
        <h3 className="text-[1rem] font-serif font-medium text-foreground leading-snug">{role}</h3>
        {logoSrc ? (
          <div className="flex items-center gap-2 mt-1.5">
            <img src={logoSrc} alt={company} className="h-5 w-auto opacity-75" />
            <p className="text-muted-foreground text-sm font-medium">{company}</p>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm font-medium mt-1">{company}</p>
        )}
        <span className={`inline-block text-[11px] font-semibold mt-2 tracking-wide ${isCurrent ? "text-primary" : "text-muted-foreground/60"}`}>{dates}</span>
        <p className="text-muted-foreground text-sm font-light leading-[1.9] mt-4">{description}</p>
      </div>

    </div>
  );
}

const JOBS = [
  { role: "Senior Analyst", company: "Intellia AI", logoSrc: "/intellia-logo.png", dates: "July 2025 — Present", isCurrent: true, description: "Lead multi-sector consulting engagements with measurable outcomes: facilitated a $1B JV negotiation in KSA through a 2,000+ data-point commercial viability analysis; co-developed a 3-year value creation plan for an oncology clinic to offset a $50M net loss; and built a forecasting model that reduced patient acquisition costs by 10%. Fast-tracked from Analyst to Senior Analyst." },
  { role: "Associate Product Manager", company: "SnackOut", logoSrc: "/snackout-logo.png", dates: "February 2025 — April 2025", isCurrent: false, description: "Built a conversational AI customer support agent that reduced operational costs by ~70%; implemented automated SEO blog generation via a locally hosted n8n server; and developed an AI-powered restaurant directory through automated web-scraping and form-filling agents." },
  { role: "Product Management Intern", company: "EZOffice", logoSrc: "/ezo-logo.png", dates: "June 2024 — August 2024", isCurrent: false, description: "Redesigned error messaging and inline guides to reduce helpdesk tickets; updated tutorial video content to align with the latest module functionalities, boosting engagement; and streamlined module workflows to improve operational efficiency and asset management capabilities." },
  { role: "Creative Lead", company: "Digital Khokha", logoSrc: "/digital-khokha-logo.png", dates: "July 2021 — October 2022", isCurrent: false, description: "Owned end-to-end creative content strategy: social media direction, copywriting, article and blog production, pitch deck proposals, marketing plans, website content, and campaign conceptualisation across digital and conventional channels." },
];

function Experience() {
  const { ref, inView } = useViewOnce();
  return (
    <section id="experience" className="py-28" data-testid="section-experience">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading title="Career Trajectory" subtitle="Experience" />
        <motion.div
          ref={ref}
          className="relative space-y-16
            before:hidden md:before:block
            before:absolute before:top-0 before:left-[50%] before:-translate-x-px
            before:h-full before:w-px
            before:bg-gradient-to-b before:from-primary/30 before:via-border/50 before:to-transparent
            before:pointer-events-none"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerGrid}
        >
          {JOBS.map((item) => (
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
