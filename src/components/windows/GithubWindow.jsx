import React from "react";
import MacWindows from "./MacWindows";
import { profile } from "../../data/profile";
import { projects } from "../../data/projects";
import "./githubWindow.scss";

const GithubWindow = ({ windowName = "github", setWindowsState }) => {
  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="60vw"
      height="64vh"
    >
      <div className="github-app-window">
        {/* Profile / Stats Header */}
        <div className="gh-header">
          <div className="gh-user-info">
            <div className="gh-avatar">
              <img src={profile.photo} alt={profile.name} />
              <span className="online-badge" />
            </div>
            <div>
              <h2>{profile.name}</h2>
              <p className="gh-handle">@Pallavxs · Full-Stack & AI Systems</p>
              <p className="gh-bio">{profile.tagline}</p>
            </div>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-view-btn"
          >
            Visit GitHub Profile ↗
          </a>
        </div>

        {/* Quick Stats Grid */}
        <div className="gh-metrics-grid">
          <div className="gh-metric-card">
            <span className="metric-val">20+</span>
            <span className="metric-lbl">Repositories</span>
          </div>
          <div className="gh-metric-card">
            <span className="metric-val">500+</span>
            <span className="metric-lbl">Contributions</span>
          </div>
          <div className="gh-metric-card">
            <span className="metric-val">99.4%</span>
            <span className="metric-lbl">Test Coverage</span>
          </div>
          <div className="gh-metric-card">
            <span className="metric-val">100%</span>
            <span className="metric-lbl">Open Source</span>
          </div>
        </div>

        {/* Pinned Repositories */}
        <div className="gh-section-title">
          <h3>Featured Repositories</h3>
        </div>

        <div className="gh-repos-list">
          {projects.map((proj) => (
            <div key={proj.id} className="gh-repo-card">
              <div className="repo-top">
                <span className="repo-icon">📦</span>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-name"
                >
                  {proj.name}
                </a>
                <span className="repo-visibility">Public</span>
              </div>
              <p className="repo-desc">{proj.description}</p>
              <div className="repo-footer">
                <div className="repo-tags">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-link"
                >
                  Code ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MacWindows>
  );
};

export default GithubWindow;

