import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

/*
 * PROPAD — nekonečně padající kovová kulička.
 *
 * The ball stays fixed at the world origin; the tunnel of "frames"
 * (rings) and the dust field fall past it forever, recycling from
 * below back to above. That is what lets the fall be literally
 * endless without ever losing floating point precision. The camera
 * orbits the ball on a sphere driven by pointer drag — an infinite
 * fall viewable from any angle.
 */

const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 300);

const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.03).texture;

const fogColor = new THREE.Color("#0a0a0d");
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor.getHex(), 0.052);

// --- lights: a cold key + a warm rim, so the metal reads as metal ---
const key = new THREE.DirectionalLight(0xeef2ff, 3.6);
key.position.set(4, 6, 5);
scene.add(key);

const fill = new THREE.DirectionalLight(0xaeb8cc, 1.4);
fill.position.set(-3, -2, 4);
scene.add(fill);

const rim = new THREE.PointLight(0xff8a5c, 6, 40, 2);
rim.position.set(-6, -3, -6);
scene.add(rim);

const ambient = new THREE.AmbientLight(0x40424a, 0.9);
scene.add(ambient);

// --- the falling metal ball ---
const ball = new THREE.Mesh(
  new THREE.SphereGeometry(1, 96, 96),
  new THREE.MeshStandardMaterial({
    color: 0xe4e7ec,
    metalness: 1,
    roughness: 0.22,
    envMapIntensity: 3.2,
  })
);
scene.add(ball);

// subtle self-shadowing contact glow beneath the ball
const glow = new THREE.PointLight(0x88aaff, 1.4, 8, 2);
glow.position.set(0, -0.2, 0.6);
scene.add(glow);

// --- the tunnel of "frames" (propadliny — pit frames) ---
const FRAME_COUNT = 22;
const FRAME_SPACING = 6.2;
const FALL_SPAN = FRAME_COUNT * FRAME_SPACING;
const frames = [];

function makeFrameMesh() {
  const ringGeo = new THREE.TorusGeometry(3.1, 0.07, 12, 64);
  const spokes = new THREE.Group();
  const spokeCount = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < spokeCount; i++) {
    const spoke = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 3.0, 6),
      new THREE.MeshBasicMaterial({ color: 0x3d4250, transparent: true, opacity: 0.35 })
    );
    spoke.rotation.z = (i / spokeCount) * Math.PI * 2;
    spokes.add(spoke);
  }
  const ring = new THREE.Mesh(
    ringGeo,
    new THREE.MeshStandardMaterial({
      color: 0x8f97a6,
      metalness: 0.6,
      roughness: 0.5,
      emissive: 0x111318,
      emissiveIntensity: 0.4,
    })
  );
  ring.rotation.x = Math.PI / 2;
  spokes.rotation.x = Math.PI / 2;
  const group = new THREE.Group();
  group.add(ring, spokes);
  group.userData.ring = ring;
  return group;
}

for (let i = 0; i < FRAME_COUNT; i++) {
  const f = makeFrameMesh();
  f.position.y = i * FRAME_SPACING - FALL_SPAN / 2;
  f.userData.spin = (Math.random() - 0.5) * 0.15;
  f.userData.baseScale = 0.85 + Math.random() * 0.5;
  f.scale.setScalar(f.userData.baseScale);
  scene.add(f);
  frames.push(f);
}

// --- drifting data-dust field, also recycled endlessly ---
const DUST_COUNT = 900;
const dustGeo = new THREE.BufferGeometry();
const dustPos = new Float32Array(DUST_COUNT * 3);
for (let i = 0; i < DUST_COUNT; i++) {
  const r = 1.6 + Math.random() * 4.2;
  const a = Math.random() * Math.PI * 2;
  dustPos[i * 3] = Math.cos(a) * r;
  dustPos[i * 3 + 1] = (Math.random() - 0.5) * FALL_SPAN;
  dustPos[i * 3 + 2] = Math.sin(a) * r;
}
dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
const dust = new THREE.Points(
  dustGeo,
  new THREE.PointsMaterial({
    color: 0x9fb4ff,
    size: 0.03,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  })
);
scene.add(dust);

// --- camera orbit state, driven by click+drag ---
const orbit = { theta: 0.5, phi: 1.15, radius: 9.2 };
const orbitTarget = { theta: orbit.theta, phi: orbit.phi, radius: orbit.radius };
let dragging = false;
let lastX = 0;
let lastY = 0;
let idleTime = 0;

function clampPhi(phi) {
  return Math.min(Math.max(phi, 0.35), Math.PI - 0.35);
}

canvas.addEventListener("pointerdown", (e) => {
  dragging = true;
  idleTime = 0;
  lastX = e.clientX;
  lastY = e.clientY;
  canvas.setPointerCapture(e.pointerId);
});

window.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  orbitTarget.theta -= dx * 0.0055;
  orbitTarget.phi = clampPhi(orbitTarget.phi - dy * 0.0055);
});

window.addEventListener("pointerup", () => {
  dragging = false;
});

canvas.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    orbitTarget.radius = Math.min(Math.max(orbitTarget.radius + e.deltaY * 0.01, 3.5), 22);
  },
  { passive: false }
);

// --- HUD elements ---
const hud = document.getElementById("hud");
const depthEl = document.getElementById("depth");
const velocityEl = document.getElementById("velocity");
const frameCountEl = document.getElementById("frame-count");
const streamEl = document.getElementById("stream");

let depth = 0;
let frameIndex = 0;
let streamAcc = 0;
const HEX = "0123456789abcdef";
function randomHexLine(len) {
  let s = "";
  for (let i = 0; i < len; i++) s += HEX[Math.floor(Math.random() * 16)];
  return s;
}

// --- overlay / intro ---
const overlay = document.getElementById("overlay");
const startBtn = document.getElementById("start-btn");
const infoToggle = document.getElementById("info-toggle");

function openOverlay() {
  overlay.classList.remove("hidden");
}
function closeOverlay() {
  overlay.classList.add("hidden");
  hud.classList.add("visible");
}
startBtn.addEventListener("click", closeOverlay);
infoToggle.addEventListener("click", openOverlay);

// --- resize ---
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", onResize);
onResize();

// --- main loop ---
const clock = new THREE.Clock();
let elapsed = 0;

function tick() {
  const dt = Math.min(clock.getDelta(), 0.05);
  elapsed += dt;

  // fall speed drifts slowly and pulses — the "accelerating velocity of images"
  const fallSpeed = 3.4 + Math.sin(elapsed * 0.13) * 1.1 + Math.max(0, Math.sin(elapsed * 0.47)) * 0.8;
  depth += fallSpeed * dt;

  // move the frame tunnel down through the ball, recycle from below to above
  for (const f of frames) {
    f.position.y -= fallSpeed * dt;
    f.userData.ring.rotation.z += f.userData.spin * dt;
    if (f.position.y < -FALL_SPAN / 2 - FRAME_SPACING) {
      f.position.y += FALL_SPAN + FRAME_SPACING;
      frameIndex += 1;
      const s = 0.8 + Math.random() * 0.55;
      f.userData.baseScale = s;
      f.scale.setScalar(s);
      f.userData.spin = (Math.random() - 0.5) * 0.18;
      f.rotation.y = Math.random() * Math.PI * 2;
    }
  }

  // drift the dust down too, recycle the same way
  const posAttr = dustGeo.attributes.position;
  for (let i = 0; i < DUST_COUNT; i++) {
    let y = posAttr.array[i * 3 + 1] - fallSpeed * 0.7 * dt;
    if (y < -FALL_SPAN / 2) y += FALL_SPAN;
    posAttr.array[i * 3 + 1] = y;
  }
  posAttr.needsUpdate = true;

  // ball wobbles very slightly, like something still tumbling as it falls
  ball.rotation.x += dt * 0.6;
  ball.rotation.z += dt * 0.22;
  ball.position.x = Math.sin(elapsed * 0.9) * 0.05;
  ball.position.z = Math.cos(elapsed * 0.7) * 0.05;

  // camera orbit damping, with slow auto-drift when idle
  if (!dragging) {
    idleTime += dt;
    if (idleTime > 2.2) orbitTarget.theta += dt * 0.05;
  }
  orbit.theta += (orbitTarget.theta - orbit.theta) * Math.min(1, dt * 6);
  orbit.phi += (orbitTarget.phi - orbit.phi) * Math.min(1, dt * 6);
  orbit.radius += (orbitTarget.radius - orbit.radius) * Math.min(1, dt * 4);

  camera.position.set(
    orbit.radius * Math.sin(orbit.phi) * Math.sin(orbit.theta),
    orbit.radius * Math.cos(orbit.phi),
    orbit.radius * Math.sin(orbit.phi) * Math.cos(orbit.theta)
  );
  camera.lookAt(0, 0, 0);

  // the environment "slightly changes" — a slow hue drift in fog + rim light,
  // representing data-infinity: endless variation on the same structure
  const hue = (elapsed * 0.008) % 1;
  fogColor.setHSL(hue, 0.35, 0.06);
  scene.fog.color.copy(fogColor);
  scene.background = fogColor;
  rim.color.setHSL((hue + 0.5) % 1, 0.6, 0.6);

  // occasional glitch pulse in the rim light — the vertigo spike
  if (Math.random() < 0.004) {
    rim.intensity = 14;
  } else {
    rim.intensity += (6 - rim.intensity) * 0.1;
  }

  // HUD
  depthEl.textContent = `HLOUBKA ${depth.toFixed(1).padStart(9, "0")} m`;
  velocityEl.textContent = `v = ${(fallSpeed * 37).toFixed(1).padStart(5, "0")} snímků/s`;
  frameCountEl.textContent = `SNÍMEK #${String(frameIndex).padStart(7, "0")}`;
  streamAcc += dt;
  if (streamAcc > 0.12) {
    streamAcc = 0;
    streamEl.textContent = `${randomHexLine(8)} ${randomHexLine(8)}\n${randomHexLine(8)} ${randomHexLine(8)}`;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

tick();
