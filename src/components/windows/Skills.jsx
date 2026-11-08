import React, { useState, useMemo } from "react";
import MacWindows from "./MacWindows";
import { skillsData } from "../../config/skills";
import "./skills.scss";

const Skills = ({ windowName = "skills" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", ...skillsData.categories.map((c) => c.name)];
  }, []);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return skillsData.categories
      .filter((cat) => selectedCategory === "All" || cat.name === selectedCategory)
      .map((cat) => {
        if (!q) return cat;
        const matchingSkills = cat.skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.level.toLowerCase().includes(q) ||
            s.notes.toLowerCase().includes(q)
        );
        return { ...cat, skills: matchingSkills };
      })
      .filter((cat) => cat.skills.length > 0);
  }, [searchQuery, selectedCategory]);

  return (
    <MacWindows windowName={windowName} title="Technical Skills" width="58vw" height="64vh">
      <div className="skills-window">
        {/* Header */}
        <header className="skills-header">
          <div className="skills-title-row">
            <div>
              <h2>Technical Skills</h2>
              <p className="skills-subtitle">
                Engineered competencies across Full-Stack MERN development and modern architectures.
              </p>
            </div>
            {/* Filter / Search */}
            <div className="search-box">
              <input
                type="text"
                placeholder="Search skills (e.g. React, Docker, RAG)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="skills-search-input"
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`tab-btn ${selectedCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Content Body */}
        <div className="skills-body">
          {/* Skill Cards Grid */}
          <div className="categories-grid">
            {filteredCategories.map((cat) => (
              <div key={cat.name} className="category-card">
                <div className="cat-card-header">
                  <h3>{cat.name}</h3>
                  <span className="count-badge">{cat.skills.length} skills</span>
                </div>

                <div className="skills-list">
                  {cat.skills.map((skill) => {
                    const badgeMeta = skillsData?.levelBadges?.[skill.level] || {
                      color: "#38bdf8",
                      bg: "rgba(56, 189, 248, 0.15)"
                    };

                    return (
                      <div key={skill.name} className="skill-item">
                        <div className="skill-main">
                          <span className="skill-name">{skill.name}</span>
                          <span
                            className="level-badge"
                            style={{ color: badgeMeta.color, backgroundColor: badgeMeta.bg }}
                          >
                            {skill.level}
                          </span>
                        </div>
                        <p className="skill-notes">{skill.notes}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MacWindows>
  );
};

export default Skills;

