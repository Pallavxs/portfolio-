import React, { useState } from "react";
import MacWindows from "./MacWindows";
import { projects } from "../../config/projects";
import "./github.scss";

const Github = ({ windowName = "projects", setWindowsState }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI / LLM", "Full-Stack Web", "Developer Tools"];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const GitCard = ({ data }) => {
    return (
      <article className={`card ${data.featured ? "featured" : ""}`}>
        <div className="card-image-wrap">
          <img src={data.image} alt={data.name} loading="lazy" />
          <span className="category-tag">{data.category}</span>
          {data.featured && <span className="featured-badge">Featured</span>}
        </div>

        <div className="card-body">
          <div className="title-row">
            <h2>{data.name}</h2>
          </div>

          <p className="description" title={data.description}>
            {data.description}
          </p>

          <div className="tags" aria-label="Technologies used">
            {data.technologies.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="urls">
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="action-link repo"
            >
              Repository ↗
            </a>
            {data.liveDemo && (
              <a
                href={data.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link demo"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <MacWindows
      windowName={windowName}
      title="Projects Explorer"
      setWindowsState={setWindowsState}
      width="66vw"
      height="62vh"
    >
      <div className="projects-explorer-window">
        {/* Header Bar */}
        <div className="explorer-header">
          <div className="header-text">
            <h1>Projects Explorer</h1>
            <p className="subtitle">
              Selected engineering projects by Pallav Shrivastava — Full-Stack & AI Systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter" role="tablist" aria-label="Filter projects by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
                role="tab"
                aria-selected={selectedCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="cards">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <GitCard key={project.id} data={project} />
            ))
          ) : (
            <div className="no-projects">
              <p>No projects found in this category.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className="reset-btn"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </div>
    </MacWindows>
  );
};

export default Github;
