import React, { useState, useEffect, useCallback } from "react";
import { Rnd } from "react-rnd";
import { useWindowManager } from "../../context/WindowManagerContext";
import { APPS } from "../../config/apps";
import "./window.scss";

const MacWindows = ({
  windowName,
  title,
  children,
  width,
  height,
  setWindowsState
}) => {
  const {
    windows,
    activeWindowId,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useWindowManager();

  const winState = windows[windowName] || {
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 100,
    position: { x: 120, y: 70 },
    size: { width: width || "55vw", height: height || "55vh" },
    previousBounds: null
  };

  const appMeta = APPS[windowName] || {};
  const displayTitle = title || appMeta.title || `${appMeta.name || windowName}`;
  const isActive = activeWindowId === windowName;

  // Track responsive screen dimensions
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = useCallback(
    (e) => {
      e.stopPropagation();
      if (setWindowsState) {
        setWindowsState((prev) => ({ ...prev, [windowName]: false }));
      }
      closeWindow(windowName);
    },
    [closeWindow, setWindowsState, windowName]
  );

  const handleMinimize = useCallback(
    (e) => {
      e.stopPropagation();
      minimizeWindow(windowName);
    },
    [minimizeWindow, windowName]
  );

  const handleMaximize = useCallback(
    (e) => {
      e.stopPropagation();
      toggleMaximize(windowName);
    },
    [toggleMaximize, windowName]
  );

  const handleFocus = useCallback(() => {
    if (!isActive) {
      focusWindow(windowName);
    }
  }, [focusWindow, isActive, windowName]);

  // If window is not open, do not render in DOM
  if (!winState.isOpen) {
    return null;
  }

  // Calculate current positioning & sizing
  let currentPosition = winState.position || { x: 100, y: 60 };
  let currentSize = winState.size || {
    width: width || appMeta.defaultWidth || "55vw",
    height: height || appMeta.defaultHeight || "55vh"
  };

  if (isMobile) {
    currentPosition = { x: 0, y: 32 };
    currentSize = { width: "100vw", height: "calc(100vh - 96px)" };
  } else if (winState.isMaximized) {
    // Leave 32px top navigation and ~76px bottom dock accessible
    currentPosition = { x: 0, y: 32 };
    currentSize = { width: "100vw", height: "calc(100vh - 108px)" };
  }

  return (
    <Rnd
      style={{
        zIndex: winState.zIndex,
        display: winState.isMinimized ? "none" : "block",
        transition: winState.isMaximized ? "transform 0.22s cubic-bezier(0.16, 1, 0.3, 1), width 0.22s ease, height 0.22s ease" : "none"
      }}
      position={currentPosition}
      size={currentSize}
      onDragStop={(e, d) => {
        if (!winState.isMaximized && !isMobile) {
          updateWindowPosition(windowName, { x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, pos) => {
        if (!winState.isMaximized && !isMobile) {
          updateWindowSize(windowName, { width: ref.offsetWidth, height: ref.offsetHeight });
          updateWindowPosition(windowName, pos);
        }
      }}
      dragHandleClassName="nav"
      disableDragging={winState.isMaximized || isMobile}
      enableResizing={!winState.isMaximized && !isMobile}
      bounds="window"
      minWidth={appMeta.minWidth || 320}
      minHeight={appMeta.minHeight || 240}
      onMouseDown={handleFocus}
    >
      <div
        className={`window ${isActive ? "active-window" : "inactive-window"} ${winState.isMaximized ? "maximized" : ""} ${isMobile ? "mobile-view" : ""}`}
        role="dialog"
        aria-label={displayTitle}
        onMouseDown={handleFocus}
      >
        {/* macOS Control Header Bar */}
        <div className="nav" onDoubleClick={handleMaximize}>
          <div className="dots" onMouseDown={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={handleClose}
              className="dot red"
              title="Close (⌘W)"
              aria-label="Close window"
            >
              <span className="dot-glyph">×</span>
            </button>
            <button
              type="button"
              onClick={handleMinimize}
              className="dot yellow"
              title="Minimize (⌘M)"
              aria-label="Minimize window"
            >
              <span className="dot-glyph">−</span>
            </button>
            <button
              type="button"
              onClick={handleMaximize}
              className="dot green"
              title={winState.isMaximized ? "Restore window" : "Maximize window"}
              aria-label={winState.isMaximized ? "Restore window" : "Maximize window"}
            >
              <span className="dot-glyph">{winState.isMaximized ? "⤡" : "+"}</span>
            </button>
          </div>

          <div className="title">
            <p title={displayTitle}>{displayTitle}</p>
          </div>

          {/* Symmetrical spacer to ensure exact title centering */}
          <div className="nav-right-spacer" />
        </div>

        {/* Content Container */}
        <div className="main-content">
          {children}

          {/* Inactive overlay catches clicks anywhere (including over embedded iframes) to immediately focus window */}
          {!isActive && (
            <div
              className="inactive-click-overlay"
              onClick={handleFocus}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </Rnd>
  );
};

export default MacWindows;
