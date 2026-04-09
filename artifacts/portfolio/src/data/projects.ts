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
  logoSrc?: string;
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
    category: "Strategy",
    title: "JV Due Diligence and B2B Pipeline Intelligence — Saudi Arabia",
    description: "Supported strategic due diligence for a global technology conglomerate's joint venture entry into Saudi Arabia — spanning competitive landscaping, business model deconstruction, financial analysis, and a proprietary B2B tender intelligence workstream built on 2,000+ scraped government procurement entries.",
    extendedDescription: "This engagement supported due diligence for a global technology giant evaluating a joint venture with a major Saudi conglomerate, structured across two analytical tracks. The first track covered competitive landscaping — deconstructing incumbent and emerging technology players in the Saudi market across business model architecture, product portfolio depth, route-to-market strategies, and financial benchmarks — alongside an analysis of the prospective JV partner's conglomerate structure, subsidiary interdependencies, and strategic alignment with Vision 2030 mandates. The second track was a proprietary B2B pipeline intelligence workstream: scraping, cleaning, and structuring 2,000+ Saudi government procurement entries to map active tender pipelines, identify high-value opportunity clusters, assess competitive capture rates by sector, and build a 3-year forward projection of addressable B2B value pools. The two tracks were synthesised into a dual-output due diligence report covering market-entry risk, JV partner synergy assessment, and a prioritised B2B pipeline targeting framework to support the client's go-to-market positioning in the Kingdom.",
    outcomes: [
      "Constructed a competitive intelligence matrix across Saudi market technology players, benchmarking business model architecture, financial performance, and route-to-market strategies.",
      "Scraped, cleaned, and structured 2,000+ government procurement entries to build a proprietary tender model covering value pools, competitive capture rates, and 3-year forward projections.",
      "Delivered a dual-track due diligence output synthesising market-entry risk, JV partner synergy assessment, and a prioritised B2B pipeline targeting framework.",
    ],
    tools: ["Commercial Due Diligence", "Competitive Intelligence", "Business Model Analysis", "Financial Benchmarking", "Web Scraping", "Government Tender Analysis", "B2B Pipeline Mapping", "Market Entry Strategy", "Joint Venture Advisory", "Vision 2030 Landscape"],
  },
  {
    id: "consulting-3",
    category: "Operations",
    title: "Value Creation Planning and Commercial Performance — KSA Oncology Clinic",
    description: "Architected a multi-initiative value creation plan to offset first-year losses for a KSA oncology clinic — spanning revenue and profitability modelling across 10+ initiatives, CAPEX estimation, and go-to-market strategy — followed by a commercial budgeting model with an integrated performance tracking dashboard.",
    extendedDescription: "This engagement was structured across two sequential workstreams for a KSA-based oncology clinic facing projected first-year operating losses. The first workstream designed and evaluated a value creation plan spanning 10+ revenue-generating initiatives across core oncology and adjacent service verticals. Each initiative underwent a full business model assessment — covering patient and payer segments, pricing architecture, care pathway integration, and competitive positioning — with corresponding multi-year revenue, profitability, and CAPEX projections to support capital allocation decisions. A go-to-market strategy was developed per initiative, mapping referral network development, institutional payer engagement, and direct acquisition pathways. The second workstream translated the approved initiative set into a commercial operating model: a dynamic budgeting and forecasting tool tracking revenue by service line, patient funnel conversion, and budget variance — designed for active use by the clinic's commercial leadership in monthly performance reviews and board reporting.",
    outcomes: [
      "Modelled 10+ value creation initiatives across core and adjacent service lines, producing multi-year revenue, profitability, and CAPEX projections to prioritise capital allocation.",
      "Developed a go-to-market strategy mapping referral network development, institutional payer engagement, and direct acquisition pathways per initiative.",
      "Built a commercial budgeting and forecasting model with an integrated dashboard tracking revenue by service line, funnel conversion, and budget variance for commercial leadership.",
    ],
    tools: ["Value Creation Planning", "Revenue Modelling", "Profitability Analysis", "CAPEX Estimation", "Go-to-Market Strategy", "Commercial Forecasting", "Budget Modelling", "Dashboard Development", "Healthcare Strategy", "Oncology Market Analysis", "KPI Tracking"],
  },
  {
    id: "consulting-4",
    category: "Case Study",
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
    category: "Coming Soon",
    title: "PSX Insight — Live Financial Intelligence for the Pakistani Stock Market",
    description: "An AI-powered financial intelligence platform in development — delivering live and historical PSX analytics, unbiased stock performance analysis, macro and company-level market intelligence, and personalised wealth generation tools for Pakistani retail investors.",
    extendedDescription: "PSX Insight is a financial intelligence platform in development, built on an n8n automation backend, an MCP integration layer, and a Replit frontend. It is designed for retail investors in Pakistan who lack access to consolidated, real-time financial data for the Pakistan Stock Exchange. The data infrastructure runs on live PSX API feeds and automated scraping pipelines monitoring stock performance in real time and historically. On top of this, the platform generates unbiased, data-driven stock performance analysis across both technical and fundamental dimensions — free from the noise of social media speculation or broker-driven narratives. A macro intelligence layer monitors policy changes, economic indicators, and sector-level developments, surfacing directional market impact assessments for each company in the user's watchlist. The platform also includes a wealth generation calculator, a brokerage onboarding guide, and a financial literacy module — designed to lower the barrier to entry for first-time investors in a market where capital participation sits below 1% of the population.",
    outcomes: [
      "Live and historical PSX stock monitoring via API feeds and scraping pipelines.",
      "AI-driven stock performance analysis across technical and fundamental dimensions.",
      "Macro, policy, and company-level intelligence with directional market impact assessments.",
      "Wealth generation calculator, brokerage onboarding guide, and financial literacy module.",
    ],
    tools: ["n8n Automation", "MCP Integration", "PSX API", "Web Scraping", "Financial Analysis", "AI-Powered Analytics", "Stock Market Intelligence", "Replit Frontend", "Wealth Modelling", "Retail Investor Tools"],
  },
  {
    id: "passion-2",
    category: "Coming Soon",
    title: "DeckAI — AI-Powered Presentation Builder for Consultants",
    description: "A presentation intelligence tool in development — generating polished, brand-aligned first-draft decks for consultants and knowledge workers, with live editing, branding configuration, context-aware content generation, and research integration.",
    extendedDescription: "DeckAI is a presentation intelligence application in development for consultants, analysts, and knowledge workers who need to produce high-quality presentation drafts rapidly. The platform ingests past decks and contextual inputs — branding guidelines, slide aesthetics, structural preferences, and narrative style — and generates drafts that are immediately presentable and contextually aligned. Users configure branding parameters including colour palettes, typography, logo placement, and slide layout preferences, which the generation engine respects across every output. The tool supports both full-deck generation from a brief and single-slide generation from a prompt — with live in-app editing to iterate on individual slides without regenerating the full deck. A later development stage introduces research integration: the ability to attach data sources, reports, or URLs and have the platform generate data-driven slides with sourced content, structured arguments, and auto-formatted charts — compressing what typically takes hours of analyst time into a single generation cycle.",
    outcomes: [
      "Brand-aware deck generation trained on past presentations and branding guidelines.",
      "Full-deck and single-slide generation with live in-app editing.",
      "Context-sensitive content architecture aligned to narrative structure and aesthetic preferences.",
      "Research-integrated content generation for data-driven slides in later development stages.",
    ],
    tools: ["AI Presentation Generation", "Branding Configuration", "Context-Aware Content", "Live Editing", "LLM Integration", "Consultant Tooling", "Deck Automation", "Research Synthesis"],
  },
];

export const aiProjects: ProjectItem[] = [
  {
    id: "ai-1",
    category: "Automation",
    title: "Lecture Intelligence Pipeline — Transcription, Summarisation and WhatsApp Distribution",
    description: "Built an end-to-end n8n pipeline that transcribes multilingual weekly Islamic lectures via AssemblyAI, generates LLM-powered summaries with one-click lecturer approval, formats outputs into branded PDFs, and distributes them to registered participants over WhatsApp.",
    extendedDescription: "This automation was built for a non-profit organisation focused on the academic study of Islam, to capture and scale the reach of a weekly lecture series. Participants who fill out a Google Form registration at the physical event receive an AI-generated lecture summary delivered to their phones — creating an attendance incentive through digital content delivery. The pipeline runs on n8n and triggers automatically when a new lecture recording is uploaded to a designated Google Drive folder. The audio file is passed to AssemblyAI for multilingual transcription across Arabic, English, and Urdu. The raw transcript is then enriched with pre-lecture context — topic, speaker, and thematic framing — before being passed to an LLM summarisation layer that produces a structured, readable summary. The summary is written to a Google Doc and shared with the lecturer for one-click approval. Once approved, a branded PDF is generated and personalised WhatsApp messages are dispatched to all registered attendees for that week via a custom WHAPI HTTP integration pulling contact data from Google Sheets.",
    outcomes: [
      "Deployed a multilingual transcription pipeline via AssemblyAI across Arabic, English, and Urdu, eliminating manual transcription for a recurring weekly event.",
      "Built an LLM summarisation layer with pre-lecture context enrichment and a one-click lecturer approval workflow via Google Docs.",
      "Automated branded PDF generation and personalised WhatsApp distribution to weekly registrants via a custom WHAPI HTTP integration.",
    ],
    tools: ["n8n Automation", "AssemblyAI", "LLM Integration", "Google Drive Trigger", "Google Docs", "Google Sheets", "WhatsApp API (WHAPI)", "PDF Generation", "Multilingual Transcription", "Workflow Orchestration", "Non-Profit Tech"],
    externalUrl: "/naseeha",
    externalUrlLabel: "Explore Full Project",
  },
  {
    id: "ai-2",
    category: "Coming Soon",
    title: "Autonomous Job Application Agent — Resume Tailoring, Research and Automated Submission",
    description: "An agentic AI job application system in development — autonomously surfacing opportunities across the web and LinkedIn, conducting deep company research, tailoring resumes to job descriptions, and submitting applications with human-in-the-loop flagging for edge cases.",
    extendedDescription: "This autonomous agent is in development, designed to compress the end-to-end job application process for professionals in consulting and knowledge-intensive roles. The discovery layer continuously scrapes the web and LinkedIn for postings matching predefined criteria — role type, seniority, sector focus, and work modality. Each identified opportunity triggers a company research workstream, where the agent traverses the company's website, LinkedIn, social media, and publicly available financial or news data to build a structured research brief. This brief informs both the resume tailoring step — where the agent rewrites and repositions relevant experience sections to align with the job description and ATS keyword requirements — and the cover letter generation step. Human-in-the-loop review is triggered for ambiguous relevance cases, applications requiring additional context or portfolio materials, and low-confidence ATS alignment scores. Approved applications are submitted automatically, with status tracked across a central dashboard.",
    outcomes: [
      "Autonomous opportunity discovery across the web and LinkedIn with filters for role type, sector, seniority, and work modality.",
      "Deep company research engine traversing websites, LinkedIn, social media, and executive profiles ahead of each application.",
      "ATS-optimised resume tailoring per job description with human-in-the-loop flagging for ambiguous relevance, cover letter requirements, and low-confidence matches.",
    ],
    tools: ["Agentic AI", "Web Scraping", "LinkedIn Automation", "Resume Tailoring", "ATS Optimisation", "Company Research", "Human-in-the-Loop", "Workflow Orchestration", "LLM Integration", "Job Application Automation"],
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
    category: "Research",
    title: "Gendered Financial Barriers — Women Entrepreneurs in Pakistan's MSME Landscape",
    description: "A LUMS Senior Year Project examining the financial exclusion of women-led micro-enterprises in Pakistan — analysing barriers across formal banking, microfinance, fintech, and informal lending, supported by primary interviews and a quantitative financial modelling workstream.",
    extendedDescription: "This case study, produced as a Senior Year Project at LUMS, explores the systemic financial exclusion faced by women-led MSMEs in Pakistan. Built around the narrative of Amina — a home-based tailor in Lahore aspiring to formalise and scale her business — the case maps the structural and gendered barriers that prevent women micro-entrepreneurs from accessing formal credit. Despite MSMEs constituting 90% of Pakistani businesses and generating 40% of GDP, SME lending stood at just 7% of total bank credit as of 2023, with women-owned enterprises disproportionately excluded. The research mapped the full financing landscape across four channels: formal banking (characterised by collateral requirements and documentation barriers), microfinance institutions (accessible but high-cost at 25–35% interest), digital fintech platforms (emerging but limited in reach), and informal moneylenders (high-cost and exploitative). Primary semi-structured interviews were conducted with microfinance and financial inclusion practitioners to ground the qualitative analysis in practitioner insight. A quantitative financial model then compared three financing scenarios — MFI loan, digital fintech product, and government SAAF loan — across repayment burden, Debt Service Coverage Ratio (DSCR), net cash flow, and Internal Rate of Return (IRR), with sensitivity testing across revenue fluctuations and interest rate scenarios. The study concludes with policy and product recommendations centred on fintech-enabled credit scoring, government-backed blended finance instruments, and gender-disaggregated lending mandates for financial institutions.",
    outcomes: [
      "Mapped the end-to-end financing landscape for women micro-entrepreneurs in Pakistan across formal, semi-formal, digital, and informal channels — benchmarked on cost, accessibility, tenure, and scalability.",
      "Conducted primary research via semi-structured interviews with microfinance and financial inclusion practitioners to ground qualitative analysis in practitioner insight.",
      "Built a quantitative financial model comparing MFI, digital fintech, and government SAAF loan scenarios across repayment burden, DSCR, net cash flow, and IRR — with sensitivity testing across revenue and interest rate fluctuations.",
      "Identified systemic policy and institutional gaps in Pakistan's gender-inclusive finance landscape and proposed fintech-enabled product and policy interventions.",
    ],
    tools: ["Case Study Research", "Financial Modelling", "Sensitivity Analysis", "Gender Economics", "MSME Finance", "Microfinance Analysis", "Fintech Landscape Mapping", "Primary Interviews", "Policy Analysis", "DSCR & IRR Modelling", "Lahore University of Management Sciences"],
    externalUrl: "https://drive.google.com/drive/folders/1kt18vamyRCZsJxVp-lSSbO5JrqYa0stz?usp=drive_link",
    externalUrlLabel: "View Full Project",
  },
  {
    id: "academic-3",
    category: "Research Project - Business Analytics",
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
    title: "Power BI Data Analyst Associate (PL-300)",
    issuer: "Microsoft",
    year: "August 2024",
    skills: ["Power BI", "Data Modelling", "DAX", "Data Visualisation", "Business Intelligence"],
    logoSrc: "/microsoft-logo.svg",
  },
  {
    id: "cert-2",
    title: "Fundamentals of Agents",
    issuer: "Hugging Face",
    year: "July 2025",
    skills: ["LLM Agents", "Tool Use", "ReAct Framework", "Agentic Workflows", "AI Engineering"],
    logoSrc: "/huggingface-logo.svg",
  },
  {
    id: "cert-3",
    title: "Introduction to Tableau",
    issuer: "DataCamp",
    year: "August 2024",
    skills: ["Tableau", "Data Visualisation", "Dashboard Design", "Business Analytics"],
    logoSrc: "/datacamp-logo.svg",
  },
  {
    id: "cert-4",
    title: "Data Analyst",
    issuer: "DataCamp",
    year: "August 2024",
    skills: ["Data Analysis", "Python", "SQL", "Statistical Thinking", "Data Wrangling"],
    logoSrc: "/datacamp-logo.svg",
  },
];
