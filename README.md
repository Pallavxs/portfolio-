# Portfolio

A personal developer portfolio engineered as an interactive, macOS-inspired desktop operating system. Built with **React 19**, **Three.js**, and **Vite**, this application provides a cinematic 3D developer workstation background and a fully functional window management system for exploring projects, skills, experience, and contact information.

---

## About

This portfolio showcases the work, background, and engineering competencies of **Pallav Shrivastava**, a **Full-Stack Developer** specializing in the **MERN stack** (MongoDB, Express.js, React, Node.js), TypeScript, real-time systems, and modern AI/LLM integrations. 

Rather than a static one-page resume, the portfolio delivers an interactive desktop environment where visitors can launch windowed applications, execute CLI commands in a custom terminal, view live project demos, and inspect technical skill sets.

---

## Tech Stack

### Frontend & Core
- **React 19** (`^19.2.4`) — Modern component architecture, hooks, and Context API
- **React DOM** (`^19.2.4`) — Concurrent DOM rendering

### 3D Graphics & Visual Effects
- **Three.js** (`^0.187.0`) — Procedural 3D developer workstation, low-poly terrain wireframe, starfield particles, lighting systems, and interactive tech polyhedra

### UI & Window Management
- **react-rnd** (`^10.5.3`) — Draggable, resizable macOS-style application windows
- **react-syntax-highlighter** (`^16.1.1`) — Syntax highlighting for code views
- **react-markdown** (`^10.1.0`) — Dynamic Markdown parsing and rendering

### Styling
- **Sass / SCSS** (`^1.98.0`) — Modular stylesheet architecture
- **CSS3** — Custom properties, Flexbox, CSS Grid, backdrop-filter glassmorphism, and responsive keyframe animations

### Build Tools & Code Quality
- **Vite 8** (`^8.0.0`) — Next-generation frontend build tooling and Hot Module Replacement (HMR)
- **@vitejs/plugin-react** (`^6.0.0`) — React support for Vite
- **ESLint 9** (`^9.39.4`) with React Hooks and React Refresh linting rules

---

## Features

### macOS-Inspired Window Management System
- **Unified Window Manager**: Managed through `WindowManagerContext` with intelligent cascade positioning, active window tracking, and unified `z-index` stacking.
- **Full Window Controls**: Windows support draggable headers, 8-direction resizing, minimize to dock, maximize/restore toggle, and close.
- **Duplicate Prevention**: Re-launching an already open application brings the existing window to the foreground and elevates focus instead of creating duplicates.
- **Mobile Responsive Docking**: On screens $\le 768\text{px}$, open windows automatically dock into full-width mobile views below the system bar.

### Interactive 3D Developer Workstation
- **Procedural Desk Setup**: A 3D dark matte workstation featuring a developer monitor with an animated canvas code screen and blinking cursor.
- **Interactive Desk Lamp**: Includes Day/Night mode toggling that smoothly transitions ambient lighting, horizon colors, and fog density when clicked.
- **Animated Accessories**: Ceramic developer coffee mug with dynamic steam particle emission, compact keyboard, mouse, and leather notebook.
- **Wireframe Horizon & Starfield**: A subtle low-poly procedural mountain wireframe wave and drifting particles in a deep space palette (`#03050b`).
- **Floating Tech Polyhedra**: Widely spaced developer-themed 3D objects (React atom, AI core, TypeScript octahedron, Node.js hex, MongoDB crystal, Links knot) with hover scale, emissive glow, and direct window launch triggers.

### Custom Interactive Terminal (CLI)
- Built-in command interpreter supporting commands such as `help`, `about`, `projects`, `projects --live`, `skills`, `experience`, `resume`, `contact`, `whoami`, `ls`, `clear`, `open <app>`, and `close <app>`.
- Auto-focus input line with prompt formatting, colored output banners, and integrated window manager hooks.

### Top System Menu Bar
- Fixed macOS-style navigation bar with an interactive Apple menu dropdown, live clock, availability badge pill ("Available for work" with pulse animation), and network indicator.
- Direct navigation triggers for **Projects**, **Technical Skills**, and **Terminal**.

### Bottom Application Dock
- Smooth magnification scale effect on mouse hover.
- Tooltip labels, active running indicator dots, and direct launch triggers for all 8 system applications.

### Desktop Profile Card Modal
- Glassmorphic modal accessible by clicking on the empty wallpaper area.
- Displays profile photo / avatar with an online status indicator, role title, bio summary, focus areas, and quick contact buttons.

---

## Portfolio Sections

Visitors can interact with 8 dedicated windowed applications:

| Application | Window ID | Description |
| :--- | :--- | :--- |
| **Terminal** | `cli` | Interactive command-line interface with custom commands and window triggers |
| **Projects Explorer** | `projects` | Featured project cards with tech tags, descriptions, GitHub links, and live demos |
| **Technical Skills** | `skills` | Competency matrix categorized across 6 areas with proficiency badges and search |
| **GitHub Activity** | `github` | Profile repository highlights, contribution metrics, and language breakdowns |
| **Resume Viewer** | `resume` | PDF document viewer with direct download action |
| **Spotify Player** | `spotify` | Embedded focus/coding playlist player |
| **Get In Touch** | `contact` | Direct contact details, social links, and interactive email compose form |
| **Developer Links** | `links` | Directory of professional links, code repositories, and platforms |

---

## Projects

The portfolio showcases projects configured in `src/data/projects.js`:

### 1. CodeColosseum — AI Model Battleground
- **Tagline**: Side-by-side LLM coding evaluation arena with automated code scoring.
- **Description**: Benchmarking and evaluation platform that runs prompts across competing LLMs (GPT-4o, Claude 3.5, Gemini 1.5 Pro, DeepSeek), streams responses side-by-side, and dynamically grades code quality, token efficiency, and accuracy.
- **Stack**: React, TypeScript, Node.js, Express, OpenAI API, Anthropic Claude, WebSockets, Tailwind CSS.

### 2. Hermes AI — Support & Escalation Engine
- **Tagline**: Autonomous customer support agent with sentiment-based human triage.
- **Description**: Customer intelligence and support assistant that resolves 70%+ of frequent queries autonomously via RAG knowledge retrieval and seamlessly triages high-friction issues with priority escalation to human operators.
- **Stack**: React, Node.js, MongoDB, LangChain, Vector Embeddings, Express, Socket.io.

### 3. Zena — Conversational AI Assistant
- **Tagline**: Context-aware conversational AI with dynamic tool execution and history management.
- **Description**: Conversational AI interface offering multi-turn dialog memory, markdown code rendering, custom system prompt personalization, and simulated agent reasoning for developer workflows.
- **Stack**: React, TypeScript, Express, OpenAI SDK, MongoDB, Tailwind CSS.

### 4. AI Review System — Automated Code & PR Reviewer
- **Tagline**: Automated static analysis and LLM-powered GitHub PR review bot.
- **Description**: Analyzes pull requests in GitHub repositories, detects security vulnerabilities, style antipatterns, and missing edge cases, posting structured markdown review comments directly into PR threads.
- **Stack**: Node.js, Express, GitHub Octokit API, OpenAI API, Docker, PostgreSQL.

---

## Technical Skills Matrix

Configured in `src/data/skills.js` and filterable through the **Technical Skills** window:

- **Languages**: JavaScript (ES6+), TypeScript
- **Frontend**: React.js, React Native, Next.js, Tailwind CSS, HTML5 & CSS3, Redux Toolkit, Axios
- **Backend**: Node.js, Express.js, Socket.io, REST APIs, Multer
- **Databases**: MongoDB (Mongoose ORM, Aggregation), PostgreSQL
- **AI & LLM Development**: OpenAI API, Anthropic Claude API, LangChain & RAG, Prompt Engineering
- **Developer Tools & DevOps**: Git & GitHub, Postman, Docker, Vite

---

## Design & UI

- **Color Palette**: Deep dark space foundation (`#03050b`, `#070a12`), dark slate window frames (`#18181b`, `#111827`), with warm amber (`#f59e0b`), violet (`#8b5cf6`), and cyan (`#38bdf8`) accents.
- **Typography**: 
  - `Cinzel` serif for desktop hero branding.
  - Monospace font stack (`SFMono-Regular`, `Menlo`, `Monaco`, `ui-monospace`) for terminal prompts, code monitor, and technical logs.
  - System sans-serif (`-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, `Roboto`) for macOS system UI elements.
- **Glassmorphism**: `backdrop-filter: blur(16px)` and translucent surfaces (`rgba(3, 5, 11, 0.75)`) on top navigation and bottom dock.
- **Layering & Raycasting**: Precise coordinate management ensuring 3D raycaster events do not pierce through open application windows.

---

## Project Structure

```text
Mac-os/
├── public/
│   ├── doc-icons/              # SVG icons for bottom application dock
│   ├── navbar-icons/           # Top bar SVG icons (apple, wifi)
│   ├── pallav_resume.pdf       # Downloadable resume document
│   └── favicon.svg             # Website favicon
├── src/
│   ├── assets/                 # Static data assets (github.json)
│   ├── components/             # UI components
│   │   ├── 3d/                 # Three.js 3D workstation & scene builders
│   │   │   ├── DeskSceneBuilder.js
│   │   │   ├── ThreeBackground.jsx
│   │   │   └── threeBackground.scss
│   │   ├── windows/            # Window applications
│   │   │   ├── Cli.jsx         # Terminal window
│   │   │   ├── Github.jsx      # Projects explorer window
│   │   │   ├── GithubWindow.jsx# GitHub activity window
│   │   │   ├── Skills.jsx      # Technical skills matrix window
│   │   │   ├── Resume.jsx      # Resume PDF window
│   │   │   ├── Spotify.jsx     # Spotify music player window
│   │   │   ├── Contact.jsx     # Contact form window
│   │   │   ├── LinksWindow.jsx # Developer links window
│   │   │   └── MacWindows.jsx  # Reusable draggable/resizable window shell
│   │   ├── DateTime.jsx        # Real-time top bar clock
│   │   ├── DesktopHero.jsx     # Center hero branding text
│   │   ├── Doc.jsx             # Bottom application dock
│   │   ├── Nav.jsx             # Top macOS system bar
│   │   └── ProfileCard.jsx     # Modal profile card
│   ├── config/                 # Configuration re-exports
│   ├── context/                # WindowManagerContext (window state & z-index)
│   ├── data/                   # Data sources (profile, projects, skills, experience, apps)
│   ├── utils/                  # Command parser and terminal executor
│   ├── App.jsx                 # Main workspace shell
│   ├── app.scss                # Global desktop layout styling
│   ├── index.css               # Base CSS resets
│   └── main.jsx                # Application root entry point with ErrorBoundary
├── index.html                  # HTML template
├── package.json                # Project dependencies and npm scripts
└── vite.config.js              # Vite server and build configuration
```

---

## Installation & Local Development

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Setup Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/Pallavxs/Mac-os.git
   cd Mac-os
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```text
   http://localhost:5173/
   ```

---

## Environment Variables

**No environment variables are required.** 

All project data, profiles, and application metadata are configured directly within the repository in `src/data/`.

---

## Build & Deployment

To create an optimized production bundle:

```bash
npm run build
```

The output files will be generated in the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

The resulting `dist/` folder can be hosted on any static hosting provider (e.g., Vercel, Netlify, GitHub Pages, Cloudflare Pages).

---

## Scripts

Available scripts defined in `package.json`:

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts local Vite development server with HMR |
| `npm run build` | `vite build` | Compiles and optimizes assets into `dist/` |
| `npm run lint` | `eslint .` | Runs ESLint across all JavaScript and JSX files |
| `npm run preview` | `vite preview` | Locally serves the production build for testing |

---

## Developer

**Pallav Shrivastava**  
Full-Stack Developer · MERN  
India

Specializing in the MERN stack (MongoDB, Express, React, Node.js), TypeScript, and system architecture. Focused on scalable web applications, real-time distributed systems, and modern AI engineering.

---

## Links

- **GitHub**: [https://github.com/Pallavxs](https://github.com/Pallavxs)
- **LinkedIn**: [https://www.linkedin.com/in/pallav-shrivastava-867b43263/](https://www.linkedin.com/in/pallav-shrivastava-867b43263/)
- **Email**: [pallavshrivastava12@gmail.com](mailto:pallavshrivastava12@gmail.com)

---

## License

No license has currently been specified. All rights reserved.
