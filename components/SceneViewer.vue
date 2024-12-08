<template>
  <div id="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GUI } from "dat.gui";

export default {
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      const container = document.getElementById("scene-container");

      // Renderer
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      container.appendChild(renderer.domElement);

      // Scene
      const scene = new THREE.Scene();

      // Camera
      const camera = new THREE.PerspectiveCamera(
        50, // Standard FOV for a realistic perspective
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 6); // Adjusted position to accommodate larger shoe
      scene.add(camera);

      // Orbit Controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 7.5);
      scene.add(directionalLight);

      // Environment Map
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load("/textures/environment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      });

      // Shoe Model
      let shoe = null;
      const loader = new GLTFLoader();
      loader.load("/models/Shoe.glb", (gltf) => {
        shoe = gltf.scene;

        // Set a much larger shoe size
        shoe.scale.set(20, 20, 20); // Extremely large size to fill the screen
        shoe.position.set(0, -1, 0); // Adjust position to center the shoe better
        scene.add(shoe);

        // Make the shoe available globally for the configurator
        window.sneaker = shoe;

        // GUI Setup
        this.setupGUI(camera, shoe);
      });

      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Resize Handler
      window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      });
    },
    setupGUI(camera, shoe) {
      const gui = new GUI();

      // Style GUI for higher z-index
      gui.domElement.style.position = "absolute";
      gui.domElement.style.top = "10px";
      gui.domElement.style.right = "10px";
      gui.domElement.style.zIndex = "10000"; // Set higher z-index

      // Append GUI to DOM explicitly
      document.body.appendChild(gui.domElement);

      // Camera Position Controls
      const cameraFolder = gui.addFolder("Camera Position");
      cameraFolder.add(camera.position, "x", -20, 20, 0.1).name("Camera X");
      cameraFolder.add(camera.position, "y", -20, 20, 0.1).name("Camera Y");
      cameraFolder.add(camera.position, "z", -20, 20, 0.1).name("Camera Z");
      cameraFolder.add(camera, "fov", 20, 100, 1).name("Zoom (FOV)").onChange(() => {
        camera.updateProjectionMatrix();
      });
      cameraFolder.open();

      // Shoe Position Controls
      const shoeFolder = gui.addFolder("Shoe Position");
      if (shoe) {
        shoeFolder.add(shoe.position, "x", -10, 10, 0.1).name("Shoe X");
        shoeFolder.add(shoe.position, "y", -10, 10, 0.1).name("Shoe Y");
        shoeFolder.add(shoe.position, "z", -10, 10, 0.1).name("Shoe Z");
        shoeFolder.open();

        // Shoe Scale Controls (for size adjustments)
        shoeFolder.add(shoe.scale, "x", 1, 50, 1).name("Scale X");
        shoeFolder.add(shoe.scale, "y", 1, 50, 1).name("Scale Y");
        shoeFolder.add(shoe.scale, "z", 1, 50, 1).name("Scale Z");
      }
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
  z-index: 1; /* Behind other components */
}
</style>