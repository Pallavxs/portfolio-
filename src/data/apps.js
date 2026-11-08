export const APPS = {
  cli: {
    id: "cli",
    name: "Terminal",
    title: "pallav@pallav-os: ~ (zsh)",
    icon: "/doc-icons/cli.svg",
    dockTooltip: "Terminal",
    defaultWidth: "55vw",
    defaultHeight: "55vh",
    minWidth: 420,
    minHeight: 320,
    showInDock: true,
    dockOrder: 1,
    bgColor: "linear-gradient(135deg, #1e1e24, #121214)"
  },
  github: {
    id: "github",
    name: "GitHub",
    title: "GitHub Activity & Repositories — Pallav Shrivastava",
    icon: "/doc-icons/github.svg",
    dockTooltip: "GitHub",
    defaultWidth: "66vw",
    defaultHeight: "62vh",
    minWidth: 460,
    minHeight: 360,
    showInDock: true,
    dockOrder: 2,
    bgColor: "#0f172a"
  },
  projects: {
    id: "projects",
    name: "Projects",
    title: "Projects Explorer",
    icon: "/doc-icons/arena.svg",
    dockTooltip: "Projects",
    defaultWidth: "66vw",
    defaultHeight: "62vh",
    minWidth: 420,
    minHeight: 320,
    showInDock: true,
    dockOrder: 3,
    bgColor: "#111827"
  },
  resume: {
    id: "resume",
    name: "Resume",
    title: "Pallav_Resume.pdf",
    icon: "/doc-icons/pdf.svg",
    dockTooltip: "Resume",
    defaultWidth: "56vw",
    defaultHeight: "75vh",
    minWidth: 450,
    minHeight: 400,
    showInDock: true,
    dockOrder: 5,
    bgColor: "linear-gradient(to bottom, #ef4444, #b91c1c)"
  },
  spotify: {
    id: "spotify",
    name: "Spotify",
    title: "Spotify — Focus / Coding Playlist",
    icon: "/doc-icons/spotify.svg",
    dockTooltip: "Spotify",
    defaultWidth: "30vw",
    defaultHeight: "440px",
    minWidth: 320,
    minHeight: 380,
    showInDock: true,
    dockOrder: 6,
    bgColor: "linear-gradient(to bottom, #1db954, #121212)"
  },
  contact: {
    id: "contact",
    name: "Mail",
    title: "Get In Touch — Pallav Shrivastava",
    icon: "/doc-icons/mail.svg",
    dockTooltip: "Mail",
    defaultWidth: "48vw",
    defaultHeight: "56vh",
    minWidth: 400,
    minHeight: 340,
    showInDock: true,
    dockOrder: 7,
    bgColor: "linear-gradient(to bottom, #4f46e5, #312e81)"
  },
  links: {
    id: "links",
    name: "Links",
    title: "Developer Links & Profiles",
    icon: "/doc-icons/link.svg",
    dockTooltip: "Links",
    defaultWidth: "42vw",
    defaultHeight: "52vh",
    minWidth: 380,
    minHeight: 340,
    showInDock: true,
    dockOrder: 8,
    bgColor: "#18181b"
  },
  skills: {
    id: "skills",
    name: "Technical Skills",
    title: "Technical Skills",
    icon: "/doc-icons/skills.svg",
    dockTooltip: "Technical Skills",
    defaultWidth: "58vw",
    defaultHeight: "64vh",
    minWidth: 460,
    minHeight: 360,
    showInDock: true,
    dockOrder: 4,
    bgColor: "#18181b"
  }
};

export const APP_ALIASES = {
  // Terminal
  terminal: "cli",
  cli: "cli",
  cmd: "cli",
  shell: "cli",
  console: "cli",

  // GitHub
  github: "github",
  gh: "github",
  git: "github",

  // Projects
  projects: "projects",
  project: "projects",
  repos: "projects",
  explorer: "projects",

  // Specific project shortcuts map cleanly to Projects Explorer
  codecolosseum: "projects",
  arena: "projects",
  battleground: "projects",

  hermes: "projects",
  hermesai: "projects",
  support: "projects",

  zena: "projects",
  zenaai: "projects",
  ai: "projects",

  // Skills
  skills: "skills",
  skill: "skills",
  "technical skills": "skills",
  "technical-skills": "skills",
  technicalskills: "skills",
  stack: "skills",
  tech: "skills",
  note: "skills",
  notes: "skills",
  experience: "skills",
  exp: "skills",
  about: "skills",

  // Resume
  resume: "resume",
  cv: "resume",
  pdf: "resume",

  // Spotify
  spotify: "spotify",
  music: "spotify",

  // Mail / Contact
  contact: "contact",
  mail: "contact",
  email: "contact",

  // Links
  links: "links",
  link: "links",
  socials: "links",
  social: "links",
  linkedin: "links"
};

