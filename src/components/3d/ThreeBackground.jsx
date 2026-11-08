import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useWindowManager } from "../../context/WindowManagerContext";
import { createDeveloperWorkstation } from "./DeskSceneBuilder";
import "./threeBackground.scss";

const OBJECTS_CONFIG = [
  {
    id: "react",
    appId: "projects",
    tooltip: "React · Projects Explorer",
    tech: "React",
    basePos: [-7.8, 4.2, 0],
    color: 0x0284c7,
    emissive: 0x00f2fe,
    wireColor: 0x38bdf8,
    type: "react",
    emissiveIntensity: 0.45
  },
  {
    id: "ai",
    appId: "cli",
    tooltip: "AI / LLM · Terminal",
    tech: "AI / LLM",
    basePos: [7.8, 4.2, 0],
    color: 0xd97706,
    emissive: 0xf59e0b,
    wireColor: 0xfbbf24,
    type: "ai",
    emissiveIntensity: 0.45
  },
  {
    id: "typescript",
    appId: "skills",
    tooltip: "TypeScript · Technical Skills",
    tech: "TypeScript",
    basePos: [-8.4, 0.8, 1],
    color: 0x1d4ed8,
    emissive: 0x3b82f6,
    wireColor: 0x60a5fa,
    type: "typescript",
    emissiveIntensity: 0.35
  },
  {
    id: "nodejs",
    appId: "github",
    tooltip: "Node.js · GitHub Activity",
    tech: "Node.js",
    basePos: [8.4, 0.8, 1],
    color: 0x047857,
    emissive: 0x10b981,
    wireColor: 0x34d399,
    type: "nodejs",
    emissiveIntensity: 0.35
  },
  {
    id: "database",
    appId: "resume",
    tooltip: "MongoDB · Resume (PDF)",
    tech: "MongoDB",
    basePos: [-3.0, 5.5, -2],
    color: 0x0e7490,
    emissive: 0x06b6d4,
    wireColor: 0x22d3ee,
    type: "database",
    emissiveIntensity: 0.4
  },
  {
    id: "links",
    appId: "links",
    tooltip: "JavaScript · Developer Links",
    tech: "JavaScript",
    basePos: [3.0, 5.5, -2.5],
    color: 0x7c3aed,
    emissive: 0xa855f7,
    wireColor: 0xc084fc,
    type: "links",
    emissiveIntensity: 0.45
  }
];

const ThreeBackground = () => {
  const mountRef = useRef(null);
  const { openWindow } = useWindowManager();
  const [hoveredApp, setHoveredApp] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer, animationFrameId;
    let planeGeo, terrainMat, wireMat, particleGeo, particleMat;
    let handleMouseMove, handleResize, handleClick;

    try {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. Scene setup - Deep Dark Space Palette with Interactive Day / Night Modes
      const scene = new THREE.Scene();
      const nightBg = new THREE.Color(0x03050b);
      const dayBg = new THREE.Color(0x0a1222);
      const currentBg = nightBg.clone();
      const targetBg = nightBg.clone();

      scene.background = currentBg;
      scene.fog = new THREE.FogExp2(0x03050b, 0.024);

      let isDayMode = false;
      let targetFogExp = 0.024;
      let targetAmbient = 1.6;
      let targetLampIntensity = 2.8;
      let targetHorizonIntensity = 0.7;
      const nightHorizonColor = new THREE.Color(0x1e293b);
      const dayHorizonColor = new THREE.Color(0x38bdf8);
      const targetHorizonColor = nightHorizonColor.clone();

      const toggleLighting = () => {
        isDayMode = !isDayMode;
        if (isDayMode) {
          targetBg.copy(dayBg);
          targetFogExp = 0.018;
          targetAmbient = 2.4;
          targetLampIntensity = 0.7;
          targetHorizonIntensity = 1.6;
          targetHorizonColor.copy(dayHorizonColor);
        } else {
          targetBg.copy(nightBg);
          targetFogExp = 0.024;
          targetAmbient = 1.6;
          targetLampIntensity = 2.8;
          targetHorizonIntensity = 0.7;
          targetHorizonColor.copy(nightHorizonColor);
        }
      };

      // 2. Camera setup - Centered with Parallax
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        120
      );
      camera.position.set(0, 2.5, 22);

      // 3. High Performance Renderer
      renderer = new THREE.WebGLRenderer({
        alpha: false,
        antialias: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(nightBg, 1);
      container.appendChild(renderer.domElement);

      // 4. Subtle Ambient & Accent Lighting
      const ambientLight = new THREE.AmbientLight(0x1a2236, 1.8);
      scene.add(ambientLight);

      const amberLight = new THREE.PointLight(0xf59e0b, 2.5, 45);
      amberLight.position.set(9, 7, 10);
      scene.add(amberLight);

      const violetLight = new THREE.PointLight(0x8b5cf6, 2.2, 50);
      violetLight.position.set(-9, 6, 8);
      scene.add(violetLight);

      const horizonLight = new THREE.DirectionalLight(0x1e293b, 0.8);
      horizonLight.position.set(0, -6, -10);
      scene.add(horizonLight);

      // 5. Low-Poly Procedural Wireframe Mountain Surface (Distant atmospheric horizon behind desk)
      const terrainGroup = new THREE.Group();
      planeGeo = new THREE.PlaneGeometry(85, 26, 44, 22);
      const posAttr = planeGeo.attributes.position;
      const initialZ = new Float32Array(posAttr.count);

      for (let i = 0; i < posAttr.count; i++) {
        const vx = posAttr.getX(i);
        const vy = posAttr.getY(i);
        const distFromCenter = Math.abs(vx) / 38;

        // Heights rise towards sides & horizon, leaving center subtle
        const baseElevation =
          Math.sin(vx * 0.28) * Math.cos(vy * 0.28) * 1.8 +
          Math.sin(vx * 0.55 + vy * 0.35) * 0.8;
        const elevation = (baseElevation + distFromCenter * 3.4) * 0.85;
        posAttr.setZ(i, elevation);
        initialZ[i] = elevation;
      }
      planeGeo.computeVertexNormals();

      // Extremely dark base
      terrainMat = new THREE.MeshStandardMaterial({
        color: 0x060914,
        roughness: 0.95,
        metalness: 0.1,
        flatShading: true
      });
      const terrainMesh = new THREE.Mesh(planeGeo, terrainMat);
      terrainMesh.rotation.x = -Math.PI * 0.48;
      terrainMesh.position.set(0, -4.5, -16);
      terrainGroup.add(terrainMesh);

      // Thin, low-contrast dark wireframe overlay
      wireMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        wireframe: true,
        transparent: true,
        opacity: 0.35
      });
      const wireframeMesh = new THREE.Mesh(planeGeo, wireMat);
      wireframeMesh.rotation.x = -Math.PI * 0.48;
      wireframeMesh.position.set(0, -4.48, -16);
      terrainGroup.add(wireframeMesh);

      scene.add(terrainGroup);

      // 6. Floating Developer / AI Objects (Widely spaced, middle center empty)
      const interactiveObjects = [];
      const raycastTargets = [];

      OBJECTS_CONFIG.forEach((cfg) => {
        const group = new THREE.Group();
        group.position.set(...cfg.basePos);

        // Visual container that scales independently around (0, 0, 0)
        const visualGroup = new THREE.Group();
        group.add(visualGroup);

        let mainMesh;

        if (cfg.type === "react") {
          // React Atom
          const core = new THREE.Mesh(
            new THREE.SphereGeometry(0.28, 16, 16),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              roughness: 0.3
            })
          );
          visualGroup.add(core);

          const ringMat = new THREE.MeshBasicMaterial({
            color: cfg.wireColor,
            wireframe: true,
            transparent: true,
            opacity: 0.55
          });
          for (let r = 0; r < 3; r++) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.018, 6, 32), ringMat);
            ring.rotation.x = (Math.PI / 3) * r;
            ring.rotation.y = (Math.PI / 6) * r;
            visualGroup.add(ring);
          }
          mainMesh = core;
        } else if (cfg.type === "ai") {
          // AI Neural Core
          const icosa = new THREE.Mesh(
            new THREE.IcosahedronGeometry(0.72, 0),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              wireframe: true,
              roughness: 0.2
            })
          );
          const inner = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.32, 0),
            new THREE.MeshStandardMaterial({
              color: cfg.wireColor,
              emissive: cfg.emissive,
              emissiveIntensity: 0.6,
              roughness: 0.4
            })
          );
          icosa.add(inner);
          visualGroup.add(icosa);
          mainMesh = icosa;
        } else if (cfg.type === "typescript") {
          // TypeScript Octahedron
          const octa = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.6, 0),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              roughness: 0.35,
              flatShading: true
            })
          );
          visualGroup.add(octa);
          mainMesh = octa;
        } else if (cfg.type === "nodejs") {
          // Node.js Hexagonal Prism
          const hex = new THREE.Mesh(
            new THREE.CylinderGeometry(0.55, 0.55, 0.35, 6),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              roughness: 0.4,
              flatShading: true
            })
          );
          visualGroup.add(hex);
          mainMesh = hex;
        } else if (cfg.type === "database") {
          // Database Crystal (Dual Pyramid)
          const crystal = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.55, 0),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              roughness: 0.3,
              flatShading: true
            })
          );
          crystal.scale.set(0.65, 1.15, 0.65);
          visualGroup.add(crystal);
          mainMesh = crystal;
        } else {
          // Links Torus Knot
          const knot = new THREE.Mesh(
            new THREE.TorusKnotGeometry(0.38, 0.08, 42, 8),
            new THREE.MeshStandardMaterial({
              color: cfg.color,
              emissive: cfg.emissive,
              emissiveIntensity: cfg.emissiveIntensity,
              roughness: 0.3
            })
          );
          visualGroup.add(knot);
          mainMesh = knot;
        }

        // Hit sphere stays attached to group at (0, 0, 0), outside visualGroup so it never scales or shifts
        const hitSphere = new THREE.Mesh(
          new THREE.SphereGeometry(1.15, 8, 8),
          new THREE.MeshBasicMaterial({ visible: false })
        );
        hitSphere.userData = { config: cfg, group };
        group.add(hitSphere);
        raycastTargets.push(hitSphere);

        scene.add(group);

        interactiveObjects.push({
          group,
          visualGroup,
          mainMesh,
          config: cfg,
          baseY: cfg.basePos[1],
          speedX: (Math.random() - 0.5) * 0.005,
          speedY: 0.004 + Math.random() * 0.003,
          currentScale: 1.0,
          targetScale: 1.0,
          isHovered: false,
          baseEmissive: cfg.emissiveIntensity || 0.4
        });
      });

      // 7. Sparse Field of Tiny Star Particles (Non-intrusive)
      const particleCount = 130;
      particleGeo = new THREE.BufferGeometry();
      const particlePositions = new Float32Array(particleCount * 3);

      for (let p = 0; p < particleCount * 3; p += 3) {
        particlePositions[p] = (Math.random() - 0.5) * 50;
        particlePositions[p + 1] = (Math.random() - 0.5) * 30 + 3;
        particlePositions[p + 2] = (Math.random() - 0.5) * 20;
      }
      particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

      particleMat = new THREE.PointsMaterial({
        color: 0x94a3b8,
        size: 0.065,
        transparent: true,
        opacity: 0.35
      });
      const starField = new THREE.Points(particleGeo, particleMat);
      scene.add(starField);

      // 8. 3D Cinematic Developer Workstation (Desk, Monitor, Interactive Lamp, Coffee Mug, Accessories)
      const deskHandles = createDeveloperWorkstation({
        scene,
        raycastTargets,
        interactiveItems: interactiveObjects,
        onToggleLighting: toggleLighting
      });

      // 9. Raycaster & Mouse Tracking
      const raycaster = new THREE.Raycaster();
      const mouseVec = new THREE.Vector2(-999, -999);
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      handleMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        // If hovering over any UI layer (Terminal, window, dock, navbar, modal),
        // completely suppress 3D raycasting and dismiss any 3D hover tooltip
        const hitEl = document.elementFromPoint(e.clientX, e.clientY) || e.target;
        const isOverUI = Boolean(
          hitEl?.closest(
            ".window, .react-draggable, [role='dialog'], .dock-container, .dock, .os-nav-bar, .futuristic-profile-card, .profile-card-backdrop"
          )
        );

        if (isOverUI) {
          setHoveredApp(null);
          interactiveObjects.forEach((item) => {
            item.targetScale = 1.0;
            item.isHovered = false;
          });
          container.style.cursor = "default";
          return;
        }

        mouseVec.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseVec.y = -(e.clientY / window.innerHeight) * 2 + 1;

        // Check 3D hover raycast
        raycaster.setFromCamera(mouseVec, camera);
        const intersects = raycaster.intersectObjects(raycastTargets, false);

        if (intersects.length > 0) {
          const hitCfg = intersects[0].object.userData.config;
          setHoveredApp(hitCfg);
          setTooltipPos({ x: e.clientX, y: e.clientY });

          // Scale up hovered object (1.0 -> 1.12, world position remains completely fixed)
          interactiveObjects.forEach((item) => {
            if (item.config.id === hitCfg.id) {
              item.targetScale = 1.12;
              item.isHovered = true;
            } else {
              item.targetScale = 1.0;
              item.isHovered = false;
            }
          });
          container.style.cursor = "pointer";
        } else {
          setHoveredApp(null);
          interactiveObjects.forEach((item) => {
            item.targetScale = 1.0;
            item.isHovered = false;
          });
          container.style.cursor = "default";
        }
      };
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Click to open application window (Capture phase on canvas prevents event bubbling to empty desktop)
      handleClick = (e) => {
        // Only trigger if click didn't land on UI window, nav, or dock
        const hitEl = document.elementFromPoint(e.clientX, e.clientY) || e.target;
        if (
          hitEl?.closest(
            ".window, .react-draggable, [role='dialog'], .dock-container, .dock, .os-nav-bar, .futuristic-profile-card, .profile-card-backdrop"
          )
        ) {
          return;
        }

        const rect = renderer.domElement.getBoundingClientRect();
        const clickVec = new THREE.Vector2(
          ((e.clientX - rect.left) / rect.width) * 2 - 1,
          -((e.clientY - rect.top) / rect.height) * 2 + 1
        );

        raycaster.setFromCamera(clickVec, camera);
        const intersects = raycaster.intersectObjects(raycastTargets, false);

        if (intersects.length > 0) {
          // 3D Object clicked: stop propagation immediately so empty desktop Profile Card doesn't open
          e.stopPropagation();
          e.stopImmediatePropagation();
          const hitUserData = intersects[0].object.userData;
          const hitCfg = hitUserData.config;

          if (hitCfg?.isCustomAction && hitUserData.onAction) {
            hitUserData.onAction();
          } else if (hitCfg?.appId) {
            openWindow(hitCfg.appId);
          }
        }
      };
      if (renderer && renderer.domElement) {
        renderer.domElement.addEventListener("click", handleClick, { capture: true });
      }

      // 9. Resize Handling
      handleResize = () => {
        if (!camera || !renderer) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      };
      window.addEventListener("resize", handleResize);

      // 10. Animation Loop (Smooth 60fps, paused when document hidden)
      const startTime = performance.now();
      let lastCursorBlink = true;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        if (document.hidden) return;

        const elapsed = (performance.now() - startTime) * 0.001;

        // Smooth Day / Night lighting transitions
        currentBg.lerp(targetBg, 0.04);
        scene.background.copy(currentBg);
        scene.fog.color.copy(currentBg);
        scene.fog.density += (targetFogExp - scene.fog.density) * 0.04;
        ambientLight.intensity += (targetAmbient - ambientLight.intensity) * 0.04;
        horizonLight.intensity += (targetHorizonIntensity - horizonLight.intensity) * 0.04;
        horizonLight.color.lerp(targetHorizonColor, 0.04);

        if (deskHandles?.lampLight) {
          deskHandles.lampLight.intensity +=
            (targetLampIntensity - deskHandles.lampLight.intensity) * 0.05;
        }

        // Animated steam particles on developer coffee mug
        if (!prefersReducedMotion && deskHandles?.steamGeo) {
          const pos = deskHandles.steamPos;
          for (let s = 0; s < deskHandles.steamCount; s++) {
            const idx = s * 3;
            pos[idx + 1] += deskHandles.steamSpeeds[s];
            pos[idx] += Math.sin(elapsed * 2.2 + deskHandles.steamOffsets[s]) * 0.002;
            if (pos[idx + 1] > 2.6) {
              pos[idx + 1] = 0.95;
              pos[idx] = (Math.random() - 0.5) * 0.35;
            }
          }
          deskHandles.steamGeo.attributes.position.needsUpdate = true;
        }

        // Code screen blinking cursor
        if (deskHandles?.drawScreen) {
          const cursorBlink = Math.floor(elapsed * 2) % 2 === 0;
          if (cursorBlink !== lastCursorBlink) {
            lastCursorBlink = cursorBlink;
            deskHandles.drawScreen(cursorBlink);
          }
        }

        if (!prefersReducedMotion) {
          // Subtle, smooth camera parallax (parallel, gentle amplitude, zero jumping)
          targetX += (mouseX * 0.4 - targetX) * 0.03;
          targetY += (-mouseY * 0.25 - targetY) * 0.03;
          camera.position.x = targetX;
          camera.position.y = 2.5 + targetY;
          camera.lookAt(targetX * 0.15, 1.2, 0);

          // Animate floating tech objects
          interactiveObjects.forEach((item, index) => {
            if (!item.visualGroup) return;

            // Rotation easing: gentle rotation, slightly slower on hover
            const rotFactor = item.isHovered ? 0.35 : 1.0;
            item.visualGroup.rotation.x += item.speedX * rotFactor;
            item.visualGroup.rotation.y += item.speedY * rotFactor;

            // Position: Continuous smooth gentle floating bobbing without abrupt jumps on hover
            const bob = Math.sin(elapsed * 0.75 + index * 1.3) * 0.08;
            item.group.position.x = item.config.basePos[0];
            item.group.position.y = item.config.basePos[1] + bob;
            item.group.position.z = item.config.basePos[2];

            // Smooth scale animation (1.0 -> 1.12 -> 1.0) on visual container only
            item.currentScale += (item.targetScale - item.currentScale) * 0.14;
            item.visualGroup.scale.setScalar(item.currentScale);

            // Subtle emissive glow change on hover
            if (item.mainMesh?.material?.emissiveIntensity !== undefined) {
              const targetEmissive = item.isHovered
                ? item.baseEmissive * 1.8
                : item.baseEmissive;
              item.mainMesh.material.emissiveIntensity +=
                (targetEmissive - item.mainMesh.material.emissiveIntensity) * 0.12;
            }
          });

          // Slowly animate low-poly terrain wireframe wave
          const pos = planeGeo.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const vx = pos.getX(i);
            const wave = Math.sin(vx * 0.3 + elapsed * 0.25) * 0.15;
            pos.setZ(i, initialZ[i] + wave);
          }
          pos.needsUpdate = true;

          // Gentle particle drift
          starField.rotation.y = elapsed * 0.008;
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();
    } catch (err) {
      console.warn("WebGL background init notice:", err);
    }

    // Cleanup
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      if (renderer && renderer.domElement && handleClick) {
        renderer.domElement.removeEventListener("click", handleClick, { capture: true });
      }
      if (handleResize) window.removeEventListener("resize", handleResize);
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      if (planeGeo) planeGeo.dispose();
      if (terrainMat) terrainMat.dispose();
      if (wireMat) wireMat.dispose();
      if (particleGeo) particleGeo.dispose();
      if (particleMat) particleMat.dispose();
    };
  }, [openWindow]);

  return (
    <>
      <div ref={mountRef} className="three-background-canvas" aria-hidden="true" />
      {/* 3D Object Hover Tooltip */}
      {hoveredApp && (
        <div
          className="three-object-tooltip"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y - 42}px`
          }}
          role="tooltip"
        >
          <span className="tooltip-title">{hoveredApp.tooltip}</span>
          <span className="tooltip-sub">
            {hoveredApp.isCustomAction ? "Click to toggle" : "Click to open"}
          </span>
        </div>
      )}
    </>
  );
};

export default ThreeBackground;
