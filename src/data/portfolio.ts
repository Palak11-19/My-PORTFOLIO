export const site = {
  name: "Palak Sharma",
  firstName: "Palak",
  lastName: "Sharma",
  monogram: "PS",
  role: "Agentic AI Engineer | AI Automation Developer",
  signature: "AI Engineer & Developer",
  location: "Faridabad, India",
  timezone: "IST",
  email: "palak.s1119@gmail.com",
  availability: "Available for freelance & AI projects",
  headline: ["Building intelligent", "AI agents &", "automation."],
  intro:
    "Agentic AI Engineer with hands-on experience building AI-powered web applications and automation workflows using Python, JavaScript, Next.js, React, and LLM APIs (OpenAI, Gemini). Skilled in prompt engineering, conversational AI design, and shipping production-ready full-stack applications.",
  statusTicker: [
    "SYSTEM NOMINAL",
    "AVAILABLE FOR PROJECTS",
    "FARIDABAD · IST",
    "AI × AUTOMATION",
  ],
};

export const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "recognition", label: "Notes" },
  { id: "contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/Palak11-19" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/palak-sharma-06660738a" },
  { label: "Email", href: "mailto:palak.s1119@gmail.com" },
];

export const characters = {
  standing: "/characters/standing.png",
  portrait: "/characters/portrait.png",
  pointingRight: "/characters/pointing-right.png",
  pointingLeft: "/characters/pointing-left.png",
  thinking: "/characters/thinking.png",
  coding: "/characters/coding.png",
  celebrating: "/characters/celebrating.png",
  thumbsUp: "/characters/thumbs-up.png",
  presenting: "/characters/presenting.png",
  sitting: "/characters/sitting.png",
};

export const about = {
  kicker: "About",
  index: "01",
  title: "Focused on building",
  italic: "intelligent solutions.",
  story: [
    "Palak Sharma is an Agentic AI Engineer and AI Automation Developer focused on turning business requirements into practical, production-ready digital products. With a foundation in computer science and ongoing MCA studies at Chandigarh University, she combines full-stack web development with modern AI tooling.",
    "Her work spans AI-powered finance tools, business automation agents, and responsive web applications — always with an emphasis on useful outcomes over experimental demos. She is skilled in prompt engineering, conversational AI design, and integrating LLM APIs into real workflows.",
    "Internship experience at Gargi Technology sharpened her skills in software testing, QA, and client-facing requirement validation. Today she freelances on modern web builds while independently shipping AI and automation projects from concept to deployment.",
  ],
  facts: [
    { label: "Education", value: "MCA, Chandigarh University (2027)" },
    { label: "Foundation", value: "B.Sc., PDUSU University (2024)" },
    { label: "Location", value: "Faridabad, India / Remote" },
    { label: "Focus", value: "Agentic AI & automation" },
    { label: "Currently", value: "Freelance & AI projects" },
    { label: "Stack", value: "Python, Next.js, React, LLM APIs" },
  ],
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  dates: string;
  location: string;
  type: string;
  accent: boolean;
  metrics: string[];
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    id: "gargi",
    company: "Gargi Technology",
    role: "Software Intern",
    dates: "Feb 2026 — May 2026",
    location: "India",
    type: "Internship",
    accent: true,
    metrics: ["React & Next.js", "QA & testing", "Client meetings"],
    description:
      "Worked in a software development environment on client-facing web projects, contributing to application testing, feature validation, automation, and project coordination. Collaborated with developers to identify issues, verify fixes, and ensure features worked as expected. Participated in client meetings and requirement discussions, gaining practical experience with React, Next.js, JavaScript, Tailwind CSS, and Python.",
  },
  {
    id: "freelance",
    company: "Freelance",
    role: "Web Developer",
    dates: "2025 — Present",
    location: "Remote",
    type: "Freelance",
    accent: false,
    metrics: ["Next.js & React", "TypeScript", "Responsive UI"],
    description:
      "Designing and developing modern, responsive websites and web applications for business use cases. Working with Next.js, React, JavaScript, TypeScript, Tailwind CSS, and Python to create clean interfaces, functional user flows, and scalable web solutions. Focused on transforming business requirements into practical digital products using modern development tools and AI-assisted workflows.",
  },
  {
    id: "ai-projects",
    company: "Independent Projects",
    role: "AI & Automation Developer",
    dates: "2025 — Present",
    location: "Remote",
    type: "Projects",
    accent: true,
    metrics: ["OpenAI & Gemini", "Python automation", "AI agents"],
    description:
      "Building hands-on AI-powered applications and automation projects to explore practical applications of artificial intelligence in business workflows. Working with Python, OpenAI APIs, Gemini API, prompt engineering, and modern web technologies. Projects include AI-powered finance tools, business automation solutions, and intelligent web applications focused on creating useful products.",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  blurb: string;
  tags: string[];
  outcome: string;
  match: number;
  href: string;
};

export const projects: Project[] = [
  {
    id: "monsoon-pro",
    title: "Monsoon Pro Salon",
    category: "Web · Business",
    year: "2025",
    blurb:
      "Premium salon website with responsive UI, service sections, authentication, animations, and a modern booking-oriented user experience.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    outcome: "Full-featured salon site with auth and animated service flows.",
    match: 96,
    href: "#contact",
  },
  {
    id: "wisely-ai",
    title: "Wisely AI Mate",
    category: "AI · Finance",
    year: "2025",
    blurb:
      "AI-powered finance assistant designed to help users organize and understand their financial information through an interactive web interface.",
    tags: ["Next.js", "OpenAI", "Gemini", "Finance"],
    outcome: "Interactive finance assistant with LLM-powered insights.",
    match: 98,
    href: "#contact",
  },
  {
    id: "business-agent",
    title: "Business Agent",
    category: "AI Agent · Automation",
    year: "2025",
    blurb:
      "AI-powered business assistant focused on automating business workflows, handling information, and providing intelligent responses through a web interface.",
    tags: ["Next.js", "Python", "AI Agent", "APIs"],
    outcome: "Workflow automation agent for business information handling.",
    match: 95,
    href: "#contact",
  },
  {
    id: "virtu",
    title: "VIRTU — Virtual Try-On",
    category: "AI · E-commerce",
    year: "2025",
    blurb:
      "Virtual try-on concept that allows users to upload clothing and model/face images to visualize how outfits could look before making a purchase.",
    tags: ["Next.js", "Computer Vision", "AI", "E-commerce"],
    outcome: "Visual try-on prototype for online clothing retail.",
    match: 93,
    href: "#contact",
  },
];

export const projectTicker = [
  "MONSOON PRO SALON",
  "WISELY AI MATE",
  "BUSINESS AGENT",
  "VIRTU",
  "AI PROJECTS",
  "SELECTED WORK",
];

export type SkillCategory = {
  id: string;
  label: string;
  index: string;
  description: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "fullstack",
    label: "Full-Stack Development",
    index: "01",
    description:
      "Building responsive, production-ready web applications with modern JavaScript frameworks and clean user interfaces.",
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "FastAPI",
      "HTML/CSS",
    ],
  },
  {
    id: "ai",
    label: "AI & Automation",
    index: "02",
    description:
      "Designing intelligent agents, LLM integrations, and automation workflows that solve real business problems.",
    skills: [
      "Python",
      "OpenAI API",
      "Gemini API",
      "Prompt Engineering",
      "AI Automation",
      "Conversational AI",
      "AI Agents",
    ],
  },
  {
    id: "tools",
    label: "Tools & Practices",
    index: "03",
    description:
      "Version control, databases, testing, and the fundamentals that keep projects reliable and maintainable.",
    skills: ["SQL", "Git/GitHub", "Software Testing", "QA", "API Integration"],
  },
];

export const skillTicker = [
  "PYTHON",
  "NEXT.JS",
  "REACT",
  "AI APIS",
  "AUTOMATION",
  "TYPESCRIPT",
  "LLMS",
  "FULL-STACK",
];

export const marqueePrimary = [
  "Python",
  "JavaScript",
  "React",
  "Next.js",
  "TypeScript",
  "AI APIs",
  "Automation",
  "FastAPI",
];

export const marqueeSecondary = [
  "Prompt Engineering",
  "AI Agents",
  "OpenAI",
  "Gemini",
  "Full-Stack",
  "SQL",
  "Git/GitHub",
  "Web Development",
];

export type Achievement = {
  id: string;
  kind: "award" | "leadership" | "publication" | "fellowship";
  title: string;
  org: string;
  year: string;
  detail: string;
};

export const achievements: Achievement[] = [
  {
    id: "mca",
    kind: "fellowship",
    title: "Master of Computer Applications",
    org: "Chandigarh University",
    year: "Expected 2027",
    detail: "Advanced studies in computer applications with focus on software development and emerging technologies.",
  },
  {
    id: "bsc",
    kind: "fellowship",
    title: "Bachelor of Science",
    org: "PDUSU University",
    year: "2024",
    detail: "Foundation in computer science and quantitative sciences.",
  },
  {
    id: "gargi",
    kind: "leadership",
    title: "Software Intern",
    org: "Gargi Technology",
    year: "2026",
    detail: "Client-facing web projects, QA, feature validation, and requirement discussions with development teams.",
  },
  {
    id: "freelance",
    kind: "leadership",
    title: "Freelance Web Developer",
    org: "Independent",
    year: "2025 — Present",
    detail: "Modern responsive websites and web apps for business clients using Next.js, React, and TypeScript.",
  },
  {
    id: "ai-portfolio",
    kind: "publication",
    title: "AI & Automation Portfolio",
    org: "Independent Projects",
    year: "2025 — Present",
    detail: "AI finance tools, business agents, and automation solutions built with Python and LLM APIs.",
  },
  {
    id: "virtu",
    kind: "award",
    title: "VIRTU Virtual Try-On",
    org: "Personal Project",
    year: "2025",
    detail: "Computer vision concept for e-commerce — upload clothing and model images to preview outfits.",
  },
];

export const featuredNote = {
  kicker: "Featured project",
  stat: "AI",
  label: "Wisely AI Mate",
  body: "An AI-powered finance assistant that helps users organize and understand their financial information through an interactive web interface built with Next.js and LLM APIs.",
};

export const focusAreas = [
  "Agentic AI engineering",
  "Workflow automation",
  "Full-stack web apps",
  "LLM integration",
];

export const preloaderMessages = [
  "// SYSTEM BOOT SEQUENCE",
  "// LOADING IDENTITY MODULE",
  "// HYDRATING INTERFACE",
  "// ALIGNING AI CORE",
  "// READY FOR TRANSMISSION",
];
