import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: 24, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

function Divider() {
  return <div className="border-t border-border/50 my-5" />;
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-3">
      {children}
    </h3>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs text-muted-foreground font-light leading-relaxed">
          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          data-testid="modal-resume-backdrop"
        >
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />

          <div className="relative z-10 flex justify-center w-full h-full py-8 px-4 md:px-8 overflow-y-auto pointer-events-none">
            <motion.div
              className="w-full max-w-2xl bg-background border border-border/60 shadow-2xl pointer-events-auto self-start"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid="modal-resume"
            >
              <div className="p-8 md:p-10">

                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground">Aneeq Allahi</h2>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground font-light">
                      <span>+92 304 9705122</span>
                      <span>25110042@lums.edu.pk</span>
                      <a
                        href="https://www.linkedin.com/in/aneeq-allahi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:opacity-70 transition-opacity"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close"
                    className="flex items-center justify-center w-9 h-9 border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors shrink-0"
                    data-testid="modal-resume-close"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <Divider />

                {/* Education */}
                <SectionTitle>Education</SectionTitle>
                <div className="mb-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                    <p className="text-sm font-medium text-foreground">Lahore University of Management Sciences</p>
                    <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">Aug 2021 – Jun 2025</span>
                  </div>
                  <p className="text-xs text-muted-foreground font-light mt-0.5">BSc Management Science · CGPA: 3.88 (High Distinction)</p>
                  <p className="text-xs text-muted-foreground font-light mt-1">
                    Key Courses: Marketing Models, Qualitative and Quantitative Methods in Research, Probability and Statistics, Decision Analysis, Business Communication, Business Analytics, Data Analytics for New Product Development
                  </p>
                </div>

                <Divider />

                {/* Professional Experience */}
                <SectionTitle>Professional Experience</SectionTitle>
                <div className="space-y-5">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">Intellia · <span className="font-normal">Senior Strategy Analyst</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">Jul 2025 – Present</span>
                    </div>
                    <BulletList items={[
                      "Facilitated a $1B joint venture in KSA with their GTM through scraping and analyzing a 2,000+ datapoints project pipeline",
                      "Strategizing a 3-year value creation plan for an oncology clinic to offset $50M net loss",
                      "Designed and implemented a forecasting model to optimize patient acquisition channels, driving a 10% reduction in costs through data-driven resource allocation",
                    ]} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">SnackOut · <span className="font-normal">Associate Product Manager</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">Feb 2025 – Apr 2025</span>
                    </div>
                    <BulletList items={[
                      "Built a conversational AI customer support agent that reduced operational costs by ~70%",
                      "Implemented automated SEO blog generation via a locally hosted n8n server",
                      "Developed an AI-powered restaurant directory through automated web-scraping and form-filling agents",
                    ]} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">7vals (EZOffice) · <span className="font-normal">Product Management Intern</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">May 2024 – Aug 2024</span>
                    </div>
                    <BulletList items={[
                      "Achieved a 30% reduction in helpdesk tickets by redesigning error messaging and inline guides",
                      "Boosted tutorial video engagement by 25% through content updates aligned with the latest module functionalities",
                      "Improved operational efficiency by 20% by streamlining EZOffice module workflows and enhancing asset management capabilities",
                    ]} />
                  </div>
                </div>

                <Divider />

                {/* Honours */}
                <SectionTitle>Honours & Awards</SectionTitle>
                <BulletList items={[
                  "Placed on the Dean's Honour List for every academic year",
                  "50% Merit Scholarship at LUMS for every academic year",
                  "100% Merit Scholarship during A Levels for academic years 2019–2021",
                  "Shortlisted as a Valedictorian candidate for the Batch of 2025 (Top 10)",
                ]} />

                <Divider />

                {/* Leadership */}
                <SectionTitle>Leadership & Extra-Curriculars</SectionTitle>
                <div className="space-y-4">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">LUMS Student Council · <span className="font-normal">Senior Batch Representative</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">May 2024 – Aug 2025</span>
                    </div>
                    <BulletList items={[
                      "Raised Rs 15M in 12 months for university community members through the council's welfare committee",
                      "Supported 200–300 outdoor workers daily during a 15-day heatwave, distributing over 3,000 glasses of beverages",
                      "Influenced a policy change on sports petitioning using data-backed evidence, increasing athletic opportunities by 25%",
                    ]} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">LUMS Consultancy Group · <span className="font-normal">Director Media & Branding</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">May 2023 – May 2024</span>
                    </div>
                    <BulletList items={[
                      "Surveyed 295 consumers with a 9-member team, enhancing targeted marketing effectiveness by 15% through sentiment analysis and user-persona mapping",
                    ]} />
                  </div>
                  <div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-0.5 sm:gap-0">
                      <p className="text-sm font-medium text-foreground">LUMS Entrepreneurial Society · <span className="font-normal">Director Marketing & Corporate Relations</span></p>
                      <span className="text-xs text-muted-foreground font-light sm:shrink-0 sm:ml-4">May 2023 – May 2024</span>
                    </div>
                    <BulletList items={[
                      "Steered an 18-person team, successfully securing Rs 60M sponsorship in collaboration with Samsung, Nestle & Dawlance",
                    ]} />
                  </div>
                </div>

                <Divider />

                {/* Research */}
                <SectionTitle>Research & Projects</SectionTitle>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  <span className="font-medium text-foreground">Digital Payments Analysis in Pakistan's E-commerce Sector</span>, conducted primary research on digital payment systems in collaboration with Rayn, surveying 500+ respondents and 30+ interviewees, identifying key areas that could potentially increase digital payment adoption by 20% in the country.
                </p>

                <Divider />

                {/* Skills */}
                <SectionTitle>Skills & Interests</SectionTitle>
                <p className="text-xs text-muted-foreground font-light leading-relaxed">
                  <span className="font-medium text-foreground">Skills:</span> Power BI (PL-300 certified), R, VBA, Microsoft Office, Tableau, SQL, Canva, ClickUp, Asana
                </p>
                <p className="text-xs text-muted-foreground font-light leading-relaxed mt-1">
                  <span className="font-medium text-foreground">Interests:</span> Philosophy, Astronomy, Football, Formula 1 &nbsp;·&nbsp; <span className="font-medium text-foreground">Languages:</span> Urdu (Native), English (Fluent)
                </p>

              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
