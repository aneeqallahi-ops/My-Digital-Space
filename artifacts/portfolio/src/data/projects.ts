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
  {
    id: "consulting-4",
    category: "Research",
    title: "Consumer Sentiment Analysis — Frozen Food Sector",
    description: "Deployed a mixed-methods primary research framework across the KLI region to deconstruct consumer purchasing behaviour, psychographic drivers, and trust barriers within Pakistan's frozen food category — surfacing actionable intelligence across the 4P marketing matrix for a leading national FMCG player.",
    extendedDescription: "Engaged as part of a student consultancy team retained by a leading frozen food manufacturer in Pakistan under a confidentiality agreement. The engagement addressed a core market tension: high brand awareness coexisting with a persistent consumer trust deficit. The workstream ran across three sequential phases — quantitative survey distribution, semi-structured qualitative interviews, and data interpretation — to triangulate attitudinal and behavioural signals at scale across Karachi, Lahore, and Islamabad, yielding 260+ survey responses and 37 in-depth interviews.",
    outcomes: [
      "Quantified a category-wide trust crisis: 63% of respondents perceived frozen food as nutritionally deficient, exposing the strategic gap the client needed to close",
      "Mapped substitution behaviour to root causes — freshness, hygiene, and price sensitivity — with over half of consumers actively defecting to street vendors",
      "Diagnosed a pricing perception problem: 75% viewed frozen food as a premium product, yet only 22% felt that premium was justified",
      "Identified high-value distribution blindspots in key urban zones where availability gaps were directly driving customer loss",
      "Reframed the marketing spend debate: hygiene and taste drove purchase decisions while social media and promotions had near-zero influence",
      "Delivered a four-vector strategic framework spanning transparency, packaging, logistics, and loyalty — directly tied to each identified consumer pain point",
    ],
    tools: ["Mixed-Methods Research Design", "Quantitative Survey Instrumentation", "Semi-Structured Interview Protocol", "Consumer Sentiment Analysis", "4P Marketing Framework", "Psychographic Segmentation", "Thematic Coding"],
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
    title: "Gendered Wages in Focus: A Business Analytics Approach to Gender-Based Wage Disparities",
    description: "A data-driven investigation into the UK gender pay gap, analyzing 48,000+ employer records across industries, regions, and company sizes using regression modeling, K-means clustering, and LLM-assisted feature engineering in RStudio — revealing that Banking & Financial Services leads with a 23% pay disparity.",
    extendedDescription: "This project applies a full business analytics pipeline to UK government-mandated gender pay gap data spanning 2017–2022, covering 48,721 employer records across England, Scotland, Wales, and Northern Ireland. The workflow began with multi-stage data cleaning in RStudio, followed by feature engineering — including sector classification, industry category, and geolocation — extracted from company names, SIC codes, and postcodes using Ollama, a locally hosted LLM. A multiple linear regression model identified Banking & Financial Services, Tech & IT, and Consultancy as the strongest predictors of male-favoring pay gaps, while K-means clustering (k=2, selected via elbow method) revealed that even female-majority workplaces still pay men more — though by 1.6% less than male-dominated firms. Findings support targeted policy recommendations around high-gap industries, regional incentive structures, and bonus equity reform.",
    outcomes: [
      "Analyzed 48,721 employer records across 5 years and all 4 UK nations using R",
      "Banking & Financial Services identified as the worst offender at 23% mean hourly pay gap favoring men",
      "Public sector consistently outperformed private sector in closing the gender pay gap year-on-year",
    ],
    tools: ["RStudio", "Regression Modeling", "K-Means Clustering", "Ollama (LLM)", "ggplot2", "Data Cleaning", "Feature Engineering", "Business Analytics"],
    externalUrl: "https://drive.google.com/drive/folders/1Re5i-Tsp4oEn2F0tRBaGyly7c_iyGNWJ?usp=sharing",
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
