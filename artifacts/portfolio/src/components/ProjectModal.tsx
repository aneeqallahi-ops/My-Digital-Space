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
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-70 transition-opacity"
                      data-testid={`modal-external-link-${project.id}`}
                    >
                      Click here to access the report
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="square" strokeLinejoin="miter" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
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
          {/* Backdrop — direct onClose click */}
          <div
            className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Scroll container — top-aligned so header is always reachable */}
          <div className="relative z-10 flex justify-center w-full h-full py-8 px-4 md:px-8 overflow-y-auto pointer-events-none">
            <motion.div
              className="w-full max-w-lg bg-background border border-border/60 shadow-2xl pointer-events-auto self-start"
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-testid={`modal-cert-${cert.id}`}
            >
              <div className="p-8">
                <div className="flex items-start justify-between gap-4 mb-8">
                  <span className="text-primary text-xs uppercase tracking-widest font-semibold pt-1">
                    Certification
                  </span>
                  <CloseButton onClick={onClose} />
                </div>

                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-3 leading-snug">
                    {cert.title}
                  </h2>
                  <p className="text-sm text-muted-foreground font-light">
                    {cert.issuer} &nbsp;·&nbsp; {cert.year}
                  </p>
                </div>

                <div className="border-t border-border/50 pt-8">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-foreground mb-4">
                    Topics &amp; Skills
                  </h3>
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
