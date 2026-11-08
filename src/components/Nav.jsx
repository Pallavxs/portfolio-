import React, { useState } from "react";
import DateTime from "./DateTime";
import { useWindowManager } from "../context/WindowManagerContext";
import { profile } from "../config/profile";
import "./nav.scss";

const Nav = () => {
  const { openWindow, activeWindowId, windows } = useWindowManager();
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  const handleAction = (action) => {
    setActiveMenu(null);
    if (typeof action === "string") {
      openWindow(action);
    }
  };

  const isWindowActive = (id) => {
    return activeWindowId === id && Boolean(windows[id]?.isOpen && !windows[id]?.isMinimized);
  };

  return (
    <nav
      className="os-nav-bar"
      role="navigation"
      aria-label="System Menu Bar"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="left">
        <button
          className="apple-icon"
          onClick={() => toggleMenu("apple")}
          aria-label="System Menu"
          title="About Pallav OS"
        >
          <img src="/navbar-icons/apple.svg" alt="" />
        </button>

        {activeMenu === "apple" && (
          <div className="nav-dropdown" onMouseLeave={() => setActiveMenu(null)}>
            <div className="dropdown-item bold" onClick={() => handleAction("skills")}>
              About Pallav OS
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-item" onClick={() => handleAction("projects")}>
              Projects Explorer
            </div>
            <div className="dropdown-item" onClick={() => handleAction("skills")}>
              Technical Skills
            </div>
            <div className="dropdown-item" onClick={() => handleAction("cli")}>
              Terminal
            </div>
            <div className="dropdown-item" onClick={() => handleAction("contact")}>
              Get In Touch
            </div>
            <div className="dropdown-divider" />
            <div className="dropdown-item" onClick={() => window.open(profile.github, "_blank")}>
              GitHub Profile ↗
            </div>
          </div>
        )}

        <div className="nav-items brand" onClick={() => handleAction("skills")} title="View Profile & Skills">
          <p>{profile.name}</p>
        </div>

        <div
          className={`nav-items ${isWindowActive("projects") ? "active" : ""}`}
          onClick={() => handleAction("projects")}
        >
          <p>Projects</p>
        </div>

        <div
          className={`nav-items ${isWindowActive("skills") ? "active" : ""}`}
          onClick={() => handleAction("skills")}
        >
          <p>Technical Skills</p>
        </div>

        <div
          className={`nav-items ${isWindowActive("cli") ? "active" : ""}`}
          onClick={() => handleAction("cli")}
        >
          <p>Terminal</p>
        </div>
      </div>

      <div className="right">
        <div className="avail-badge-pill" title={profile.availability}>
          <span className="pulse-dot" />
          <span className="badge-text">Available for work</span>
        </div>
        <div className="nav-icon" title="Connected to Network">
          <img src="/navbar-icons/wifi.svg" alt="WiFi" />
        </div>
        <div className="nav-item">
          <DateTime />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
