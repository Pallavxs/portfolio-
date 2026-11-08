import React, { useState } from "react";
import { useWindowManager } from "../context/WindowManagerContext";
import { APPS } from "../config/apps";
import "./dock.scss";

const DOCK_ITEMS = [
  {
    id: "cli",
    title: "Terminal",
    icon: "/doc-icons/cli.svg",
    className: "cli",
    type: "app"
  },
  {
    id: "github",
    title: "GitHub",
    icon: "/doc-icons/github.svg",
    className: "github",
    type: "app"
  },
  {
    id: "projects",
    title: "Projects",
    icon: "/doc-icons/arena.svg",
    className: "projects",
    type: "app"
  },
  {
    id: "resume",
    title: "Resume",
    icon: "/doc-icons/pdf.svg",
    className: "pdf",
    type: "app"
  },
  {
    id: "spotify",
    title: "Spotify",
    icon: "/doc-icons/spotify.svg",
    className: "spotify",
    type: "app"
  },
  {
    id: "contact",
    title: "Mail",
    icon: "/doc-icons/mail.svg",
    className: "mail",
    type: "app"
  },
  {
    id: "links",
    title: "Links",
    icon: "/doc-icons/link.svg",
    className: "link",
    type: "app"
  }
];

const Doc = ({ setWindowsState }) => {
  const {
    openWindow,
    focusWindow,
    isAppRunning,
    isAppMinimized,
    isAppActive
  } = useWindowManager();

  const [hoveredApp, setHoveredApp] = useState(null);

  const handleItemClick = (item) => {
    if (item.type === "external") {
      window.open(item.url, "_blank", "noopener,noreferrer");
      return;
    }

    const appId = item.id;
    const running = isAppRunning(appId);
    const minimized = isAppMinimized(appId);

    // If legacy setWindowsState is passed, update it too
    if (setWindowsState) {
      setWindowsState((prev) => ({ ...prev, [appId]: true }));
    }

    if (!running) {
      // 1. App not running -> open and cascade
      openWindow(appId);
    } else if (minimized) {
      // 2. App minimized -> restore and focus
      openWindow(appId);
    } else {
      // 3. App running (already active or in background) -> focus window (prevents duplicate windows)
      focusWindow(appId);
    }
  };

  return (
    <footer
      className="dock-container"
      role="toolbar"
      aria-label="Application Dock"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="dock">
        {DOCK_ITEMS.map((item) => {
          const running = item.type === "app" && isAppRunning(item.id);
          const active = item.type === "app" && isAppActive(item.id);

          return (
            <div
              key={item.id}
              className="dock-item-wrapper"
              onMouseEnter={() => setHoveredApp(item.id)}
              onMouseLeave={() => setHoveredApp(null)}
            >
              {hoveredApp === item.id && (
                <div className="dock-tooltip" role="tooltip">
                  {item.title}
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
                className={`icon ${item.className} ${running ? "running" : ""} ${active ? "active" : ""}`}
                aria-label={item.title}
                title={item.title}
              >
                <img src={item.icon} alt="" />
              </button>

              {/* Running indicator dot */}
              <div
                className={`running-dot ${running ? "visible" : ""}`}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Doc;
