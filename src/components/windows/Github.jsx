import React, { useState } from "react";
import MacWindows from "./MacWindows";
import { projects } from "../../config/projects";
import "./github.scss";

const Github = ({ windowName = "projects", setWindowsState }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "AI / LLM", "Full-Stack Web", "Developer Tools"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const GitCard = ({ data }) => {
    return (
      <div className={`card ${data.featured ? "featured" : ""}`}>
        <div className="card-image-wrap">
          <img src={data.image} alt={data.name} loading="lazy" />
          <span className="category-tag">{data.category}</span>
          {data.featured && <span className="featured-badge">Featured</span>}
        </div>

        <div className="card-body">
          <div className="title-row">
            <h2>{data.name}</h2>
          </div>

          <p className="description">{data.description}</p>

          <div className="tags">
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
              Repository
            </a>
            {data.liveDemo && (
              <a
                href={data.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="action-link demo"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <MacWindows
      windowName={windowName}
      setWindowsState={setWindowsState}
      width="62vw"
      height="65vh"
    >
      <div className="projects-explorer-window">
        {/* Header Bar */}
        <div className="explorer-header">
          <div>
            <h1>Projects Explorer</h1>
            <p className="subtitle">
              Selected engineering projects by Pallav Shrivastava — Full-Stack & AI Systems.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="category-filter">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`filter-pill ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="cards">
          {filteredProjects.map((project) => (
            <GitCard key={project.id} data={project} />
          ))}
        </div>
      </div>
    </MacWindows>
  );
};

export default Github;
