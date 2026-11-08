import * as THREE from "three";

/**
 * Procedural Dynamic Code Screen Canvas Texture
 * Generates an authentic developer workstation UI with syntax-highlighted MERN code,
 * status bars, terminal prompts, and active blinking cursor.
 */
export const createMonitorScreenTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  let texture = null;

  const drawScreen = (cursorVisible = true) => {
    // 1. Deep Space Terminal / IDE Background
    ctx.fillStyle = "#0a0f1d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle editor line grid
    ctx.strokeStyle = "rgba(30, 41, 59, 0.4)";
    ctx.lineWidth = 1;
    for (let y = 42; y < canvas.height - 30; y += 26) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // 2. Editor Window Top Title Bar
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, 0, canvas.width, 38);

    // Window controls (macOS style dots)
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.arc(24, 19, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f59e0b";
    ctx.beginPath();
    ctx.arc(42, 19, 5.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.beginPath();
    ctx.arc(60, 19, 5.5, 0, Math.PI * 2);
    ctx.fill();

    // Editor Tab
    ctx.fillStyle = "#1e293b";
    ctx.fillRect(84, 6, 230, 32);
    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(84, 6, 230, 2);

    ctx.font = "bold 13px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = "#e2e8f0";
    ctx.fillText("ProductionWorkstation.ts", 104, 25);

    ctx.fillStyle = "#64748b";
    ctx.fillText("✕", 286, 25);

    ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
    ctx.fillStyle = "#64748b";
    ctx.fillText("git:(main) ✓", 330, 25);

    // 3. Code Lines (Syntax accents: amber, violet, cyan, green, and slate)
    const lines = [
      { text: "// ⚡ Pallav Shrivastava — Full-Stack Developer · MERN", color: "#64748b" },
      { text: "import { MongoCluster, ReactClient } from '@mern/core';", color: "#c084fc" },
      { text: "import { createApiGateway, ExpressServer } from '@stack/api';", color: "#c084fc" },
      { text: "", color: "" },
      { text: "export class ProductionWorkstation implements DeveloperOS {", color: "#38bdf8" },
      { text: "  private readonly architect = 'Pallav Shrivastava';", color: "#94a3b8" },
      { text: "  private readonly stack = 'React · Node.js · Express · MongoDB';", color: "#34d399" },
      { text: "  public systemStatus: SystemStatus = 'ACTIVE_READY';", color: "#34d399" },
      { text: "", color: "" },
      { text: "  async deployMernCluster(): Promise<ClusterState> {", color: "#f59e0b" },
      { text: "    const cluster = new MongoCluster({ distributed: true, ssl: true });", color: "#e2e8f0" },
      { text: "    const gateway = await createApiGateway({ latency: '12ms' });", color: "#38bdf8" },
      { text: "    return gateway.streamProductionTelemetry();", color: "#c084fc" },
      { text: "  }", color: "#38bdf8" },
      { text: "}", color: "#38bdf8" },
      { text: "", color: "" },
      { text: "> [STACK] MongoDB + Node API + React 18: 0 errors. Latency: 12ms", color: "#10b981" },
      { text: "> pallav-os open --projects", color: "#f59e0b", hasCursor: true }
    ];

    ctx.font = "15px ui-monospace, SFMono-Regular, Menlo, monospace";
    let startY = 72;

    lines.forEach((line) => {
      if (line.text) {
        ctx.fillStyle = line.color || "#cbd5e1";
        ctx.fillText(line.text, 36, startY);

        if (line.hasCursor && cursorVisible) {
          const textWidth = ctx.measureText(line.text).width;
          ctx.fillStyle = "#f59e0b";
          ctx.fillRect(40 + textWidth, startY - 14, 9, 17);
        }
      }
      startY += 24;
    });

    // 4. Status Bar Bottom
    ctx.fillStyle = "#111827";
    ctx.fillRect(0, canvas.height - 28, canvas.width, 28);

    ctx.fillStyle = "#f59e0b";
    ctx.fillRect(0, canvas.height - 28, 110, 28);
    ctx.fillStyle = "#05070f";
    ctx.font = "bold 12px ui-monospace, monospace";
    ctx.fillText(" NORMAL ", 24, canvas.height - 10);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "12px ui-monospace, monospace";
    ctx.fillText("main*  |  UTF-8  |  TypeScript  |  Port: 5173  |  Click monitor to explore Projects", 125, canvas.height - 10);

    ctx.fillStyle = "#34d399";
    ctx.fillText("● MERN Stack Online", canvas.width - 170, canvas.height - 10);

    if (texture) {
      texture.needsUpdate = true;
    }
  };

  drawScreen(true);

  texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;

  return { texture, canvas, drawScreen };
};

/**
 * Builds the complete 3D Developer Workstation scene elements:
 * - Large dark matte-black 3D desk surface occupying lower portion (behind name & dock)
 * - Modern dark monitor with subtle code display (opens Projects app)
 * - Minimal desk lamp with Day/Night mode transition
 * - Ceramic coffee mug with subtle warm lighting & steam
 * - Understated compact keyboard, mouse, and notebook
 */
export const createDeveloperWorkstation = ({
  scene,
  raycastTargets,
  interactiveItems,
  onToggleLighting
}) => {
  const workstationGroup = new THREE.Group();
  workstationGroup.name = "developer-workstation";

  // Reusable Materials (Dark matte-black, restrained and premium)
  const tableMat = new THREE.MeshStandardMaterial({
    color: 0x111625,
    roughness: 0.45,
    metalness: 0.3
  });

  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: 0x1e2433,
    roughness: 0.35,
    metalness: 0.8
  });

  const brushedTitaniumMat = new THREE.MeshStandardMaterial({
    color: 0x2d3748,
    roughness: 0.28,
    metalness: 0.88
  });

  const amberGlowMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xf59e0b,
    emissiveIntensity: 1.6,
    roughness: 0.2
  });

  // Dedicated soft overhead light illuminating the desk surface & accessories
  const deskOverheadLight = new THREE.DirectionalLight(0xdbeafe, 1.8);
  deskOverheadLight.position.set(0, 7.0, 8.0);
  workstationGroup.add(deskOverheadLight);

  // ==========================================
  // 1. DESK / TABLE (Positioned above dock, behind hero text)
  // ==========================================
  const tableGroup = new THREE.Group();

  // Desktop Surface (Wide, deep, realistic thickness)
  const deskTop = new THREE.Mesh(
    new THREE.BoxGeometry(20.0, 0.36, 7.5),
    tableMat
  );
  deskTop.position.set(0, -0.65, 2.5);
  tableGroup.add(deskTop);
  deskOverheadLight.target = deskTop;

  // Front Chamfered Edge Trim
  const frontTrim = new THREE.Mesh(
    new THREE.BoxGeometry(20.02, 0.1, 0.18),
    brushedTitaniumMat
  );
  frontTrim.position.set(0, -0.5, 6.25);
  tableGroup.add(frontTrim);

  // Warm amber front light strip underneath the front edge
  const underglowStrip = new THREE.Mesh(
    new THREE.BoxGeometry(19.6, 0.05, 0.06),
    amberGlowMat
  );
  underglowStrip.position.set(0, -0.83, 6.24);
  tableGroup.add(underglowStrip);

  // Soft downward point light from table front
  const tableUnderglowLight = new THREE.PointLight(0xf59e0b, 1.4, 7.0);
  tableUnderglowLight.position.set(0, -1.0, 6.25);
  tableGroup.add(tableUnderglowLight);

  // Structural Trestle Legs (Grounded)
  const legPositions = [
    [-8.8, -3.2, 0.0],
    [-8.8, -3.2, 5.2],
    [8.8, -3.2, 0.0],
    [8.8, -3.2, 5.2]
  ];

  legPositions.forEach(([lx, ly, lz]) => {
    const leg = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 5.0, 0.28),
      darkMetalMat
    );
    leg.position.set(lx, ly, lz);
    tableGroup.add(leg);
  });

  // Cross support bars
  const leftCross = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 5.2), darkMetalMat);
  leftCross.position.set(-8.8, -4.0, 2.6);
  tableGroup.add(leftCross);

  const rightCross = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 5.2), darkMetalMat);
  rightCross.position.set(8.8, -4.0, 2.6);
  tableGroup.add(rightCross);

  workstationGroup.add(tableGroup);

  // ==========================================
  // 2. DEVELOPER MONITOR (Opens Projects App)
  // ==========================================
  const monitorGroup = new THREE.Group();
  monitorGroup.position.set(0, 1.5, 1.2);

  // Monitor Stand Base Plate
  const standBase = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 0.1, 1.8),
    brushedTitaniumMat
  );
  standBase.position.set(0, -2.1, 0.3);
  monitorGroup.add(standBase);

  // Monitor Neck Column
  const standColumn = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 2.2, 0.28),
    darkMetalMat
  );
  standColumn.position.set(0, -1.0, -0.05);
  standColumn.rotation.x = 0.04;
  monitorGroup.add(standColumn);

  // Monitor Chassis (Back enclosure with beveled frame)
  const monitorChassis = new THREE.Mesh(
    new THREE.BoxGeometry(8.6, 4.3, 0.28),
    new THREE.MeshStandardMaterial({
      color: 0x111624,
      roughness: 0.35,
      metalness: 0.75
    })
  );
  monitorChassis.position.set(0, 0, 0);
  monitorChassis.rotation.x = -0.02;
  monitorGroup.add(monitorChassis);

  // Glowing Code Screen (Self-illuminating, crisp and legible)
  const { texture: screenTexture, drawScreen } = createMonitorScreenTexture();

  const screenMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(8.35, 4.05),
    new THREE.MeshBasicMaterial({
      map: screenTexture,
      toneMapped: false
    })
  );
  screenMesh.position.set(0, 0, 0.15);
  screenMesh.rotation.x = -0.02;
  monitorGroup.add(screenMesh);

  // Subtle Cyan/Blue Bias Backlight behind monitor
  const monitorBacklight = new THREE.PointLight(0x38bdf8, 1.6, 8.0);
  monitorBacklight.position.set(0, 0, -0.8);
  monitorGroup.add(monitorBacklight);

  // Raycast Hit Box for Monitor (Click opens Projects app!)
  const monitorHitBox = new THREE.Mesh(
    new THREE.BoxGeometry(8.8, 4.6, 0.8),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  monitorHitBox.userData = {
    config: {
      id: "developer-monitor",
      appId: "projects",
      tooltip: "Developer Monitor · Projects Explorer"
    },
    group: monitorGroup
  };
  monitorGroup.add(monitorHitBox);
  raycastTargets.push(monitorHitBox);

  interactiveItems.push({
    group: monitorGroup,
    config: monitorHitBox.userData.config,
    baseY: monitorGroup.position.y,
    currentScale: 1.0,
    targetScale: 1.0
  });

  workstationGroup.add(monitorGroup);

  // ==========================================
  // 3. MINIMALIST MODERN DESK LAMP (INTERACTIVE)
  // ==========================================
  const lampGroup = new THREE.Group();
  lampGroup.position.set(-4.8, -0.45, 2.6);

  // Heavy Round Base
  const lampBase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.75, 0.12, 24),
    darkMetalMat
  );
  lampBase.position.set(0, 0, 0);
  lampGroup.add(lampBase);

  // Vertical Stem
  const lampStem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 2.6, 12),
    brushedTitaniumMat
  );
  lampStem.position.set(0, 1.3, 0);
  lampGroup.add(lampStem);

  // Cantilever Arm angled towards desk center
  const cantileverArm = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.6, 12),
    brushedTitaniumMat
  );
  cantileverArm.rotation.z = -Math.PI * 0.32;
  cantileverArm.position.set(0.65, 2.7, 0.35);
  lampGroup.add(cantileverArm);

  // Lamp Shade Enclosure
  const shadeGroup = new THREE.Group();
  shadeGroup.position.set(1.4, 2.9, 0.7);

  const shadeCone = new THREE.Mesh(
    new THREE.ConeGeometry(0.48, 0.65, 20, 1, true),
    new THREE.MeshStandardMaterial({
      color: 0x181e2b,
      roughness: 0.3,
      metalness: 0.85,
      side: THREE.DoubleSide
    })
  );
  shadeCone.rotation.x = Math.PI;
  shadeGroup.add(shadeCone);

  // Warm Amber Glowing Bulb
  const bulbMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.2, 16, 16),
    new THREE.MeshStandardMaterial({
      color: 0xffedd5,
      emissive: 0xf59e0b,
      emissiveIntensity: 2.5,
      roughness: 0.1
    })
  );
  bulbMesh.position.set(0, -0.2, 0);
  shadeGroup.add(bulbMesh);

  lampGroup.add(shadeGroup);

  // Soft Volumetric Desk Illumination PointLight
  const lampLight = new THREE.PointLight(0xf59e0b, 2.8, 12.0);
  lampLight.position.set(1.4, 2.7, 0.7);
  lampGroup.add(lampLight);

  // Interactive Raycast Hit Box for Lamp (Toggles Day/Night mode)
  const lampHitBox = new THREE.Mesh(
    new THREE.BoxGeometry(2.4, 3.4, 2.0),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  lampHitBox.position.set(0.7, 1.7, 0.35);
  lampHitBox.userData = {
    config: {
      id: "desk-lamp",
      isCustomAction: true,
      action: "toggleLighting",
      tooltip: "Desk Lamp · Click to toggle Day / Night Mode"
    },
    group: lampGroup,
    onAction: onToggleLighting
  };
  lampGroup.add(lampHitBox);
  raycastTargets.push(lampHitBox);

  interactiveItems.push({
    group: lampGroup,
    config: lampHitBox.userData.config,
    baseY: lampGroup.position.y,
    currentScale: 1.0,
    targetScale: 1.0
  });

  workstationGroup.add(lampGroup);

  // ==========================================
  // 4. DEVELOPER CERAMIC COFFEE MUG & STEAM
  // ==========================================
  const mugGroup = new THREE.Group();
  mugGroup.position.set(4.6, -0.45, 2.8);

  // Ceramic Mug Body
  const mugBody = new THREE.Mesh(
    new THREE.CylinderGeometry(0.38, 0.34, 0.85, 24),
    new THREE.MeshStandardMaterial({
      color: 0x181e2e,
      roughness: 0.35,
      metalness: 0.25
    })
  );
  mugBody.position.set(0, 0.42, 0);
  mugGroup.add(mugBody);

  // Amber Rim Accent Stripe
  const rimStripe = new THREE.Mesh(
    new THREE.TorusGeometry(0.37, 0.018, 8, 24),
    amberGlowMat
  );
  rimStripe.rotation.x = Math.PI / 2;
  rimStripe.position.set(0, 0.84, 0);
  mugGroup.add(rimStripe);

  // Coffee Liquid Surface inside
  const coffeeSurface = new THREE.Mesh(
    new THREE.CylinderGeometry(0.35, 0.35, 0.04, 24),
    new THREE.MeshStandardMaterial({
      color: 0x1a0f08,
      roughness: 0.1,
      metalness: 0.05
    })
  );
  coffeeSurface.position.set(0, 0.72, 0);
  mugGroup.add(coffeeSurface);

  // Ergonomic Mug Handle
  const mugHandle = new THREE.Mesh(
    new THREE.TorusGeometry(0.24, 0.048, 8, 16, Math.PI * 1.15),
    darkMetalMat
  );
  mugHandle.rotation.z = -Math.PI * 0.1;
  mugHandle.position.set(0.42, 0.42, 0);
  mugGroup.add(mugHandle);

  // Steam Particle System
  const steamCount = 18;
  const steamGeo = new THREE.BufferGeometry();
  const steamPos = new Float32Array(steamCount * 3);
  const steamSpeeds = new Float32Array(steamCount);
  const steamOffsets = new Float32Array(steamCount);

  for (let s = 0; s < steamCount; s++) {
    steamPos[s * 3] = (Math.random() - 0.5) * 0.28;
    steamPos[s * 3 + 1] = 0.8 + Math.random() * 1.2;
    steamPos[s * 3 + 2] = (Math.random() - 0.5) * 0.28;
    steamSpeeds[s] = 0.007 + Math.random() * 0.005;
    steamOffsets[s] = Math.random() * Math.PI * 2;
  }

  steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));
  const steamMat = new THREE.PointsMaterial({
    color: 0xe2e8f0,
    size: 0.12,
    transparent: true,
    opacity: 0.35
  });
  const steamParticles = new THREE.Points(steamGeo, steamMat);
  mugGroup.add(steamParticles);

  // Raycast Hit Box for Coffee Mug
  const mugHitBox = new THREE.Mesh(
    new THREE.CylinderGeometry(0.7, 0.7, 1.2, 12),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  mugHitBox.position.set(0, 0.5, 0);
  mugHitBox.userData = {
    config: {
      id: "coffee-mug",
      appId: "links",
      tooltip: "Developer Fuel · Coffee ☕"
    },
    group: mugGroup
  };
  mugGroup.add(mugHitBox);
  raycastTargets.push(mugHitBox);

  interactiveItems.push({
    group: mugGroup,
    config: mugHitBox.userData.config,
    baseY: mugGroup.position.y,
    currentScale: 1.0,
    targetScale: 1.0
  });

  workstationGroup.add(mugGroup);

  // ==========================================
  // 5. COMPACT KEYBOARD & ERGONOMIC MOUSE
  // ==========================================
  const keyboardGroup = new THREE.Group();
  keyboardGroup.position.set(0, -0.45, 4.0);
  keyboardGroup.rotation.x = -0.04;

  // Keyboard Base Case
  const kbBase = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 0.1, 1.6),
    new THREE.MeshStandardMaterial({
      color: 0x141a29,
      roughness: 0.45,
      metalness: 0.6
    })
  );
  keyboardGroup.add(kbBase);

  // Keycap Matrix Surface with subtle amber underglow
  const kbKeycaps = new THREE.Mesh(
    new THREE.BoxGeometry(4.5, 0.06, 1.4),
    new THREE.MeshStandardMaterial({
      color: 0x1a2236,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.22,
      roughness: 0.5
    })
  );
  kbKeycaps.position.set(0, 0.06, 0);
  keyboardGroup.add(kbKeycaps);

  workstationGroup.add(keyboardGroup);

  // Ergonomic Mouse
  const mouseGroup = new THREE.Group();
  mouseGroup.position.set(3.2, -0.45, 4.0);
  mouseGroup.rotation.y = -0.06;

  const mouseBody = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 16, 12),
    darkMetalMat
  );
  mouseBody.scale.set(1.0, 0.45, 1.4);
  mouseBody.position.set(0, 0.1, 0);
  mouseGroup.add(mouseBody);

  // Mouse Amber Scroll Wheel
  const scrollWheel = new THREE.Mesh(
    new THREE.CylinderGeometry(0.045, 0.045, 0.09, 12),
    amberGlowMat
  );
  scrollWheel.rotation.z = Math.PI / 2;
  scrollWheel.position.set(0, 0.22, -0.16);
  mouseGroup.add(scrollWheel);

  workstationGroup.add(mouseGroup);

  // ==========================================
  // 6. DEVELOPER LEATHER NOTEBOOK & STYLUS
  // ==========================================
  const notebookGroup = new THREE.Group();
  notebookGroup.position.set(-2.8, -0.45, 3.8);
  notebookGroup.rotation.y = 0.1;

  // Leather Cover
  const nbCover = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 0.12, 2.5),
    new THREE.MeshStandardMaterial({
      color: 0x151b2a,
      roughness: 0.65,
      metalness: 0.2
    })
  );
  notebookGroup.add(nbCover);

  // Pages Block
  const nbPages = new THREE.Mesh(
    new THREE.BoxGeometry(1.82, 0.08, 2.42),
    new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.8
    })
  );
  nbPages.position.set(0.03, 0, 0);
  notebookGroup.add(nbPages);

  // Amber Ribbon Bookmark
  const ribbon = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.02, 0.5),
    amberGlowMat
  );
  ribbon.position.set(-0.12, -0.04, 1.35);
  notebookGroup.add(ribbon);

  // Stylus Pen
  const stylus = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 2.0, 12),
    brushedTitaniumMat
  );
  stylus.rotation.x = Math.PI / 2;
  stylus.position.set(1.15, 0.03, 0);
  notebookGroup.add(stylus);

  workstationGroup.add(notebookGroup);

  // Add the entire workstation into the scene
  scene.add(workstationGroup);

  // Return handles for animated properties and lighting transitions
  return {
    workstationGroup,
    lampLight,
    tableUnderglowLight,
    bulbMesh,
    drawScreen,
    steamGeo,
    steamPos,
    steamSpeeds,
    steamOffsets,
    steamCount
  };
};
