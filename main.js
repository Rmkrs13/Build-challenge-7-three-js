import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 5);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
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
loader.load('/models/Shoe_compressed.glb', (gltf) => {
  const sneaker = gltf.scene;
  sneaker.scale.set(1.5, 1.5, 1.5);
  sneaker.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(sneaker);
});

// GUI
const gui = new GUI();
const lightFolder = gui.addFolder('Directional Light');
lightFolder.add(directionalLight.position, 'x', -10, 10).name('Light X');
lightFolder.add(directionalLight.position, 'y', -10, 10).name('Light Y');
lightFolder.add(directionalLight.position, 'z', -10, 10).name('Light Z');
lightFolder.open();

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