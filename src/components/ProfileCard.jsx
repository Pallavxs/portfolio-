import React, { useEffect, useRef, useState } from "react";
import { profile } from "../data/profile";
import { useWindowManager } from "../context/WindowManagerContext";
import "./profileCard.scss";

const ProfileCard = ({ isOpen, onClose }) => {
  const cardRef = useRef(null);
  const [imgError, setImgError] = useState(false);
  const { openWindow } = useWindowManager();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleResumeClick = (e) => {
    e.stopPropagation();
    openWindow("resume");
    onClose();
  };

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "PS";

  return (
    <div
      className="profile-card-backdrop"
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={cardRef}
        className="futuristic-profile-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient highlight */}
        <div className="card-ambient-glow" />

        {/* Close cross */}
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          aria-label="Close Profile Card"
        >
          ✕
        </button>

        {/* Profile Avatar with status ring */}
        <div className="avatar-section">
          <div className="avatar-ring">
            {!imgError && profile.photo ? (
              <img
                src={profile.photo}
                alt={profile.name}
                className="profile-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="profile-img-fallback" aria-label={profile.name}>
                {initials}
              </div>
            )}
            <span className="live-status-dot" title="Available for hire" />
          </div>

          <h2 className="profile-name">{profile.name}</h2>
          <p className="profile-role">{profile.title}</p>

          <div className="availability-tag">
            <span className="pulse-dot" />
            <span>Available for work</span>
          </div>
        </div>

        {/* Bio summary */}
        <p className="profile-summary">
          Specializing in scalable web apps, high-performance APIs, real-time distributed systems, and modern MERN architectures.
        </p>

        {/* Action buttons */}
        <div className="card-actions-grid">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-btn github"
          >
            GitHub ↗
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card-action-btn linkedin"
          >
            LinkedIn ↗
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="card-action-btn email"
          >
            Email ✉
          </a>
          <button
            type="button"
            onClick={handleResumeClick}
            className="card-action-btn resume"
          >
            Resume (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

