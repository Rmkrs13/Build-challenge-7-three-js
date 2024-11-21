import { createApp } from 'vue';
import App from './App.vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'dat.gui';

let scene, camera, renderer, controls, sneaker, gui;

// Renderer
renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Scene
scene = new THREE.Scene();

// Camera
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 2);

// Controls
controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Environment Map
const textureLoader = new THREE.TextureLoader();
const environmentMap = textureLoader.load('/textures/environment.jpg');
scene.background = environmentMap;
scene.environment = environmentMap;

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// GLTF Loader
const loader = new GLTFLoader();
loader.load('/models/Shoe.glb', (gltf) => {
  sneaker = gltf.scene;
  sneaker.scale.set(3, 3, 3);
  sneaker.position.set(0, 0, 0);
  sneaker.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(sneaker);

  // GUI Controls
  gui = new GUI();
  const params = {
    lightIntensity: 1,
    cameraAngle: 0,
    modelRotation: 0,
  };

  gui.add(params, 'lightIntensity', 0, 2).name('Light Intensity').onChange((value) => {
    directionalLight.intensity = value;
  });

  gui.add(params, 'cameraAngle', -Math.PI, Math.PI).name('Camera Angle').onChange((value) => {
    camera.position.x = Math.sin(value) * 2;
    camera.position.z = Math.cos(value) * 2;
    camera.lookAt(0, 0, 0);
  });

  gui.add(params, 'modelRotation', -Math.PI, Math.PI).name('Model Rotation').onChange((value) => {
    sneaker.rotation.y = value;
  });
});

// Branding: Text and Logo
const fontLoader = new THREE.FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new THREE.TextGeometry('Sneaker Customizer', {
    font: font,
    size: 0.2,
    height: 0.05,
  });
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(-1, 1.5, 0);
  scene.add(textMesh);
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