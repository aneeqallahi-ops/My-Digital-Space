export type ProjectItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  extendedDescription: string;
  outcomes: string[];
  tools: string[];
  externalUrl?: string;
  externalUrlLabel?: string;
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
    title: "Affiliate Sales Model Architecture for a Leading Omni-Channel Electronics Retailer",
    description: "Executed a three-phase diagnostic engagement to design a best-fit corporate affiliate sales model — spanning competitive due diligence, primary qualitative research, and a full go-to-market strategy with affiliate lifecycle mapping — for Pakistan's largest omni-channel electronics retailer operating across 24 phygital stores in 18 cities.",
    extendedDescription: "Pakistan's pioneering omni-channel electronics retailer — operating a high-traffic e-commerce platform alongside a network of 24 phygital stores across 18 cities — sought to institutionalise a structured corporate affiliate sales program anchored in university ecosystems across Karachi, Lahore, and Islamabad (KLI). The client lacked a defined affiliate acquisition funnel, an onboarding and training protocol, and a retention architecture beyond baseline monetary incentives. Our engagement was scoped across three sequential phases: Phase 1A/1B (Due Diligence), Phase 2 (Student Sentiment Analysis), and Phase 3 (Marketing Strategy & Affiliate Journey Mapping). Phase 1 involved a granular company snapshot — deconstructing the client's unique value proposition, key partner ecosystem including fintech integrations with Buy-Now-Pay-Later rails and insurance overlays, 3PL-dependent fulfillment model, and omni-channel marketing architecture. Phase 1B benchmarked top-performing e-commerce players with active affiliate programs in India and Bangladesh — including Flipkart (~40% Indian e-commerce market share), Amazon India, and Snapdeal — extracting commission-per-sale structures, average revenue-per-affiliate metrics, affiliate tenure distributions, and loyalty and non-monetary incentive frameworks.",
    outcomes: [
      "Benchmarked 3+ South Asian e-commerce affiliate models across commission architecture, affiliate retention mechanics, and revenue-per-affiliate KPIs to establish a replicable baseline for the client",
      "Designed a primary research framework targeting KLI university cohorts to surface incentive preference distributions and structural participation drivers",
      "Architected a full affiliate lifecycle playbook spanning onboarding protocols, post-onboarding B2B outreach workflows, and a non-monetary incentive retention funnel",
    ],
    tools: ["Competitive Benchmarking", "Primary Research Design", "Affiliate Model Architecture", "Omni-Channel Strategy", "Student Sentiment Mapping", "Market Segmentation", "Go-to-Market Strategy", "Stakeholder Journey Mapping"],
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
    category: "Research Project - Product Development",
    title: "Aghaaz — Validating a Digital Micro-Investment Platform for Pakistan's Underserved Market",
    description: "Conceptualised and validated a Shariah-compliant digital micro-investment application targeting Pakistan's sub-0.1% capital market participation rate, deploying conjoint analysis, Kansei engineering, and Van Westendorp PSM to derive evidence-based product architecture and pricing.",
    extendedDescription: "Aghaaz was conceptualised to address structural gaps in Pakistan's financial ecosystem — a 38% financial literacy rate, a capital market participation rate below 0.1%, and an 81% unbanked adult population — by providing a low-entry, Shariah-compliant digital micro-investment platform. The product validation workstream was structured across three analytical deliverables. In Deliverable 1, a market gap was identified through NLP-driven sentiment analysis of 1,500+ app store reviews across three incumbent platforms (K-Trade, Trikl, Finqalab), surfacing recurring pain points around UX complexity and lack of personalisation. A perceptual map was constructed along user experience and personalised value-addition axes, identifying a clear whitespace for Aghaaz's positioning. In Deliverable 2, a fractional factorial conjoint design was deployed — shortlisting 20 orthogonal bundles from 144 possible attribute combinations (3x4x2x3x2) across five attributes: investment type, support features, payment model, initial investment threshold, and Shariah compliance. Regression analysis on 49 respondents identified Shariah-compliant portfolios (estimate = 0.201, p = 0.021), trustworthiness (estimate = 0.064, p = 0.005), and empowerment (estimate = 0.048, p = 0.04) as statistically significant preference drivers. Hierarchical clustering via Ward's D2 method segmented respondents into two behavioural clusters: cautious low-risk investors and engagement-driven higher-risk users. Kansei analysis across four emotive dimensions confirmed the freemium model eroded trust (estimate = -0.352, p = 0.004), validating the commission-based pricing architecture. Van Westendorp PSM analysis produced an Indifference Price Point of 0.16% commission, within an acceptable range of 0.13% to 0.18%. In Deliverable 3, a TAM-SAM-SOM market sizing model projected a realistic SOM of 26,117 users in Year 1 (Lahore + Islamabad) scaling to 60,250 by Year 3 (Punjab + Karachi), applying a 3.75% customer acquisition rate and 63% industry-standard churn. A phased influencer marketing strategy across awareness, engagement, and conversion stages was validated through TURF analysis across five creative executions, with A/B testing confirming the funky engagement-led creative significantly outperformed feature-led ads (chi-square, p < 0.05).",
    outcomes: [
      "Identified statistically significant preference drivers via conjoint regression, with Shariah-compliance and trust emerging as primary utility weights across both respondent clusters",
      "Determined optimal commission rate of 0.16% via Van Westendorp PSM, corroborated against an industry benchmark of 0.15%",
      "Projected a 3-year geographic SOM rollout from 26,117 to 60,250 users using a TAM-SAM-SOM framework with scenario-based customer acquisition modelling",
      "Validated creative strategy through TURF and chi-square A/B testing, confirming statistically significant differences in ad conversion likelihood at the 5% significance level",
    ],
    tools: ["Conjoint Analysis", "Kansei Engineering", "Van Westendorp PSM", "TURF Analysis", "A/B Testing", "Hierarchical Clustering", "TAM-SAM-SOM Modelling", "Fractional Factorial Design", "Sentiment Analysis", "Influencer Marketing Strategy", "Market Sizing"],
    externalUrl: "https://drive.google.com/drive/folders/1kt18vamyRCZsJxVp-lSSbO5JrqYa0stz?usp=drive_link",
    externalUrlLabel: "View Full Project",
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
    externalUrlLabel: "Click here to access the report",
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
