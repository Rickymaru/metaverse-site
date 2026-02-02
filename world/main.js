import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

// Grab DOM elements
const canvas = document.getElementById('world');
const enterBtn = document.getElementById('enter-btn');
const enterScreen = document.getElementById('enter-screen');

// URL params
const params = new URLSearchParams(window.location.search);

let scene, camera, renderer;

// =======================
// Auto-enter if ?enter=true
// =======================
if (params.get('enter') === 'true') {
  enterScreen.style.display = 'none';
  canvas.style.display = 'block';
  document.documentElement.requestFullscreen?.();
  init();
  animate();
}

// =======================
// Manual click handler for first-time visitors
// =======================
enterBtn.addEventListener('click', () => {
  enterScreen.style.display = 'none';
  canvas.style.display = 'block';
  document.documentElement.requestFullscreen?.();
  init();
  animate();
});

// =======================
// Three.js setup
// =======================
function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb); // Sky blue

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 2, 5);

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7);
  scene.add(light);

  // Ground
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100),
    new THREE.MeshStandardMaterial({ color: 0x2e7d32 })
  );
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Handle window resize
  window.addEventListener('resize', onResize);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// =======================
// Animate loop
// =======================
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
