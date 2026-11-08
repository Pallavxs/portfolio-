import React, { useState, useEffect, useMemo, useCallback } from "react";
import MacWindows from "./MacWindows";
import { profile } from "../../data/profile";
import "./githubWindow.scss";

const GITHUB_USERNAME = "Pallavxs";
const CACHE_KEY_USER = `gh_cache_user_${GITHUB_USERNAME}`;
const CACHE_KEY_REPOS = `gh_cache_repos_${GITHUB_USERNAME}`;
const CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  "C++": "#f34b7d",
  "C#": "#178600",
  Rust: "#dea584",
  Go: "#00ADD8",
  Java: "#b07219",
  Shell: "#89e051",
  Vue: "#41b883",
  SCSS: "#c6538c"
};

// Fallback metadata for Pallav's repositories if GitHub description or topics are empty
const REPO_METADATA_FALLBACK = {
  CodeColosseum: {
    description:
      "Side-by-side LLM coding evaluation arena with automated code scoring and model benchmarking.",
    topics: ["React", "TypeScript", "Node.js", "OpenAI"]
  },
  Hermes_AI: {
    description:
      "Autonomous customer support agent with sentiment-based human triage and RAG retrieval.",
    topics: ["React", "Node.js", "LangChain", "MongoDB"]
  },
  Zena: {
    description:
      "Context-aware conversational AI assistant with tool execution and multi-turn dialog memory.",
    topics: ["React", "TypeScript", "OpenAI", "Express"]
  },
  "AI-Review-System": {
    description:
      "Automated static analysis and LLM-powered GitHub PR review bot.",
    topics: ["Node.js", "Express", "GitHub API", "OpenAI"]
  },
  "FOOD-DASH": {
    description:
      "Interactive food delivery and restaurant management dashboard with live order tracking.",
    topics: ["React", "Node.js", "Express", "MongoDB"]
  },
  "Live-Chat-App-": {
    description:
      "Real-time chat and room messaging platform powered by WebSockets.",
    topics: ["React", "Socket.io", "Node.js", "Express"]
  },
  "TO-DO-Application-": {
    description:
      "Productivity task planner and todo tracking application with priority filters.",
    topics: ["React", "JavaScript", "CSS"]
  },
  "portfolio-": {
    description:
      "macOS-inspired personal interactive operating system and developer portfolio.",
    topics: ["React", "Vite", "Three.js", "Sass"]
  },
  "fullstack-notes": {
    description:
      "Full-stack cloud note-taking application with markdown support and secure auth.",
    topics: ["JavaScript", "Full-Stack", "MongoDB"]
  },
  "Mern-blog": {
    description:
      "Modern MERN stack blogging platform with rich text editing and user authentication.",
    topics: ["React", "Node.js", "MongoDB", "Express"]
  }
};

function formatRelativeTime(dateString) {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffSec = Math.floor((now - date) / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24) return `${diffHour}h ago`;
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 30) return `${diffDay}d ago`;
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${Math.floor(diffMonth / 12)}y ago`;
}

const GithubWindow = ({ windowName = "github", setWindowsState }) => {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("All");

  const fetchData = useCallback(async (ignoreCache = false) => {
    setLoading(true);
    setError(null);

    // 1. Check sessionStorage cache
    if (!ignoreCache && typeof window !== "undefined" && window.sessionStorage) {
      try {
        const cachedUserStr = sessionStorage.getItem(CACHE_KEY_USER);
        const cachedReposStr = sessionStorage.getItem(CACHE_KEY_REPOS);
        if (cachedUserStr && cachedReposStr) {
          const cachedUser = JSON.parse(cachedUserStr);
          const cachedRepos = JSON.parse(cachedReposStr);
          if (
            cachedUser.timestamp &&
            Date.now() - cachedUser.timestamp < CACHE_TTL &&
            cachedRepos.timestamp &&
            Date.now() - cachedRepos.timestamp < CACHE_TTL
          ) {
            setUserData(cachedUser.data);
            setRepos(cachedRepos.data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.warn("Failed to read GitHub cache from sessionStorage:", err);
      }
    }

    // 2. Fetch fresh from GitHub API
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
        )
      ]);

      if (!userRes.ok || !reposRes.ok) {
        throw new Error(
          `GitHub API responded with status ${userRes.status || reposRes.status}`
        );
      }

      const userJson = await userRes.json();
      const reposJson = await reposRes.json();

      if (!Array.isArray(reposJson)) {
        throw new Error("Invalid repository list received from GitHub");
      }

      // Filter out special profile repo Pallavxs from main project list or place it last
      const validRepos = reposJson.filter(
        (r) => r.name.toLowerCase() !== GITHUB_USERNAME.toLowerCase()
      );

      setUserData(userJson);
      setRepos(validRepos);

      // Save to cache
      if (typeof window !== "undefined" && window.sessionStorage) {
        try {
          sessionStorage.setItem(
            CACHE_KEY_USER,
            JSON.stringify({ timestamp: Date.now(), data: userJson })
          );
          sessionStorage.setItem(
            CACHE_KEY_REPOS,
            JSON.stringify({ timestamp: Date.now(), data: validRepos })
          );
        } catch (err) {
          console.warn("Failed to write GitHub cache to sessionStorage:", err);
        }
      }
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError(err.message || "Failed to load GitHub activity");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Calculate real metrics
  const totalStars = useMemo(() => {
    return repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  }, [repos]);

  // Unique languages for filtering
  const availableLanguages = useMemo(() => {
    const langs = new Set();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ["All", ...Array.from(langs)];
  }, [repos]);

  // Filtered repositories
  const filteredRepos = useMemo(() => {
    if (selectedLanguage === "All") return repos;
    return repos.filter((r) => r.language === selectedLanguage);
  }, [repos, selectedLanguage]);

  const profileAvatar = userData?.avatar_url || profile.photo;
  const profileName = userData?.name || profile.name;
  const profileBio =
    userData?.bio ||
    profile.bio ||
    "AI-focused Full Stack Developer building real-time web apps and scalable backend architectures.";
  const publicReposCount = userData?.public_repos ?? repos.length;
  const followersCount = userData?.followers ?? 0;
  const followingCount = userData?.following ?? 0;

  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="66vw"
      height="62vh"
    >
      <div className="github-app-window">
        {/* Profile Header */}
        <header className="gh-header">
          <div className="gh-user-info">
            <div className="gh-avatar">
              <img
                src={profileAvatar}
                alt={profileName}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = profile.photo;
                }}
              />
              <span className="online-badge" title="Active on GitHub" />
            </div>
            <div className="gh-user-meta">
              <div className="gh-title-row">
                <h2>{profileName}</h2>
                <span className="gh-handle">@{GITHUB_USERNAME}</span>
              </div>
              <p className="gh-bio">{profileBio}</p>
            </div>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-view-btn"
          >
            Visit GitHub Profile ↗
          </a>
        </header>

        {/* Real Dynamic Metrics Bar */}
        <section className="gh-metrics-bar" aria-label="GitHub Statistics">
          <div className="gh-metric-item">
            <span className="metric-val">{publicReposCount}</span>
            <span className="metric-lbl">Public Repos</span>
          </div>
          <div className="gh-metric-item">
            <span className="metric-val">{totalStars}</span>
            <span className="metric-lbl">Total Stars</span>
          </div>
          <div className="gh-metric-item">
            <span className="metric-val">{followersCount}</span>
            <span className="metric-lbl">Followers</span>
          </div>
          <div className="gh-metric-item">
            <span className="metric-val">{followingCount}</span>
            <span className="metric-lbl">Following</span>
          </div>
        </section>

        {/* Filter Navigation */}
        <div className="gh-controls-bar">
          <div className="gh-section-heading">
            <h3>Featured & Public Repositories</h3>
            <span className="count-badge">{filteredRepos.length}</span>
          </div>

          {availableLanguages.length > 2 && (
            <div className="gh-filter-pills" role="tablist">
              {availableLanguages.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`filter-pill ${selectedLanguage === lang ? "active" : ""}`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Area: Loading / Error / Grid */}
        <div className="gh-repos-list">
          {loading && (
            <>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="gh-repo-card skeleton">
                  <div className="skeleton-line skeleton-title" />
                  <div className="skeleton-line skeleton-desc" />
                  <div className="skeleton-line skeleton-desc short" />
                  <div className="skeleton-footer">
                    <div className="skeleton-line skeleton-tag" />
                    <div className="skeleton-line skeleton-btn" />
                  </div>
                </div>
              ))}
            </>
          )}

          {!loading && error && (
            <div className="gh-error-state">
              <div className="error-icon">⚠️</div>
              <h4>GitHub data is temporarily unavailable.</h4>
              <p>
                Rate limits or connectivity may be temporarily affecting GitHub API responses.
              </p>
              <div className="error-actions">
                <button
                  type="button"
                  className="retry-btn"
                  onClick={() => fetchData(true)}
                >
                  Retry Loading
                </button>
                <a
                  href={`https://github.com/${GITHUB_USERNAME}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="profile-link"
                >
                  Visit GitHub Profile ↗
                </a>
              </div>
            </div>
          )}

          {!loading && !error && filteredRepos.length === 0 && (
            <div className="gh-empty-state">
              <p>No repositories found matching "{selectedLanguage}".</p>
              <button
                type="button"
                className="reset-btn"
                onClick={() => setSelectedLanguage("All")}
              >
                Reset Filter
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredRepos.map((repo) => {
              const fallback = REPO_METADATA_FALLBACK[repo.name] || {};
              const description =
                repo.description ||
                fallback.description ||
                "Full-stack web application & developer tools repository.";
              const topics =
                Array.isArray(repo.topics) && repo.topics.length > 0
                  ? repo.topics
                  : fallback.topics || [];
              const langColor =
                (repo.language && LANGUAGE_COLORS[repo.language]) || "#8b949e";
              const updatedText = repo.updated_at
                ? formatRelativeTime(repo.updated_at)
                : "";

              return (
                <article key={repo.id} className="gh-repo-card">
                  <div className="repo-top">
                    <span className="repo-icon" aria-hidden="true">
                      📦
                    </span>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-name"
                      title={repo.name}
                    >
                      {repo.name}
                    </a>
                    <span className="repo-visibility">
                      {repo.private ? "Private" : "Public"}
                    </span>
                  </div>

                  <p className="repo-desc" title={description}>
                    {description}
                  </p>

                  <div className="repo-tags" aria-label="Tags and Language">
                    {repo.language && (
                      <span className="lang-badge">
                        <span
                          className="lang-dot"
                          style={{ backgroundColor: langColor }}
                        />
                        {repo.language}
                      </span>
                    )}
                    {topics.slice(0, 3).map((t) => (
                      <span key={t} className="tech-badge">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="repo-meta-row">
                    <span className="meta-item" title="Stars">
                      <span className="star-icon">★</span> {repo.stargazers_count || 0}
                    </span>
                    <span className="meta-item" title="Forks">
                      <span className="fork-icon">⑂</span> {repo.forks_count || 0}
                    </span>
                    {updatedText && (
                      <span className="meta-item updated" title="Last Updated">
                        Updated {updatedText}
                      </span>
                    )}
                  </div>

                  <div className="repo-footer">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-link"
                    >
                      Code ↗
                    </a>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </MacWindows>
  );
};

export default GithubWindow;
