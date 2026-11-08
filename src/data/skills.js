export const skillsData = {
  categories: [
    {
      name: "Languages",
      skills: [
        {
          name: "JavaScript",
          level: "Core",
          notes: "ES6+, async/await, closures, promises, event-driven programming"
        },
        {
          name: "TypeScript",
          level: "Advanced",
          notes: "Type-safe development, interfaces, generics, scalable application architecture"
        }
      ]
    },
    {
      name: "Frontend",
      skills: [
        {
          name: "React.js",
          level: "Core",
          notes: "Hooks, Context API, reusable components, frontend architecture"
        },
        {
          name: "React Native",
          level: "Core",
          notes: "Reusable components, mobile UI, API integration, application workflows"
        },
        {
          name: "Next.js",
          level: "Working Knowledge",
          notes: "React-based full-stack applications and modern web development"
        },
        {
          name: "Tailwind CSS",
          level: "Core",
          notes: "Responsive UI, utility-first styling, reusable design patterns"
        },
        {
          name: "HTML5 & CSS3",
          level: "Core",
          notes: "Responsive layouts, Flexbox, Grid, animations, and modern styling"
        },
        {
          name: "Redux Toolkit",
          level: "Core",
          notes: "Global state management and predictable application state"
        },
        {
          name: "Axios",
          level: "Core",
          notes: "HTTP requests, API integration, and client-server communication"
        }
      ]
    },
    {
      name: "Backend",
      skills: [
        {
          name: "Node.js",
          level: "Core",
          notes: "Event-driven runtime, asynchronous programming, and backend services"
        },
        {
          name: "Express.js",
          level: "Core",
          notes: "REST APIs, middleware, routing, controllers, and backend architecture"
        },
        {
          name: "Socket.io",
          level: "Advanced",
          notes: "Real-time communication, socket events, and live application updates"
        },
        {
          name: "REST API",
          level: "Core",
          notes: "API design, integration, validation, authentication, and error handling"
        },
        {
          name: "Multer",
          level: "Working Knowledge",
          notes: "File uploads and multipart form-data handling"
        }
      ]
    },
    {
      name: "Databases",
      skills: [
        {
          name: "MongoDB",
          level: "Core",
          notes: "Document modeling, aggregation pipelines, indexing, and Mongoose ORM"
        },
        {
          name: "PostgreSQL",
          level: "Working Knowledge",
          notes: "Relational queries, schema design, and ACID transactions"
        }
      ]
    },
    {
      name: "AI & LLM Development",
      skills: [
        {
          name: "OpenAI API",
          level: "Advanced",
          notes: "GPT-4o integrations, streaming completions, structured outputs, function calling"
        },
        {
          name: "Anthropic Claude API",
          level: "Advanced",
          notes: "Extended context windows, prompt engineering, code synthesis"
        },
        {
          name: "LangChain & RAG",
          level: "Working Knowledge",
          notes: "Retrieval-augmented generation, vector embeddings, chunking, and memory"
        },
        {
          name: "Prompt Engineering",
          level: "Core",
          notes: "Few-shot prompting, system steering, automated evaluation benchmarks"
        }
      ]
    },
    {
      name: "Developer Tools & DevOps",
      skills: [
        {
          name: "Git & GitHub",
          level: "Core",
          notes: "Version control, branching workflows, PR reviews, and GitHub Actions"
        },
        {
          name: "Postman",
          level: "Core",
          notes: "API testing, automated request collections, and environment variables"
        },
        {
          name: "Docker",
          level: "Working Knowledge",
          notes: "Containerized environments and deployment reproducibility"
        },
        {
          name: "Vite",
          level: "Core",
          notes: "Modern frontend build tooling, HMR, and bundle optimization"
        }
      ]
    }
  ],
  levelBadges: {
    Core: { color: "#10b981", bg: "rgba(16, 185, 129, 0.15)" },
    Advanced: { color: "#38bdf8", bg: "rgba(56, 189, 248, 0.15)" },
    "Working Knowledge": { color: "#f59e0b", bg: "rgba(245, 158, 11, 0.15)" }
  }
};
