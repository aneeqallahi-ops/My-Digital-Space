import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

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
              <h2 className="text-primary font-medium tracking-widest uppercase text-sm" data-testid="text-hero-subtitle">Senior Analyst @ Intellia</h2>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-semibold leading-[1.1]" data-testid="text-hero-title">
                Aneeq Allahi
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-xl font-light leading-relaxed" data-testid="text-hero-tagline">
              Orchestrating strategy, driving product, and unlocking scale through AI & automation.
            </p>
          </motion.div>
          <motion.div 
            className="lg:col-span-5 flex justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
          >
            <div className="relative w-72 h-80 md:w-96 md:h-[28rem] group">
              <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
              <img 
                src="/aneeq-headshot.png" 
                alt="Aneeq Allahi" 
                className="w-full h-full object-cover filter grayscale-[20%] contrast-125 brightness-90 relative z-10"
                data-testid="img-hero-headshot"
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-20 pointer-events-none" />
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

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
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
              <em>[Placeholder: Brief professional bio highlighting background, intellectual interests, and the unique perspective Aneeq brings to consulting.]</em>
            </p>
            <p data-testid="text-about-role">
              <em>[Placeholder: Details regarding his current role at Intellia, focusing on management consulting and the kinds of high-impact problems he tackles day-to-day.]</em>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 not-prose">
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">Strategy & Consulting</h3>
                <p className="text-sm text-muted-foreground"><em>[Placeholder: Focus on high-level business strategy, market entry, and operational scale.]</em></p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">Product Management</h3>
                <p className="text-sm text-muted-foreground"><em>[Placeholder: Focus on product lifecycle, user research, and technical execution.]</em></p>
              </div>
              <div className="border-l-2 border-primary/30 pl-6">
                <h3 className="text-foreground font-medium mb-2">AI & Automation</h3>
                <p className="text-sm text-muted-foreground"><em>[Placeholder: Focus on leveraging LLMs and workflow automations for enterprise value.]</em></p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ title, category, description, id }: { title: string, category: string, description: string, id: string }) {
  return (
    <motion.div 
      variants={fadeUpVariant}
      className="group border border-border/50 bg-card/20 p-8 hover:bg-card/60 transition-colors duration-500 flex flex-col h-full"
      data-testid={`card-${id}`}
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
    </motion.div>
  );
}

function ConsultingWork() {
  return (
    <section id="consulting" className="py-32" data-testid="section-consulting">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Consulting Engagements" subtitle="Intellia Work" />
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <ProjectCard 
            id="consulting-1"
            category="Strategy" 
            title="[Strategy Engagement Client A]" 
            description="[Placeholder: Description of the strategic initiative, the core problem solved, and the measurable impact delivered for the client.]" 
          />
          <ProjectCard 
            id="consulting-2"
            category="Operations" 
            title="[Operational Transformation]" 
            description="[Placeholder: Details on an operational overhaul, focusing on efficiency gains and process optimization.]" 
          />
          <ProjectCard 
            id="consulting-3"
            category="Growth" 
            title="[Market Entry Strategy]" 
            description="[Placeholder: Overview of a market entry analysis, competitive landscaping, and the resulting roadmap.]" 
          />
        </motion.div>
      </div>
    </section>
  );
}

function OtherProjects() {
  return (
    <section id="projects" className="py-32 bg-card/30" data-testid="section-other-projects">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        
        {/* Passion Projects */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="Passion Projects" subtitle="Explorations" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard 
              id="passion-1"
              category="Venture" 
              title="[Entrepreneurial Pursuit]" 
              description="[Placeholder: A side project or venture being explored outside of core consulting hours.]" 
            />
            <ProjectCard 
              id="passion-2"
              category="Research" 
              title="[Industry Deep Dive]" 
              description="[Placeholder: A published essay or deep research piece into a specific market vertical.]" 
            />
          </div>
        </motion.div>

        {/* AI & Automation */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="AI & Automation" subtitle="Applied Tech" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProjectCard 
              id="ai-1"
              category="LLM Application" 
              title="[Internal Knowledge Tool]" 
              description="[Placeholder: Development of an LLM-based tool to parse proprietary datasets and accelerate research.]" 
            />
            <ProjectCard 
              id="ai-2"
              category="Workflow" 
              title="[Process Automation Pipeline]" 
              description="[Placeholder: Architecture of an automated pipeline to handle repetitive analytical tasks.]" 
            />
          </div>
        </motion.div>

        {/* Academic */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          <SectionHeading title="Academic Research" subtitle="Foundation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCard 
              id="academic-1"
              category="Thesis" 
              title="[Undergraduate Thesis]" 
              description="[Placeholder: Summary of primary academic research focus and methodologies.]" 
            />
            <ProjectCard 
              id="academic-2"
              category="Publication" 
              title="[Academic Paper]" 
              description="[Placeholder: Details of a co-authored paper or significant university project.]" 
            />
            <ProjectCard 
              id="academic-3"
              category="Case Study" 
              title="[Business Case Analysis]" 
              description="[Placeholder: A comprehensive case study from business education.]" 
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function TimelineItem({ role, company, dates, description, isCurrent = false }: { role: string, company: string, dates: string, description: string, isCurrent?: boolean }) {
  return (
    <div className="relative pl-8 md:pl-0">
      <div className="md:hidden absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
      <div className="hidden md:block absolute left-[50%] -ml-1 top-2 w-2 h-2 rounded-full bg-primary" />
      
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="md:text-right md:pr-12">
          <h3 className="text-xl font-serif font-medium text-foreground">{role}</h3>
          <p className="text-muted-foreground font-medium">{company}</p>
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
            company="Intellia"
            dates="[Start Year] — Present"
            description="[Placeholder: Description of core responsibilities, strategic engagements led, and overarching impact at Intellia.]"
            isCurrent={true}
          />
          <TimelineItem 
            role="[Previous Role]"
            company="[Previous Company]"
            dates="[Start Year] — [End Year]"
            description="[Placeholder: Details on prior experience, foundational skills built, and significant deliverables.]"
          />
          <TimelineItem 
            role="[Initial Role]"
            company="[Initial Company]"
            dates="[Start Year] — [End Year]"
            description="[Placeholder: Early career details establishing analytical and strategic acumen.]"
          />

        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="py-32 bg-card/30" data-testid="section-certifications">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading title="Credentials" subtitle="Certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6 border border-border/50 bg-background flex flex-col items-center text-center group hover:border-primary/50 transition-colors" data-testid={`card-certification-${i}`}>
              <div className="w-12 h-12 bg-card/50 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <svg className="w-6 h-6 text-muted-foreground group-hover:text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h4 className="text-sm font-medium text-foreground mb-1">[Certification Title]</h4>
              <p className="text-xs text-muted-foreground">[Issuer] • [Year]</p>
            </div>
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
  // Ensure the page acts as dark mode immediately if the html class isn't set
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <main>
        <Hero />
        <About />
        <ConsultingWork />
        <OtherProjects />
        <Experience />
        <Certifications />
      </main>
      <Footer />
    </div>
  );
}
