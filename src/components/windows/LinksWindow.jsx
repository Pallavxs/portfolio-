import React, { useState } from "react";
import MacWindows from "./MacWindows";
import { profile } from "../../data/profile";
import "./linksWindow.scss";

const LINKS_LIST = [
  {
    name: "GitHub",
    url: profile.github,
    handle: "@Pallavxs",
    desc: "Source code, AI experiments, open-source projects, and pull requests",
    icon: "🐙",
    color: "#f59e0b"
  },
  {
    name: "LinkedIn",
    url: profile.linkedin,
    handle: "pallav-shrivastava",
    desc: "Professional career history, engineering updates, and recommendations",
    icon: "💼",
    color: "#3b82f6"
  },
  {
    name: "Email (Direct)",
    url: `mailto:${profile.email}`,
    handle: profile.email,
    desc: "Fastest way to reach me for full-time opportunities or project inquiries",
    icon: "✉️",
    color: "#8b5cf6"
  },
  {
    name: "Resume (PDF)",
    url: profile.resume,
    handle: "pallav_resume.pdf",
    desc: "Detailed curriculum vitae, engineering skill sets, and work experience",
    icon: "📄",
    color: "#ef4444"
  }
];

const LinksWindow = ({ windowName = "links", setWindowsState }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="44vw"
      height="54vh"
    >
      <div className="links-app-window">
        <div className="links-header">
          <h2>Developer Links & Socials</h2>
          <p className="subtitle">
            Connect with {profile.name} across engineering and professional networks.
          </p>
        </div>

        <div className="links-grid">
          {LINKS_LIST.map((link, idx) => (
            <div key={link.name} className="link-card">
              <div className="link-left">
                <span className="link-icon" style={{ borderColor: link.color }}>
                  {link.icon}
                </span>
                <div className="link-info">
                  <div className="link-title-row">
                    <h4>{link.name}</h4>
                    <span className="link-handle">{link.handle}</span>
                  </div>
                  <p className="link-desc">{link.desc}</p>
                </div>
              </div>

              <div className="link-actions">
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-btn open"
                >
                  Open ↗
                </a>
                <button
                  type="button"
                  onClick={() => handleCopy(link.url, idx)}
                  className="link-btn copy"
                >
                  {copiedIndex === idx ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MacWindows>
  );
};

export default LinksWindow;

