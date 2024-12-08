<template>
  <div id="scene-container"></div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

export default {
  mounted() {
    this.initScene();
  },
  methods: {
    initScene() {
      const container = document.getElementById("scene-container");

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      // Scene and camera
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.offsetWidth / container.offsetHeight,
        0.1,
        1000
      );
      camera.position.set(0, 1, 2);

      // Orbit controls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      // Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 10, 5);
      scene.add(directionalLight);

      // Load HDR environment texture
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load("/textures/environment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      });

      // Load the GLTF model
      const loader = new GLTFLoader();
      loader.load("/models/Shoe.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        model.position.set(0, 0, 0);
        scene.add(model);

        // Make the model accessible globally for customizer
        window.sneaker = model;

        // Debug: log child mesh names
        model.traverse((child) => {
          if (child.isMesh) {
            console.log("Mesh name:", child.name);
          }
        });
      });

      // Handle window resize
      window.addEventListener("resize", () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
      });

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();
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
  overflow: hidden;
}
</style>