export type ProjectItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  extendedDescription: string;
  outcomes: string[];
  tools: string[];
  externalUrl?: string;
};

export type CertificationItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  skills: string[];
};

export const consultingProjects: ProjectItem[] = [
  {
    id: "consulting-1",
    category: "Strategy",
    title: "[Strategy Engagement Client A]",
    description: "[Placeholder: Description of the strategic initiative, the core problem solved, and the measurable impact delivered for the client.]",
    extendedDescription: "[Placeholder: Full narrative of the engagement — the client context, the challenge at hand, Aneeq's role in the project team, the analytical approach taken, the key findings surfaced, and the recommendations presented to leadership. Include any notable moments or pivots during the engagement.]",
    outcomes: [
      "[Outcome 1: e.g., Delivered a market sizing model covering X segments across Y geographies]",
      "[Outcome 2: e.g., Identified $Xm in addressable cost savings through process benchmarking]",
      "[Outcome 3: e.g., Final strategy deck presented to C-suite; adopted as FY roadmap]",
    ],
    tools: ["[Framework A]", "[Tool B]", "[Methodology C]", "[Software D]"],
  },
  {
    id: "consulting-2",
    category: "Operations",
    title: "[Operational Transformation]",
    description: "[Placeholder: Details on an operational overhaul, focusing on efficiency gains and process optimization.]",
    extendedDescription: "[Placeholder: Full narrative of the operational engagement — what the client's baseline state looked like, the diagnostic workstream Aneeq led, the root causes identified in the operational model, and the transformation playbook designed and piloted with the client team.]",
    outcomes: [
      "[Outcome 1: e.g., Mapped and re-engineered X core processes across Y business units]",
      "[Outcome 2: e.g., Reduced cycle time by X% on the primary fulfillment workflow]",
      "[Outcome 3: e.g., Change management plan adopted by the client's internal COO office]",
    ],
    tools: ["[Process Mapping Tool]", "[Analytics Platform]", "[Framework]", "[Collaboration Tool]"],
  },
  {
    id: "consulting-3",
    category: "Growth",
    title: "[Market Entry Strategy]",
    description: "[Placeholder: Overview of a market entry analysis, competitive landscaping, and the resulting roadmap.]",
    extendedDescription: "[Placeholder: Full context on the market entry engagement — the geography or vertical the client was targeting, the competitive intelligence workstream, the demand analysis performed, and the go-to-market sequencing recommended. Describe any modelling or scenario analysis built to stress-test the recommendation.]",
    outcomes: [
      "[Outcome 1: e.g., Built a comprehensive competitive map of X players across Y segments]",
      "[Outcome 2: e.g., Validated a $Xbn addressable opportunity through primary research]",
      "[Outcome 3: e.g., Phased entry roadmap adopted; client launched in target market within X months]",
    ],
    tools: ["[Market Research Tool]", "[Financial Modelling]", "[Survey Platform]", "[Framework]"],
  },
];

export const passionProjects: ProjectItem[] = [
  {
    id: "passion-1",
    category: "Venture",
    title: "[Entrepreneurial Pursuit]",
    description: "[Placeholder: A side project or venture being explored outside of core consulting hours.]",
    extendedDescription: "[Placeholder: The story behind this venture — the problem observed, the hypothesis being tested, what's been built so far, who the target user is, and what success would look like at an early stage. Mention any collaborators, advisors, or early traction if applicable.]",
    outcomes: [
      "[Outcome 1: e.g., Validated problem hypothesis through X user interviews]",
      "[Outcome 2: e.g., Built and shipped an MVP in X weeks]",
      "[Outcome 3: e.g., Reached X early adopters / X in early revenue]",
    ],
    tools: ["[Tech Stack]", "[No-code Tool]", "[Analytics]", "[Distribution Channel]"],
  },
  {
    id: "passion-2",
    category: "Research",
    title: "[Industry Deep Dive]",
    description: "[Placeholder: A published essay or deep research piece into a specific market vertical.]",
    extendedDescription: "[Placeholder: The motivation for this research piece — what triggered the deep dive, what primary and secondary sources were consulted, what the central thesis is, and what the piece concludes. If published, mention where it was shared and the response it received.]",
    outcomes: [
      "[Outcome 1: e.g., X,000-word original research piece published on [Platform]]",
      "[Outcome 2: e.g., Cited by / shared by X notable voices in the space]",
      "[Outcome 3: e.g., Led to an introduction / speaking invitation / follow-up project]",
    ],
    tools: ["[Research Method]", "[Data Source]", "[Writing Platform]", "[Analysis Tool]"],
  },
];

export const aiProjects: ProjectItem[] = [
  {
    id: "ai-1",
    category: "LLM Application",
    title: "[Internal Knowledge Tool]",
    description: "[Placeholder: Development of an LLM-based tool to parse proprietary datasets and accelerate research.]",
    extendedDescription: "[Placeholder: The use case this tool was built for — what the manual research workflow looked like before, how the LLM layer was structured, what document types and data sources it ingests, and how it surfaces relevant insights. Describe the prompt engineering, retrieval strategy, and any fine-tuning involved.]",
    outcomes: [
      "[Outcome 1: e.g., Reduced research retrieval time from X hours to X minutes per engagement]",
      "[Outcome 2: e.g., Indexed X documents across X data sources]",
      "[Outcome 3: e.g., Deployed internally for use across the team at Intellia]",
    ],
    tools: ["[LLM Provider]", "[Vector DB]", "[Framework]", "[Language]", "[Infra]"],
  },
  {
    id: "ai-2",
    category: "Workflow",
    title: "[Process Automation Pipeline]",
    description: "[Placeholder: Architecture of an automated pipeline to handle repetitive analytical tasks.]",
    extendedDescription: "[Placeholder: The specific repetitive task this pipeline replaced — what the manual steps involved, how the automation was designed, what triggers and data sources it connects, and how human-in-the-loop review was incorporated. Include any reliability or accuracy metrics achieved post-deployment.]",
    outcomes: [
      "[Outcome 1: e.g., Automated X hours/week of manual analytical work]",
      "[Outcome 2: e.g., Pipeline achieved X% accuracy on primary task vs. manual baseline]",
      "[Outcome 3: e.g., Scaled to handle X tasks per week with zero manual intervention]",
    ],
    tools: ["[Automation Tool]", "[API / Connector]", "[LLM]", "[Monitoring]", "[Language]"],
  },
];

export const academicProjects: ProjectItem[] = [
  {
    id: "academic-1",
    category: "Thesis",
    title: "[Undergraduate Thesis]",
    description: "[Placeholder: Summary of primary academic research focus and methodologies.]",
    extendedDescription: "[Placeholder: Full description of the thesis — the research question posed, the theoretical framework applied, the methodology used (qualitative, quantitative, or mixed), the primary data collection process, key findings, and how the conclusions contributed to the field. Mention the supervising faculty and the grade/distinction if received.]",
    outcomes: [
      "[Outcome 1: e.g., Thesis awarded [Grade / Distinction] by [University / Department]]",
      "[Outcome 2: e.g., Dataset of X responses / X cases analysed]",
      "[Outcome 3: e.g., Findings contributed to [specific academic or policy discussion]]",
    ],
    tools: ["[Research Software]", "[Statistical Method]", "[Survey Tool]", "[Citation Manager]"],
  },
  {
    id: "academic-2",
    category: "Publication",
    title: "[Academic Paper]",
    description: "[Placeholder: Details of a co-authored paper or significant university project.]",
    extendedDescription: "[Placeholder: The context of this publication — the journal or conference it was submitted to, Aneeq's specific contribution to the paper (e.g., literature review, data analysis, drafting), the core argument of the paper, and its current status (under review, accepted, published). Include co-authors if applicable.]",
    outcomes: [
      "[Outcome 1: e.g., Submitted to / Published in [Journal / Conference]]",
      "[Outcome 2: e.g., Reviewed by X peer reviewers; revise-and-resubmit / accepted]",
      "[Outcome 3: e.g., Cited X times since publication]",
    ],
    tools: ["[Research Tool]", "[Statistical Package]", "[Writing Tool]", "[Data Source]"],
  },
  {
    id: "academic-3",
    category: "Case Study",
    title: "[Business Case Analysis]",
    description: "[Placeholder: A comprehensive case study from business education.]",
    extendedDescription: "[Placeholder: The case study context — the company or situation analysed, the course or programme it was produced for, the frameworks applied (e.g., Porter's Five Forces, BCG Matrix), the key recommendation put forward, and any recognition received (top submission, faculty commendation, etc.)]",
    outcomes: [
      "[Outcome 1: e.g., Produced as part of [Course] at [Institution]]",
      "[Outcome 2: e.g., Received [Grade / Commendation] from faculty]",
      "[Outcome 3: e.g., Case analysis shared / used as an example in subsequent cohort]",
    ],
    tools: ["[Framework A]", "[Framework B]", "[Analysis Tool]", "[Presentation Tool]"],
  },
];

export const certifications: CertificationItem[] = [
  {
    id: "cert-1",
    title: "[Certification Title]",
    issuer: "[Issuing Body]",
    year: "[Year]",
    skills: ["[Skill A]", "[Skill B]", "[Skill C]", "[Topic D]"],
  },
  {
    id: "cert-2",
    title: "[Certification Title]",
    issuer: "[Issuing Body]",
    year: "[Year]",
    skills: ["[Skill A]", "[Skill B]", "[Skill C]", "[Topic D]"],
  },
  {
    id: "cert-3",
    title: "[Certification Title]",
    issuer: "[Issuing Body]",
    year: "[Year]",
    skills: ["[Skill A]", "[Skill B]", "[Skill C]", "[Topic D]"],
  },
  {
    id: "cert-4",
    title: "[Certification Title]",
    issuer: "[Issuing Body]",
    year: "[Year]",
    skills: ["[Skill A]", "[Skill B]", "[Skill C]", "[Topic D]"],
  },
];
