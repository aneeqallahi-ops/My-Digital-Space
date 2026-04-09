import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectItem, CertificationItem } from "@/data/projects";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: 24, transition: { duration: 0.25, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

function useModalKeys(isOpen: boolean, onClose: () => void) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className="flex items-center justify-center w-9 h-9 border border-border/60 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors shrink-0"
      data-testid="modal-close-btn"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function TagRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => (
        <span
          key={item}
          className="px-3 py-1 text-xs font-medium border border-border/60 text-muted-foreground bg-muted/40"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProjectModal({ project, onClose }: { project: ProjectItem | null; onClose: () => void }) {
  useModalKeys(!!project, onClose);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          data-testid="modal-backdrop"
        >
          {/* Backdrop — direct onClose click */}
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Scroll container — top-aligned so header is always reachable */}
          <div className="relative z-10 flex justify-center w-full h-full py-8 px-4 md:px-8 overflow-y-auto pointer-events-none">
            <motion.div
              className="w-full max-w-2xl bg-background border border-border/60 shadow-2xl pointer-events-auto self-start"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid={`modal-project-${project.id}`}
            >
              <div className="p-8 md:p-10">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold pt-1">
                    {project.category}
                  </span>
                  <CloseButton onClick={onClose} />
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6 leading-snug">
                  {project.title}
                </h2>

                <p className="text-muted-foreground text-sm font-light leading-relaxed mb-10">
                  {project.extendedDescription}
                </p>

                <div className="border-t border-border/50 pt-8 mb-8">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-4">
                    Key Outcomes
                  </h3>
                  <ul className="space-y-3">
                    {project.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground font-light">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                        {outcome}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border/50 pt-8">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-4">
                    Tools &amp; Skills
                  </h3>
                  <TagRow items={project.tools} />
                </div>

                {project.externalUrl && (
                  <div className="border-t border-border/50 pt-8 mt-8">
                    {project.externalUrl.startsWith("/") ? (
                      <a
                        href={project.externalUrl}
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
                        data-testid={`modal-external-link-${project.id}`}
                      >
                        {project.externalUrlLabel ?? "View Project"}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    ) : (
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
                        data-testid={`modal-external-link-${project.id}`}
                      >
                        {project.externalUrlLabel ?? "View Project"}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── certificate visual replicas ─────────────────────────── */

function MicrosoftCertVisual({ cert }: { cert: CertificationItem }) {
  return (
    <div className="w-full rounded-sm overflow-hidden shadow-lg select-none" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      {/* top band */}
      <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #0078d4, #50e6ff)" }} />

      <div className="bg-[#0f1b2d] text-white p-8 md:p-10">
        {/* header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            {/* Microsoft logo mark */}
            <div className="grid grid-cols-2 gap-[3px] w-7 h-7 shrink-0">
              <div className="bg-[#f25022]" />
              <div className="bg-[#7fba00]" />
              <div className="bg-[#00a4ef]" />
              <div className="bg-[#ffb900]" />
            </div>
            <span className="text-white font-semibold text-base tracking-wide">Microsoft</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40 uppercase tracking-[0.15em]">Certification ID</p>
            <p className="text-[11px] text-white/60 mt-0.5 font-mono">PL-300-2024-ANQ</p>
          </div>
        </div>

        {/* title block */}
        <div className="mb-8">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#50e6ff] font-semibold mb-3">Microsoft Certified</p>
          <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-1">{cert.title}</h3>
          <div className="w-16 h-0.5 mt-4" style={{ background: "linear-gradient(to right, #0078d4, #50e6ff)" }} />
        </div>

        {/* recipient */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1.5">Awarded to</p>
          <p className="text-2xl font-light text-white tracking-wide" style={{ fontFamily: "Georgia, serif" }}>Aneeq Allahi</p>
        </div>

        {/* body text */}
        <p className="text-[12px] text-white/50 font-light leading-relaxed mb-8">
          This certifies that the above named individual has demonstrated the knowledge and skills needed to plan and design a data model, clean and transform data, enable analysis through reports and dashboards, and deploy and maintain Power BI assets.
        </p>

        {/* bottom row */}
        <div className="flex items-end justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Date Earned</p>
            <p className="text-sm text-white/70">{cert.year}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-1">Exam</p>
            <p className="text-sm text-[#50e6ff]">PL-300</p>
          </div>
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-[2px] w-5 h-5">
              <div className="bg-[#f25022]" />
              <div className="bg-[#7fba00]" />
              <div className="bg-[#00a4ef]" />
              <div className="bg-[#ffb900]" />
            </div>
          </div>
        </div>
      </div>

      {/* bottom band */}
      <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #0078d4, #50e6ff)" }} />
    </div>
  );
}

function HuggingFaceCertVisual({ cert }: { cert: CertificationItem }) {
  return (
    <div className="w-full rounded-sm overflow-hidden shadow-lg select-none border border-[#ffcc33]/30">
      {/* top accent */}
      <div className="h-1.5 w-full bg-[#ffcc33]" />

      <div className="bg-white p-8 md:p-10">
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5">
            <span className="text-3xl">🤗</span>
            <div>
              <p className="font-bold text-[#1a1a1a] text-base leading-none">Hugging Face</p>
              <p className="text-[10px] text-[#6b7280] mt-0.5 tracking-wide uppercase">Open Source AI Community</p>
            </div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#ffcc33]/20 flex items-center justify-center">
            <svg className="w-6 h-6 text-[#d4a200]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.745 3.745 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 013.296 1.043 3.745 3.745 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
        </div>

        {/* divider */}
        <div className="w-full h-px bg-[#f0f0f0] mb-8" />

        {/* cert type */}
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#9ca3af] font-semibold mb-4">Certificate of Completion</p>

        {/* recipient */}
        <p className="text-[11px] text-[#6b7280] mb-1 uppercase tracking-widest">This certifies that</p>
        <p className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1" style={{ fontFamily: "Georgia, serif" }}>Aneeq Allahi</p>
        <p className="text-[11px] text-[#6b7280] mb-6">has successfully completed the course</p>

        {/* course name */}
        <div className="bg-[#fffbeb] border border-[#ffcc33]/40 rounded-sm px-5 py-4 mb-8">
          <p className="text-lg font-bold text-[#1a1a1a] leading-snug">{cert.title}</p>
          <p className="text-[12px] text-[#6b7280] mt-1.5">Hugging Face · AI Agents Course</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] mb-1">Date Issued</p>
            <p className="text-sm font-medium text-[#374151]">{cert.year}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-[#9ca3af] mb-1">Platform</p>
            <p className="text-sm font-medium text-[#374151]">huggingface.co</p>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-[#ffcc33]" />
    </div>
  );
}

function DataCampCertVisual({ cert }: { cert: CertificationItem }) {
  return (
    <div className="w-full rounded-sm overflow-hidden shadow-lg select-none border border-[#03ef62]/20">
      {/* top bar */}
      <div className="h-1.5 w-full bg-[#03ef62]" />

      <div className="bg-[#05192d] text-white p-8 md:p-10">
        {/* header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            {/* DataCamp logo approximation */}
            <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
              <circle cx="20" cy="20" r="20" fill="#03ef62" />
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#05192d">D</text>
            </svg>
            <div>
              <p className="font-bold text-white text-sm leading-none">DataCamp</p>
              <p className="text-[10px] text-white/40 mt-0.5">Learn Data Science Online</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 mb-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#03ef62]" />
              ))}
            </div>
            <p className="text-[10px] text-white/30 tracking-widest uppercase">Completed</p>
          </div>
        </div>

        {/* cert type */}
        <p className="text-[11px] uppercase tracking-[0.22em] text-[#03ef62] font-semibold mb-6">Statement of Accomplishment</p>

        {/* body */}
        <p className="text-[12px] text-white/50 leading-relaxed mb-6">
          DataCamp is pleased to certify that
        </p>
        <p className="text-2xl md:text-3xl font-light text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>Aneeq Allahi</p>
        <p className="text-[12px] text-white/50 leading-relaxed mb-8">
          has successfully completed the DataCamp course:
        </p>

        {/* course box */}
        <div className="border border-[#03ef62]/30 rounded-sm px-5 py-4 mb-8 bg-white/5">
          <p className="text-lg font-bold text-white leading-snug">{cert.title}</p>
          <p className="text-[12px] text-white/40 mt-1.5">DataCamp · Online Course</p>
        </div>

        {/* bottom */}
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Date Issued</p>
            <p className="text-sm text-white/70">{cert.year}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Platform</p>
            <p className="text-sm text-[#03ef62]">datacamp.com</p>
          </div>
        </div>
      </div>

      <div className="h-1 w-full bg-[#03ef62]" />
    </div>
  );
}

function CertificateVisual({ cert }: { cert: CertificationItem }) {
  if (cert.issuer === "Microsoft") return <MicrosoftCertVisual cert={cert} />;
  if (cert.issuer === "Hugging Face") return <HuggingFaceCertVisual cert={cert} />;
  return <DataCampCertVisual cert={cert} />;
}

export function CertModal({ cert, onClose }: { cert: CertificationItem | null; onClose: () => void }) {
  useModalKeys(!!cert, onClose);

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-50"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          data-testid="modal-cert-backdrop"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Scroll container */}
          <div className="relative z-10 flex justify-center w-full h-full py-8 px-4 md:px-8 overflow-y-auto pointer-events-none">
            <motion.div
              className="w-full max-w-xl bg-background border border-border/60 shadow-2xl pointer-events-auto self-start"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid={`modal-cert-${cert.id}`}
            >
              {/* modal header */}
              <div className="px-8 pt-8 pb-6 flex items-start justify-between gap-4">
                <span className="text-primary text-xs uppercase tracking-widest font-semibold pt-1">
                  Certificate
                </span>
                <CloseButton onClick={onClose} />
              </div>

              {/* certificate visual */}
              <div className="px-8 pb-8">
                <CertificateVisual cert={cert} />

                {/* skills below */}
                <div className="mt-6 pt-6 border-t border-border/40">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground mb-3">Topics &amp; Skills Covered</p>
                  <TagRow items={cert.skills} />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
