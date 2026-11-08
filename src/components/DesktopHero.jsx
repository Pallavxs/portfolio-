import React from "react";
import "./desktopHero.scss";

const DesktopHero = () => {
  return (
    <div className="desktop-hero-layer" aria-hidden="true">
      <div className="hero-text-wrap">
        <h1 className="hero-name">Pallav Shrivastava</h1>
        <p className="hero-title">FULL-STACK · MERN</p>
      </div>
    </div>
  );
};

export default DesktopHero;

