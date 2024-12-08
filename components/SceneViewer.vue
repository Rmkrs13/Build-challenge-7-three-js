<template>
  <div id="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default {
  props: ["configStep"], // Receive the current step as a prop
  mounted() {
    this.initScene();
  },
  watch: {
    configStep(newStep) {
      this.adjustCamera(newStep); // Adjust the camera when the step changes
    },
  },
  methods: {
    initScene() {
      const container = document.getElementById("scene-container");

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Scene
      this.scene = new THREE.Scene();

      // Camera
      this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(10, 0, 4.2); // Default camera position
      this.scene.add(this.camera);

      // Orbit Controls
      this.controls = new OrbitControls(this.camera, renderer.domElement);
      this.controls.enableDamping = true;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      this.scene.add(directionalLight);

      // Environment Map
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load("/textures/environment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
      });

      // Shoe Model
      const loader = new GLTFLoader();
      loader.load("/models/Shoe.glb", (gltf) => {
        const shoe = gltf.scene;
        shoe.scale.set(16, 16, 16); // Default shoe size
        shoe.position.set(0, 0.5, 0);
        this.scene.add(shoe);

        // Make the shoe available globally for customization
        window.sneaker = shoe;
      });

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        this.controls.update();
        renderer.render(this.scene, this.camera);
      };
      animate();

      // Resize Handler
      window.addEventListener("resize", () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    },
    adjustCamera(step) {
      if (step === 1) {
        this.camera.position.set(10, 10, 10);
        this.camera.fov = 45; // Less zoomed-in for step 1
      } else if (step === 2) {
        this.camera.position.set(10, 0, 4.2);
        this.camera.fov = 50; // Default position and zoom
      } else if (step === 3) {
        this.camera.position.set(8, 13.7, 0.5);
        this.camera.fov = 40; // Less zoomed-in for step 3
      }
      this.camera.updateProjectionMatrix();
    },
  },
};
</script>

<style scoped>
#scene-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}
</style>