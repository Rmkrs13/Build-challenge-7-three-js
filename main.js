import { createApp } from 'vue';
import App from './App.vue';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
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
const rgbeLoader = new RGBELoader();
rgbeLoader.load('/textures/environment.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;
  scene.environment = texture;
});

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
scene.add(directionalLight);

// Floor
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const floor = new THREE.Mesh(planeGeometry, planeMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = 0;
floor.receiveShadow = true;
scene.add(floor);

// GLTF Loader
const loader = new GLTFLoader();
loader.load('/models/Shoe.glb', (gltf) => {
  sneaker = gltf.scene;
  sneaker.scale.set(3, 3, 3);
  sneaker.position.set(0, 0.5, 0); // Zorg ervoor dat de schoen op de vloer staat
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