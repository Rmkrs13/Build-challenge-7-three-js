import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createApp } from 'vue';
import App from './App.vue';

let scene, camera, renderer, controls, sneaker;

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Controls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Environment Map
const textureLoader = new THREE.TextureLoader();
const environmentMap = textureLoader.load('/textures/environment.jpg');
scene.background = environmentMap;
scene.environment = environmentMap;

// GLTF Loader
const loader = new GLTFLoader();
loader.load('/models/Shoe.glb', (gltf) => {
  sneaker = gltf.scene;
  sneaker.scale.set(1.5, 1.5, 1.5);
  sneaker.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(sneaker);
  // Make sneaker accessible in Vue for customization
  window.sneaker = sneaker;
});

// Animation Loop
function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Resize Handling
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start Vue App
createApp(App).mount('#app');
