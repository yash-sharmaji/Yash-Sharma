export const portfolioData = {
  personal: {
    name: "Yash Sharma",
    handle: "yash-sharmaji",
    title: "Full-Stack Web Developer, Distributed Systems Engineer & Open Source Contributor",
    roles: [
      "Full-Stack Web Developer",
      "Distributed Systems Engineer",
      "Open Source Contributor (Hacktoberfest & NSoC)",
      "1st Runner-Up @ Code Conqueror India 2026",
      "Competitive Programmer (100+ LeetCode C++)"
    ],
    education: "Computer Science Undergraduate",
    status: "Open to SDE Internships & Collaborative Engineering",
    email: "yashsharmaji8502@gmail.com",
    github: "https://github.com/yash-sharmaji",
    linkedin: "https://www.linkedin.com/in/yash-sharmaji/",
    instagram: "https://www.instagram.com/sharma_ji_yash/",
    sharexLive: "https://sharex-alpha.vercel.app/",
    approach: "Make it correct first, make it fast, and ship things that create genuine value.",
    focus: "Full-stack web development, real-time distributed systems, algorithmic problem solving"
  },

  highlights: [
    {
      badge: "🥈 1st Runner-Up",
      title: "Code Conqueror India 2026",
      description: "Won runner-up with ShareX — Campus resource sharing & real-time allocation platform engineered with distributed Redis concurrency locks and Lua validation."
    },
    {
      badge: "🌐 Hacktoberfest 2026",
      title: "Core Contributor",
      description: "Shipped critical PRs across production repositories: GitHub OAuth integration, Lua execution engine, and auth rate-limiting with Retry-After headers."
    },
    {
      badge: "🎓 NSoC Contributor",
      title: "Open Source Initiative",
      description: "Active contributor and mentor building community developer tooling, automated PR generators, and contributor onboarding kits."
    },
    {
      badge: "🚀 18+ Shipped PRs",
      title: "Cross-Ecosystem Impact",
      description: "Contributed across 10+ open-source codebases spanning React, TypeScript, Node.js, Next.js, and Python."
    },
    {
      badge: "🧠 100+ DSA Solutions",
      title: "Algorithmic Problem Solving",
      description: "Solved 100+ LeetCode problems in modern C++ focusing on DP, Trees, Graphs, Two-Pointers, and Memory-Efficient Greedy algorithms."
    }
  ],

  techStack: {
    Languages: [
      { name: "TypeScript", icon: "Code2", level: "Advanced", desc: "Type-safe interfaces, generics, async pipelines" },
      { name: "JavaScript", icon: "FileCode", level: "Advanced", desc: "ESNext, event loop, functional programming" },
      { name: "C++", icon: "Cpu", level: "Advanced", desc: "Modern C++ (STL, memory management, algorithmic DSA)" },
      { name: "Python", icon: "Terminal", level: "Intermediate", desc: "Scripting, automation, backend services" },
      { name: "C", icon: "Binary", level: "Proficient", desc: "Low-level system concepts, pointers, memory" }
    ],
    Backend: [
      { name: "Node.js", icon: "Server", level: "Advanced", desc: "Async I/O, streams, cluster, worker threads" },
      { name: "Express", icon: "Layers", level: "Advanced", desc: "RESTful APIs, custom middleware, error handling" },
      { name: "Socket.IO", icon: "Radio", level: "Advanced", desc: "Real-time bidirectional event sync & throttling" },
      { name: "JWT & Auth", icon: "ShieldCheck", level: "Advanced", desc: "HTTP-only cookies, token rotation, OAuth" },
      { name: "Zod", icon: "CheckCircle2", level: "Advanced", desc: "Schema validation, type inference, sanitize payloads" },
      { name: "REST APIs", icon: "Globe", level: "Advanced", desc: "Idempotent routes, rate-limiting, status headers" }
    ],
    Databases: [
      { name: "MongoDB", icon: "Database", level: "Advanced", desc: "Mongoose ODM, aggregation pipelines, indexing" },
      { name: "Redis", icon: "Zap", level: "Advanced", desc: "Distributed locks (SET NX PX), cache-aside, Lua scripts" },
      { name: "PostgreSQL", icon: "Database", level: "Proficient", desc: "Relational schemas, ACID transactions, joins" },
      { name: "MySQL", icon: "Table", level: "Proficient", desc: "Structured tables, indexing, foreign keys" },
      { name: "Supabase", icon: "HardDrive", level: "Proficient", desc: "Postgres backend, Row Level Security, Storage" }
    ],
    Frontend: [
      { name: "React", icon: "Atom", level: "Advanced", desc: "Hooks, custom state machines, context, perf tuning" },
      { name: "Next.js", icon: "Sparkles", level: "Advanced", desc: "App Router, SSR, Server Actions, SEO optimization" },
      { name: "Tailwind CSS", icon: "Palette", level: "Advanced", desc: "Design tokens, responsive layouts, theme architecture" },
      { name: "Framer Motion", icon: "Activity", level: "Advanced", desc: "Spring physics, layout transitions, keyframes" },
      { name: "HTML5 / CSS3", icon: "Layout", level: "Advanced", desc: "Semantic markup, modern CSS grid, flexbox, a11y" }
    ],
    DevOps: [
      { name: "Git & GitHub", icon: "GitBranch", level: "Advanced", desc: "Branching workflows, interactive rebasing, PR reviews" },
      { name: "Docker", icon: "Box", level: "Intermediate", desc: "Containerization, multi-stage builds, compose" },
      { name: "Linux", icon: "Terminal", level: "Advanced", desc: "Shell scripting, process management, permissions" },
      { name: "Postman", icon: "Send", level: "Advanced", desc: "API testing, automated test collections, environments" },
      { name: "Vercel", icon: "UploadCloud", level: "Advanced", desc: "Continuous deployment, preview branches, edge configs" }
    ]
  },

  projects: [
    {
      id: "sharex",
      title: "ShareX",
      tagline: "Campus Resource Sharing & Real-Time Allocation Platform",
      award: "🥈 1st Runner-Up @ Code Conqueror India 2026",
      liveUrl: "https://sharex-alpha.vercel.app/",
      githubUrl: "https://github.com/aryansinha1908/CodeConquerorHackathon",
      stats: { locks: "100% Race-Condition Free", rules: "12-Rule Eligibility Engine", latency: "<45ms" },
      tags: ["Node.js", "Express", "MongoDB", "Redis", "Gemini API", "Tailwind CSS", "Driver.js"],
      summary: "High-concurrency campus equipment, laboratory, and computing resource sharing platform with distributed locks and deterministic waitlist management.",
      bulletPoints: [
        "Distributed Redis locks (SET NX PX + Lua atomic compare-and-delete) prevent double-booking of shared high-demand campus inventory.",
        "12-rule eligibility engine that evaluates student credentials, past returns, and department quotas with clear actionable resolutions.",
        "Cache-aside pattern with version-based cache invalidation and per-user token-bucket rate limiting.",
        "Integrated interactive guided tour, status verification cards, responsive demo workflows, and automated FIFO waitlist queuing."
      ],
      hasSimulator: true,
      featured: true
    },
    {
      id: "civicai",
      title: "CivicAI / CivicConnect",
      tagline: "AI-Powered Citizen Issue Reporting & Municipal Governance",
      award: "🚀 Production Ready Civic Platform",
      liveUrl: null,
      githubUrl: "https://github.com/yash-sharmaji/CivicAI",
      stats: { accuracy: "94% Auto-Classification", geotagging: "Precise GPS", lifecycle: "Full Audit Trail" },
      tags: ["Next.js", "TypeScript", "React", "Node.js", "MongoDB", "AI Classification"],
      summary: "Civic issue reporting system enabling residents to report potholes, water supply breakdowns, and streetlights with photographic evidence and automatic AI categorization.",
      bulletPoints: [
        "Citizens report civic infrastructure defects with instant geotagging and real-time image upload compression.",
        "AI classification pipeline automatically classifies complaints, predicts repair urgency, and routes alerts to the municipal department.",
        "Community upvoting mechanism highlights urgent community hazards; transparent resolution lifecycle with audit timestamps."
      ],
      hasSimulator: false,
      featured: false
    },
    {
      id: "leetcode",
      title: "LeetCode Solutions Hub",
      tagline: "Algorithmic Problem Solving & Complexity Benchmarking",
      award: "🧠 100+ Curated Problems in Modern C++",
      liveUrl: null,
      githubUrl: "https://github.com/yash-sharmaji/Leetcode-solutions",
      stats: { solved: "100+ Problems", language: "Modern C++ (C++20)", complexity: "Strict O(N) / O(log N)" },
      tags: ["C++", "Data Structures", "Algorithms", "Dynamic Programming", "Graphs"],
      summary: "Curated open-source repository of optimal implementations across core algorithmic concepts with documented time and space complexities.",
      bulletPoints: [
        "Exhaustive coverage of Arrays, Trees, Dynamic Programming, Two Pointers, Graphs, Backtracking, and Greedy patterns.",
        "Every solution is benchmarked against edge cases, memory limits, and optimal cache locality.",
        "Serves as a community reference for competitive programming patterns and interview mastery."
      ],
      hasSimulator: false,
      featured: false
    }
  ],

  openSourcePRs: [
    {
      repo: "HacktoberFest_EES",
      repoUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES",
      org: "Hacktoberfest 2026",
      prNumber: "#158",
      prUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES/pull/158",
      category: "Security & Auth",
      title: "Integrated Sign in with GitHub OAuth",
      description: "Engineered secure GitHub OAuth flow with token exchange, state parameter CSRF mitigation, and session persistence."
    },
    {
      repo: "HacktoberFest_EES",
      repoUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES",
      org: "Hacktoberfest 2026",
      prNumber: "#122",
      prUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES/pull/122",
      category: "Runtime Engines",
      title: "Lua Scripting Execution Support",
      description: "Embedded Lua execution runtime for extensible pluggable scripting logic and custom business rule execution."
    },
    {
      repo: "HacktoberFest_EES",
      repoUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES",
      org: "Hacktoberfest 2026",
      prNumber: "#97",
      prUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES/pull/97",
      category: "Security & Auth",
      title: "Brute-Force Rate Limiting with Retry-After",
      description: "Implemented defensive rate-limiting on failed password attempts with standard HTTP 429 and Retry-After backoff headers."
    },
    {
      repo: "HacktoberFest_EES",
      repoUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES",
      org: "Hacktoberfest 2026",
      prNumber: "#74",
      prUrl: "https://github.com/singhvaibhav-ai/HacktoberFest_EES/pull/74",
      category: "Documentation",
      title: "Auth Login Architecture & Specs",
      description: "Authored in-depth technical documentation covering authentication lifecycle, error handling, and security hardening."
    },
    {
      repo: "CAREERFORGE",
      repoUrl: "https://github.com/Pratyush-Panda-2006/CAREERFORGE",
      org: "Prisma Careers Hub",
      prNumber: "#477",
      prUrl: "https://github.com/Pratyush-Panda-2006/CAREERFORGE/pull/477",
      category: "UI & Tooling",
      title: "Interactive GitHub Activity Visualizer",
      description: "Built dynamic developer contribution graph visualizer with hover tooltips, streak calculations, and SVG heatmaps."
    },
    {
      repo: "Contribo",
      repoUrl: "https://github.com/subhranshudash13-dotcom/Contribo",
      org: "Open Source Readiness",
      prNumber: "#106",
      prUrl: "https://github.com/subhranshudash13-dotcom/Contribo/pull/106",
      category: "Tooling & Workflow",
      title: "6-Step Contributor Lifecycle Architecture",
      description: "Architected end-to-end contributor lifecycle workflow reducing first-PR friction for beginner open-source participants."
    },
    {
      repo: "Contribo",
      repoUrl: "https://github.com/subhranshudash13-dotcom/Contribo",
      org: "Open Source Readiness",
      prNumber: "#110",
      prUrl: "https://github.com/subhranshudash13-dotcom/Contribo/pull/110",
      category: "Tooling & Workflow",
      title: "Contributor Action Toolkit & PR Generator",
      description: "Created automated CLI and interactive web generator for structured Pull Request descriptions and change verification."
    },
    {
      repo: "Open-Agents",
      repoUrl: "https://github.com/DivyashreeR008/Open-Agents",
      org: "AI Agent Framework",
      prNumber: "#478",
      prUrl: "https://github.com/DivyashreeR008/Open-Agents/pull/478",
      category: "UI & Streaming",
      title: "Streaming Auto-Scroll & Scroll-To-Bottom Fix",
      description: "Resolved race-condition in virtualized streaming chat list ensuring smooth auto-scrolling during high-velocity LLM token responses."
    },
    {
      repo: "open-source-radar",
      repoUrl: "https://github.com/TanbirRamim/open-source-radar",
      org: "Issue Discovery Platform",
      prNumber: "#351",
      prUrl: "https://github.com/TanbirRamim/open-source-radar/pull/351",
      category: "i18n & Docs",
      title: "Internationalization & Portuguese Translation",
      description: "Added comprehensive multi-lingual documentation framework with accurate Portuguese terminology glossary."
    },
    {
      repo: "kana-dojo",
      repoUrl: "https://github.com/lingdojo/kana-dojo",
      org: "Language Platform",
      prNumber: "#33388",
      prUrl: "https://github.com/lingdojo/kana-dojo/pull/33388",
      category: "Education & Content",
      title: "Interactive Japanese Learning Curriculum",
      description: "Contributed interactive mnemonic learning module and cultural context drills for Japanese syllabary study."
    }
  ],

  tourSteps: [
    {
      element: '[data-tour="header-brand"]',
      popover: {
        title: "👋 Welcome to Yash's Portfolio",
        description: "I'm a full-stack web developer, distributed systems engineer, and open-source contributor. Let's take a quick look around!",
        side: "bottom",
        align: "start"
      }
    },
    {
      element: '[data-tour="hero-status"]',
      popover: {
        title: "🟢 Live Availability Status",
        description: "Currently open to SDE internships and engineering collaborations. You can directly inspect my resume and active status.",
        side: "bottom",
        align: "center"
      }
    },
    {
      element: '[data-tour="profile-card"]',
      popover: {
        title: "📸 Interactive Profile Card",
        description: "Hover over my photo to flip the 3D card and see the animated build mode!",
        side: "left",
        align: "center"
      }
    },
    {
      element: '[data-tour="interactive-terminal"]',
      popover: {
        title: "💻 Interactive Developer Console",
        description: "Inspect my core configuration, engineering philosophy, and real-time architecture mindset. You can copy snippets or switch tabs.",
        side: "top",
        align: "center"
      }
    },
    {
      element: '[data-tour="featured-sharex"]',
      popover: {
        title: "🏆 ShareX — Code Conqueror Runner-Up",
        description: "My award-winning campus resource sharing engine! Click the 'Simulate Redis Lock' button to test how my Lua locks prevent double-booking.",
        side: "top",
        align: "center"
      }
    },
    {
      element: '[data-tour="open-source-matrix"]',
      popover: {
        title: "🔓 18+ Open Source PRs",
        description: "Explore real contributions across Hacktoberfest, NSoC, and developer tools. Filter by security, tooling, or runtime features.",
        side: "top",
        align: "center"
      }
    },
    {
      element: '[data-tour="vibing-corner"]',
      popover: {
        title: "🐧 Vibing Corner & Easter Eggs",
        description: "Developers need good vibes! Toggle the dancing penguin and pedro raccoon, or trigger the rhythm beats.",
        side: "top",
        align: "center"
      }
    },
    {
      element: '[data-tour="contact-station"]',
      popover: {
        title: "📬 MERN Contact Station",
        description: "Drop me a message directly! Powered by Express & MongoDB. I reply within 24 hours.",
        side: "top",
        align: "center"
      }
    }
  ]
};
