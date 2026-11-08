import React, { useState } from "react";
import "./app.scss";
import { WindowManagerProvider } from "./context/WindowManagerContext";
import Doc from "./components/Doc";
import Nav from "./components/Nav";
import Cli from "./components/windows/Cli";
import GithubWindow from "./components/windows/GithubWindow";
import Github from "./components/windows/Github"; // Projects Explorer
import Skills from "./components/windows/Skills";
import Resume from "./components/windows/Resume";
import Spotify from "./components/windows/Spotify";
import Contact from "./components/windows/Contact";
import LinksWindow from "./components/windows/LinksWindow";
import ThreeBackground from "./components/3d/ThreeBackground";
import ProfileCard from "./components/ProfileCard";
import DesktopHero from "./components/DesktopHero";

// Desktop Workspace containing 3D background, navigation, windows, dock, and profile card
const DesktopWorkspace = () => {
  const [profileCardOpen, setProfileCardOpen] = useState(false);

  const handleDesktopClick = (e) => {
    // Only open if clicking on empty wallpaper / background, not interactive UI or modals
    if (
      e.target.closest(".window") ||
      e.target.closest(".dock-container") ||
      e.target.closest(".dock") ||
      e.target.closest(".os-nav-bar") ||
      e.target.closest(".futuristic-profile-card") ||
      e.target.closest(".profile-card-backdrop") ||
      e.target.closest(".three-object-tooltip")
    ) {
      return;
    }
    setProfileCardOpen((prev) => !prev);
  };

  return (
    <main
      className="desktop-workspace"
      onClick={handleDesktopClick}
      aria-label="Desktop Workspace"
    >
      {/* Interactive 3D Mountain & Floating Tech Polyhedra Scene */}
      <ThreeBackground />

      {/* Top OS System Bar */}
      <Nav />

      {/* Hero Display Typography in Lower-Middle Space */}
      <DesktopHero />

      {/* Active Application Windows */}
      <Cli windowName="cli" />
      <GithubWindow windowName="github" />
      <Github windowName="projects" />
      <Resume windowName="resume" />
      <Spotify windowName="spotify" />
      <Contact windowName="contact" />
      <LinksWindow windowName="links" />
      <Skills windowName="skills" />

      {/* Futuristic Profile Card (Opened on empty desktop click) */}
      <ProfileCard
        isOpen={profileCardOpen}
        onClose={() => setProfileCardOpen(false)}
      />

      {/* Bottom Application Dock */}
      <Doc />
    </main>
  );
};

const App = () => {
  return (
    <WindowManagerProvider>
      <DesktopWorkspace />
    </WindowManagerProvider>
  );
};

export default App;
