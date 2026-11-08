import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { APPS, APP_ALIASES } from "../config/apps";

const WindowManagerContext = createContext(null);

// Helper to determine the next active window when one is closed or minimized
const getNextActiveWindow = (currentWindows, excludingId) => {
  let highestZ = -1;
  let nextActiveId = null;

  Object.values(currentWindows).forEach((win) => {
    if (
      win.id !== excludingId &&
      win.isOpen &&
      !win.isMinimized &&
      win.zIndex > highestZ
    ) {
      highestZ = win.zIndex;
      nextActiveId = win.id;
    }
  });

  return nextActiveId;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error("useWindowManager must be used within a WindowManagerProvider");
  }
  return context;
};

export const WindowManagerProvider = ({ children }) => {
  // Global z-index counter to manage unified window stacking
  const zIndexCounter = useRef(100);
  const cascadeCounter = useRef(0);

  // Initial windows state: Terminal starts open by default for immediate developer interaction
  const [windows, setWindows] = useState(() => {
    const initial = {};
    Object.keys(APPS).forEach((appId) => {
      initial[appId] = {
        id: appId,
        isOpen: appId === "cli",
        isMinimized: false,
        isMaximized: false,
        zIndex: appId === "cli" ? 101 : 100,
        position: { x: 120, y: 70 },
        size: {
          width: APPS[appId].defaultWidth || "55vw",
          height: APPS[appId].defaultHeight || "55vh"
        },
        previousBounds: null
      };
    });
    return initial;
  });

  const [activeWindowId, setActiveWindowId] = useState("cli");

  const resolveAppId = useCallback((idOrAlias) => {
    if (!idOrAlias) return null;
    const clean = idOrAlias.toLowerCase().trim();
    if (APPS[clean]) return clean;
    if (APP_ALIASES[clean]) return APP_ALIASES[clean];
    return null;
  }, []);

  const getNextZIndex = useCallback(() => {
    zIndexCounter.current += 1;
    return zIndexCounter.current;
  }, []);

  // Intelligent cascading: Window 1 centered, subsequent windows subtly offset (+32px, +26px), wraps after 5
  const calculateCascadePosition = useCallback(() => {
    if (typeof window === "undefined") return { x: 120, y: 70 };
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    // Mobile screens always dock at the top left below navigation
    if (winWidth <= 768) {
      return { x: 0, y: 32 };
    }

    const defaultW = Math.min(840, winWidth * 0.58);
    const defaultH = Math.min(580, (winHeight - 32 - 76) * 0.75);

    const step = cascadeCounter.current % 5;
    cascadeCounter.current += 1;

    // Center base position between top nav (32px) and bottom dock (76px)
    const centerX = Math.max(30, Math.floor((winWidth - defaultW) / 2));
    const centerY = Math.max(48, Math.floor((winHeight - 32 - 76 - defaultH) / 2) + 32);

    const xOffset = step * 32;
    const yOffset = step * 26;

    let posX = centerX + xOffset;
    let posY = centerY + yOffset;

    // Strict boundary checks: ensure window cannot open outside viewport
    if (posX + 340 > winWidth) posX = Math.max(20, winWidth - 380);
    if (posY + 260 > winHeight - 76) posY = Math.max(40, winHeight - 340);

    return { x: posX, y: posY };
  }, []);

  // Open window: prevents duplicates; restores and focuses if already open/minimized
  const openWindow = useCallback((appIdOrAlias) => {
    const resolvedId = resolveAppId(appIdOrAlias);
    if (!resolvedId || !APPS[resolvedId]) {
      return {
        success: false,
        error: `Application not found: "${appIdOrAlias}"`
      };
    }

    const nextZ = getNextZIndex();

    setWindows((prev) => {
      const current = prev[resolvedId] || {
        id: resolvedId,
        isOpen: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: nextZ,
        position: { x: 100, y: 60 },
        size: { width: APPS[resolvedId].defaultWidth, height: APPS[resolvedId].defaultHeight },
        previousBounds: null
      };

      if (current.isOpen) {
        // If already open, restore if minimized and elevate z-index
        return {
          ...prev,
          [resolvedId]: {
            ...current,
            isMinimized: false,
            zIndex: nextZ
          }
        };
      }

      // New window: calculate clean cascading placement
      const pos = calculateCascadePosition();

      return {
        ...prev,
        [resolvedId]: {
          ...current,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: nextZ,
          position: pos,
          size: {
            width: APPS[resolvedId].defaultWidth,
            height: APPS[resolvedId].defaultHeight
          },
          previousBounds: null
        }
      };
    });

    const isAlreadyOpen = Boolean(windows[resolvedId]?.isOpen);
    setActiveWindowId(resolvedId);
    return {
      success: true,
      appId: resolvedId,
      appName: APPS[resolvedId].name,
      alreadyOpen: isAlreadyOpen
    };
  }, [resolveAppId, getNextZIndex, calculateCascadePosition, windows]);

  // Close window: completely removes window from active view and transfers focus to next top window
  const closeWindow = useCallback((appIdOrAlias) => {
    const resolvedId = resolveAppId(appIdOrAlias);
    if (!resolvedId) {
      return { success: false, error: `Application not found: "${appIdOrAlias}"` };
    }

    setWindows((prev) => {
      if (!prev[resolvedId] || !prev[resolvedId].isOpen) {
        return prev;
      }
      return {
        ...prev,
        [resolvedId]: {
          ...prev[resolvedId],
          isOpen: false,
          isMinimized: false,
          isMaximized: false,
          previousBounds: null
        }
      };
    });

    setActiveWindowId((prevActive) => {
      if (prevActive === resolvedId) {
        return getNextActiveWindow(windows, resolvedId);
      }
      return prevActive;
    });

    return { success: true, appId: resolvedId };
  }, [resolveAppId, windows]);

  // Minimize window: hides from desktop while keeping dock running indicator; transfers focus
  const minimizeWindow = useCallback((appIdOrAlias) => {
    const resolvedId = resolveAppId(appIdOrAlias);
    if (!resolvedId) return;

    setWindows((prev) => {
      if (!prev[resolvedId]) return prev;
      return {
        ...prev,
        [resolvedId]: {
          ...prev[resolvedId],
          isMinimized: true
        }
      };
    });

    setActiveWindowId((prevActive) => {
      if (prevActive === resolvedId) {
        return getNextActiveWindow(windows, resolvedId);
      }
      return prevActive;
    });
  }, [resolveAppId, windows]);

  // Toggle maximize: stores previous dimensions/position, restores them cleanly on toggle
  const toggleMaximize = useCallback((appIdOrAlias) => {
    const resolvedId = resolveAppId(appIdOrAlias);
    if (!resolvedId) return;

    const nextZ = getNextZIndex();

    setWindows((prev) => {
      const current = prev[resolvedId];
      if (!current) return prev;

      if (!current.isMaximized) {
        // Maximizing: store previous bounds
        return {
          ...prev,
          [resolvedId]: {
            ...current,
            isMaximized: true,
            isMinimized: false,
            zIndex: nextZ,
            previousBounds: {
              position: current.position,
              size: current.size
            }
          }
        };
      }

      // Restoring from maximize: restore previous bounds
      const restoredPos = current.previousBounds?.position || current.position;
      const restoredSize = current.previousBounds?.size || current.size;

      return {
        ...prev,
        [resolvedId]: {
          ...current,
          isMaximized: false,
          isMinimized: false,
          zIndex: nextZ,
          position: restoredPos,
          size: restoredSize
        }
      };
    });

    setActiveWindowId(resolvedId);
  }, [resolveAppId, getNextZIndex]);

  // Focus window: raises to highest z-index and marks as active window
  const focusWindow = useCallback((appIdOrAlias) => {
    const resolvedId = resolveAppId(appIdOrAlias);
    if (!resolvedId) return;

    const nextZ = getNextZIndex();

    setWindows((prev) => {
      const current = prev[resolvedId];
      if (!current || !current.isOpen) return prev;

      return {
        ...prev,
        [resolvedId]: {
          ...current,
          isMinimized: false,
          zIndex: nextZ
        }
      };
    });

    setActiveWindowId(resolvedId);
  }, [resolveAppId, getNextZIndex]);

  const updateWindowPosition = useCallback((appId, position) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          position
        }
      };
    });
  }, []);

  const updateWindowSize = useCallback((appId, size) => {
    setWindows((prev) => {
      if (!prev[appId]) return prev;
      return {
        ...prev,
        [appId]: {
          ...prev[appId],
          size
        }
      };
    });
  }, []);

  const isAppRunning = useCallback((appIdOrAlias) => {
    const resolved = resolveAppId(appIdOrAlias);
    return Boolean(resolved && windows[resolved]?.isOpen);
  }, [resolveAppId, windows]);

  const isAppMinimized = useCallback((appIdOrAlias) => {
    const resolved = resolveAppId(appIdOrAlias);
    return Boolean(resolved && windows[resolved]?.isOpen && windows[resolved]?.isMinimized);
  }, [resolveAppId, windows]);

  const isAppActive = useCallback((appIdOrAlias) => {
    const resolved = resolveAppId(appIdOrAlias);
    return Boolean(resolved && activeWindowId === resolved);
  }, [resolveAppId, activeWindowId]);

  const value = {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    isAppRunning,
    isAppMinimized,
    isAppActive,
    resolveAppId
  };

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
};
