import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProjectModal, CertModal } from "@/components/ProjectModal";
import {
  consultingProjects,
  passionProjects,
  aiProjects,
  academicProjects,
  certifications,
  type ProjectItem,
  type CertificationItem,
} from "@/data/projects";

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50' : 'bg-transparent'}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-testid="main-navigation"
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="font-serif font-semibold text-lg tracking-wide text-foreground" data-testid="nav-logo">
          AA.
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-link-about">About</a>
          <a href="#consulting" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-link-consulting">Consulting</a>
          <a href="#projects" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-link-projects">Projects</a>
          <a href="#ai" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-link-ai">AI & Automation</a>
          <a href="#experience" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="nav-link-experience">Experience</a>
        </div>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div 
            className="lg:col-span-7 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ y, opacity }}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary font-medium tracking-widest uppercase text-sm" data-testid="text-hero-subtitle">Senior Analyst</span>
                <span className="text-muted-foreground/40 text-sm">@</span>
                <img src="/intellia-logo.png" alt="Intellia" className="h-24 w-auto" data-testid="img-intellia-logo-hero" />
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-[1.1]" data-testid="text-hero-title">
                Aneeq Allahi
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed" data-testid="text-hero-tagline">
              Orchestrating strategy, driving product, and unlocking scale through AI & automation.
            </p>
          </motion.div>
          <motion.div 
            className="lg:col-span-5 flex justify-end items-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <div className="relative w-80 md:w-[420px] lg:w-full" style={{ isolation: "isolate" }}>
              <img 
                src="/aneeq-headshot.png" 
                alt="Aneeq Allahi" 
                className="w-full h-auto object-contain"
                style={{
                  mixBlendMode: "multiply",
                  filter: "contrast(1.1) saturate(0.9) brightness(0.97)",
                  maskImage: "radial-gradient(ellipse 65% 82% at 58% 36%, black 40%, rgba(0,0,0,0.6) 62%, transparent 82%)",
                  WebkitMaskImage: "radial-gradient(ellipse 65% 82% at 58% 36%, black 40%, rgba(0,0,0,0.6) 62%, transparent 82%)",
                }}
                data-testid="img-hero-headshot"
              />
              {/* Fade into background at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="space-y-3 mb-16">
      {subtitle && <span className="text-primary tracking-widest uppercase text-xs font-semibold block">{subtitle}</span>}
      <h2 className="text-3xl md:text-5xl font-serif font-semibold">{title}</h2>
    </div>
  );
}

const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

function About() {
  return (
    <section id="about" className="py-32 bg-card/30" data-testid="section-about">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <SectionHeading title="The Intersections" subtitle="About" />
          <div className="prose prose-lg prose-invert text-muted-foreground font-light leading-relaxed">
            <p data-testid="text-about-bio">
              I'm a LUMS Management Sciences graduate (High Distinction, 2025) working at the intersection of strategy consulting, product management, and AI & automation. I'm drawn to problems that are structurally complex and humanly consequential — whether that's restructuring healthcare delivery, building AI-native products, or designing systems that scale.
            </p>
            <p data-testid="text-about-role">
              At Intellia AI, I lead high-stakes consulting engagements spanning market entry strategy, financial modelling, and value creation planning — translating analytical rigour into decisions with measurable, real-world impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 not-prose">
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">Strategy & Consulting</h3>
                <p className="text-sm text-muted-foreground">High-level business strategy, market entry analysis, JV structuring, and operational scale for enterprise and public-sector clients.</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">Product Management</h3>
                <p className="text-sm text-muted-foreground">End-to-end product lifecycle ownership — from user research and roadmapping to technical execution and growth optimisation.</p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">AI & Automation</h3>
                <p className="text-sm text-muted-foreground">Leveraging LLMs, conversational agents, and workflow automations (n8n, web-scraping pipelines) to drive measurable operational value.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ title, category, description, id, onClick }: { title: string, category: string, description: string, id: string, onClick: () => void }) {
  return (
    <motion.button 
      variants={fadeUpVariant}
      className="group border border-border/50 bg-card/20 p-8 hover:bg-card/60 transition-colors duration-500 flex flex-col h-full text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      data-testid={`card-${id}`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === " ") { e.preventDefault(); onClick(); } }}
    >
      <span className="text-primary text-xs uppercase tracking-widest mb-4 block font-semibold">{category}</span>
      <h3 className="text-xl font-serif font-medium mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground text-sm font-light leading-relaxed flex-grow">{description}</p>
      <div className="mt-8 pt-6 border-t border-border/50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-xs text-muted-foreground font-medium">Explore Project</span>
        <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </motion.button>
  );
}

function ConsultingWork({ onOpen }: { onOpen: (p: ProjectItem) => void }) {
  return (
    <section id="consulting" className="py-32" data-testid="section-consulting">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading subtitle="Consulting" title="Consulting Engagements" />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {consultingProjects.map((p) => (
            <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function OtherProjects({ onOpen }: { onOpen: (p: ProjectItem) => void }) {
  return (
    <section id="projects" className="py-32 bg-card/30" data-testid="section-other-projects">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        
        {/* Passion Projects */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="Passion Projects" subtitle="Explorations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {passionProjects.map((p) => (
              <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
            ))}
          </div>
        </motion.div>

        {/* AI & Automation */}
        <motion.div id="ai" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="AI & Automation" subtitle="Applied Tech" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiProjects.map((p) => (
              <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
            ))}
          </div>
        </motion.div>

        {/* Academic */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="Academic Research" subtitle="Foundation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {academicProjects.map((p) => (
              <ProjectCard key={p.id} id={p.id} category={p.category} title={p.title} description={p.description} onClick={() => onOpen(p)} />
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function TimelineItem({ role, company, dates, description, logoSrc, isCurrent = false }: { role: string, company: string, dates: string, description: string, logoSrc?: string, isCurrent?: boolean }) {
  return (
    <div className="relative pl-8 md:pl-0">
      <div className="md:hidden absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
      <div className="hidden md:block absolute left-[50%] -ml-1 top-2 w-2 h-2 rounded-full bg-primary" />
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="md:text-right md:pr-12">
          <h3 className="text-xl font-serif font-medium text-foreground">{role}</h3>
          {logoSrc ? (
            <div className="flex items-center gap-2 md:justify-end mt-1">
              <img src={logoSrc} alt={company} className="h-8 w-auto" data-testid={`img-logo-${company.toLowerCase().replace(/\s+/g, '-')}`} />
              <p className="text-muted-foreground font-medium">{company}</p>
            </div>
          ) : (
            <p className="text-muted-foreground font-medium">{company}</p>
          )}
          <span className="text-sm text-primary font-semibold mt-1 inline-block">{dates}</span>
        </div>
        <div className="md:pl-12">
          <p className="text-muted-foreground text-sm font-light leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-32" data-testid="section-experience">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading title="Career Trajectory" subtitle="Experience" />
        
        <div className="relative space-y-16 mt-16 before:absolute before:inset-0 before:ml-[3px] md:before:ml-[50%] before:-translate-x-px md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent">
          
          <TimelineItem 
            role="Senior Analyst"
            company="Intellia AI"
            logoSrc="/intellia-logo.png"
            dates="July 2025 — Present"
            description="Lead multi-sector consulting engagements with measurable outcomes: facilitated a $1B JV negotiation in KSA through a 2,000+ data-point commercial viability analysis; co-developed a 3-year value creation plan for an oncology clinic to offset a $50M net loss; and built a forecasting model that reduced patient acquisition costs by 10%. Fast-tracked from Analyst to Senior Analyst."
            isCurrent={true}
          />
          <TimelineItem 
            role="Associate Product Manager"
            company="SnackOut"
            logoSrc="/snackout-logo.png"
            dates="February 2025 — April 2025"
            description="Built a conversational AI customer support agent that reduced operational costs by ~70%; implemented automated SEO blog generation via a locally hosted n8n server; and developed an AI-powered restaurant directory through automated web-scraping and form-filling agents."
          />
          <TimelineItem 
            role="Product Management Intern"
            company="EZOffice"
            logoSrc="/ezo-logo.png"
            dates="June 2024 — August 2024"
            description="Redesigned error messaging and inline guides to reduce helpdesk tickets; updated tutorial video content to align with the latest module functionalities, boosting engagement; and streamlined module workflows to improve operational efficiency and asset management capabilities."
          />
          <TimelineItem 
            role="Creative Lead"
            company="Digital Khokha"
            logoSrc="/digital-khokha-logo.png"
            dates="July 2021 — October 2022"
            description="Owned end-to-end creative content strategy: social media direction, copywriting, article and blog production, pitch deck proposals, marketing plans, website content, and campaign conceptualisation across digital and conventional channels."
          />

        </div>
      </div>
    </section>
  );
}

function Certifications({ onOpen }: { onOpen: (c: CertificationItem) => void }) {
  return (
    <section id="certifications" className="py-32 bg-card/30" data-testid="section-certifications">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Credentials" subtitle="Certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {certifications.map((cert, i) => (
            <button
              key={cert.id}
              onClick={() => onOpen(cert)}
              className="p-6 border border-border/50 bg-background flex flex-col items-center text-center group hover:border-primary/50 transition-colors cursor-pointer w-full"
              data-testid={`card-certification-${i + 1}`}
            >
              <div className="w-12 h-12 bg-card/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">{cert.title}</h4>
              <p className="text-xs text-muted-foreground">{cert.issuer} · {cert.year}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border/50 text-center" data-testid="main-footer">
      <p className="text-sm text-muted-foreground font-light">
        © {new Date().getFullYear()} Aneeq Allahi. Designed with intention.
      </p>
    </footer>
  );
}

export default function Home() {
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(null);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <ConsultingWork onOpen={setActiveProject} />
        <OtherProjects onOpen={setActiveProject} />
        <Experience />
        <Certifications onOpen={setActiveCert} />
      </main>
      <Footer />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />
    </div>
  );
}
