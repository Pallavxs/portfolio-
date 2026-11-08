import { profile } from "../config/profile";
import { projects } from "../config/projects";
import { skillsData } from "../config/skills";
import { experienceData } from "../config/experience";
import { APPS, APP_ALIASES } from "../config/apps";

/**
 * Parses raw terminal input into command and arguments.
 */
export const parseCommand = (rawInput = "") => {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { command: "", args: [], raw: "" };
  }

  // Handle flags and arguments
  const parts = trimmed.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  return { command, args, raw: trimmed };
};

/**
 * Executes a parsed command with given context.
 * context provides: { openWindow, closeWindow, clearHistory }
 */
export const executeCommand = (parsed, context = {}) => {
  const { command, args } = parsed;
  const { openWindow, closeWindow, clearHistory } = context;

  if (!command) {
    return { output: "" };
  }

  switch (command) {
    case "help":
      return {
        output: `Pallav OS Terminal

Available commands:

help
about
projects
projects --live
skills
experience
resume
contact
open <app>
close <app>
clear
whoami
ls`
      };

    case "about":
      return {
        output: `${profile.name} — ${profile.title}
${profile.tagline}

${profile.bio}

Status: ${profile.availability}
Location: ${profile.location}
Years of Experience: ${profile.yearsOfExperience}

Focus Areas:
${profile.focusAreas.map((f) => ` • ${f}`).join("\n")}

Hint: Type "open projects" or "open skills" to explore interactive windows.`
      };

    case "whoami":
      return {
        output: `${profile.name.toLowerCase().replace(/\s+/g, ".")} - ${profile.title}
Current environment: Pallav OS (Browser-Engineered Desktop)`
      };

    case "projects": {
      // Check for --live flag
      if (args.includes("--live") || args.includes("-l")) {
        // Trigger opening projects explorer as well
        if (openWindow) openWindow("projects");
        return {
          output: `Launching Projects Explorer and displaying live projects...

Live Projects:
1. CodeColosseum -> ${projects[0].liveDemo} (AI Benchmarking)
2. Hermes AI     -> ${projects[1].liveDemo} (Support Engine)
3. Zena AI       -> ${projects[2].liveDemo} (Conversational Assistant)
4. AI Review     -> ${projects[3].liveDemo} (PR Reviewer)
5. MentorNet     -> ${projects[4].liveDemo} (Mentorship Network)

Tip: Type "open projects", "open skills", or "open resume" to explore!`
        };
      }

      const list = projects
        .map((p, idx) => `${idx + 1}. ${p.name} - ${p.tagline}\n   Tech: ${p.technologies.slice(0, 4).join(", ")}`)
        .join("\n\n");

      return {
        output: `Available Projects:

${list}

Type "projects --live" to see live URLs, or "open <app>" to launch windows:
 • open projects
 • open skills
 • open resume
 • open contact`
      };
    }

    case "skills": {
      const formattedCategories = skillsData.categories
        .map((cat) => {
          const items = cat.skills.map((s) => `  • ${s.name} [${s.level}] - ${s.notes}`).join("\n");
          return `[${cat.name}]\n${items}`;
        })
        .join("\n\n");

      return {
        output: `Pallav Shrivastava — Technical Skills Matrix

${formattedCategories}

Tip: Type "open skills" to view the graphical interactive skill cards.`
      };
    }

    case "experience": {
      const rolesFormatted = experienceData.roles
        .map((r) => {
          const bullets = r.highlights.map((h) => `   - ${h}`).join("\n");
          return `${r.role} @ ${r.company} (${r.period})\nLocation: ${r.location}\n${bullets}`;
        })
        .join("\n\n");

      return {
        output: `Professional Experience:

${rolesFormatted}

Tip: Type "open experience" to inspect the code-styled log or "open resume" for the official CV.`
      };
    }

    case "resume": {
      if (openWindow) {
        openWindow("resume");
      }
      return {
        output: `Opening Resume window...
Document: /pallav_resume.pdf
Download link: /pallav_resume.pdf
Summary: Full-Stack Developer · MERN with deep expertise in React, Node.js, and modern distributed systems.`
      };
    }

    case "contact": {
      return {
        output: `Contact Information — ${profile.name}:

Email:    ${profile.email}
GitHub:   ${profile.github}
LinkedIn: ${profile.linkedin}
Location: ${profile.location}
Status:   ${profile.availability}

Tip: Type "open contact" to open the interactive contact window.`
      };
    }

    case "ls": {
      return {
        output: `apps/
  projects/         skills/           resume/
  spotify/          terminal/         contact/`
      };
    }

    case "clear": {
      if (clearHistory) {
        clearHistory();
      }
      return { action: "clear", output: "" };
    }

    case "open": {
      const target = args[0];
      if (!target) {
        return {
          output: `Usage: open <app>

Examples:
  open projects
  open skills
  open resume
  open terminal
  open spotify
  open contact`
        };
      }

      if (!openWindow) {
        return { output: `Window manager not connected.` };
      }

      const result = openWindow(target);
      if (result.success) {
        return {
          output: result.alreadyOpen
            ? `Focusing ${result.appName || target}...`
            : `Opening ${result.appName || target}...`
        };
      }

      return {
        output: `Application not found: ${target}

Try:
open projects
open skills
open resume
open contact`
      };
    }

    case "close": {
      const target = args[0];
      if (!target) {
        return {
          output: `Usage: close <app>

Examples:
  close projects
  close skills
  close spotify
  close contact`
        };
      }

      if (!closeWindow) {
        return { output: `Window manager not connected.` };
      }

      const result = closeWindow(target);
      if (result.success) {
        return {
          output: `Closed ${target}.`
        };
      }

      return {
        output: `Could not close "${target}". Ensure the application name is correct.`
      };
    }

    case "date":
    case "time":
      return {
        output: new Date().toString()
      };

    default:
      return {
        output: `command not found: ${command}

Type "help" to see available commands.`
      };
  }
};
