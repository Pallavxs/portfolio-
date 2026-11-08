import React, { useState, useRef, useEffect, useCallback } from "react";
import MacWindows from "./MacWindows";
import { useWindowManager } from "../../context/WindowManagerContext";
import { parseCommand, executeCommand } from "../../utils/terminalParser";
import { APPS, APP_ALIASES } from "../../config/apps";
import "./cli.scss";

const WELCOME_BANNER = `┌─────────────────────────────────────────────────────────────┐
│  Welcome to Pallav OS — Interactive Developer Terminal     │
│  Designed for Pallav Shrivastava (Full-Stack · MERN)       │
└─────────────────────────────────────────────────────────────┘

Type "help" to view available commands.
Try "open projects", "open skills", or "open resume" to launch applications.
`;

const PROMPT_LABEL = "pallav@pallav-os ~ %";

const Cli = ({ windowName = "cli" }) => {
  const { openWindow, closeWindow } = useWindowManager();

  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState([
    { id: "init-0", type: "system", content: WELCOME_BANNER }
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const cmdCounter = useRef(10);

  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Auto-scroll to bottom whenever history updates
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  // Focus input when clicking terminal window
  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const handleKeyDown = (e) => {
    // Command History navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[commandHistory.length - 1 - nextIndex] || "");
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
      return;
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = inputVal.trimStart();
      if (trimmed.startsWith("open ")) {
        const partial = trimmed.slice(5).toLowerCase();
        const availableApps = Object.keys(APPS);
        const match = availableApps.find((app) => app.startsWith(partial));
        if (match) {
          setInputVal(`open ${match}`);
        }
      } else if (trimmed.startsWith("close ")) {
        const partial = trimmed.slice(6).toLowerCase();
        const availableApps = Object.keys(APPS);
        const match = availableApps.find((app) => app.startsWith(partial));
        if (match) {
          setInputVal(`close ${match}`);
        }
      } else {
        const knownCommands = [
          "help",
          "about",
          "projects",
          "skills",
          "experience",
          "resume",
          "contact",
          "open",
          "close",
          "clear",
          "whoami",
          "ls"
        ];
        const match = knownCommands.find((c) => c.startsWith(trimmed.toLowerCase()));
        if (match) {
          setInputVal(match);
        }
      }
      return;
    }

    // Execute command on Enter
    if (e.key === "Enter") {
      e.preventDefault();
      const currentInput = inputVal;
      const trimmed = currentInput.trim();

      // Add to command history list if not empty
      if (trimmed) {
        setCommandHistory((prev) => [...prev, trimmed]);
      }
      setHistoryIndex(-1);
      setInputVal("");

      if (!trimmed) {
        cmdCounter.current += 1;
        setHistory((prev) => [
          ...prev,
          { id: `cmd-${cmdCounter.current}`, type: "command", prompt: PROMPT_LABEL, command: "" }
        ]);
        return;
      }

      cmdCounter.current += 1;
      const cmdEntry = {
        id: `cmd-${cmdCounter.current}`,
        type: "command",
        prompt: PROMPT_LABEL,
        command: currentInput
      };

      const parsed = parseCommand(trimmed);
      const result = executeCommand(parsed, {
        openWindow,
        closeWindow,
        clearHistory
      });

      if (result.action === "clear") {
        setHistory([]);
      } else {
        cmdCounter.current += 1;
        setHistory((prev) => [
          ...prev,
          cmdEntry,
          {
            id: `res-${cmdCounter.current}`,
            type: "output",
            content: result.output
          }
        ]);
      }
    }
  };

  return (
    <MacWindows windowName={windowName}>
      <div
        className="cli-window"
        ref={containerRef}
        onClick={handleContainerClick}
        role="region"
        aria-label="Interactive Terminal"
      >
        <div className="terminal-content">
          {history.map((entry) => {
            if (entry.type === "system") {
              return (
                <pre key={entry.id} className="terminal-system-banner">
                  {entry.content}
                </pre>
              );
            }
            if (entry.type === "command") {
              return (
                <div key={entry.id} className="terminal-line command-line">
                  <span className="prompt-label">{entry.prompt}</span>
                  <span className="command-text">{entry.command}</span>
                </div>
              );
            }
            if (entry.type === "output") {
              return (
                <pre key={entry.id} className="terminal-output">
                  {entry.content}
                </pre>
              );
            }
            return null;
          })}

          {/* Active Prompt Line */}
          <div className="terminal-line active-line">
            <span className="prompt-label">{PROMPT_LABEL}</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="Terminal command input"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </MacWindows>
  );
};

export default Cli;
