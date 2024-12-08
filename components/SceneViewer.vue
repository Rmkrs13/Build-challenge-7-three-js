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

      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 1, 2);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const light = new THREE.DirectionalLight(0xffffff, 1);
      scene.add(light);

      const loader = new GLTFLoader();
      loader.load("/models/Shoe.glb", (gltf) => {
        const model = gltf.scene;
        model.scale.set(3, 3, 3);
        scene.add(model);
      });

      const rgbeLoader = new RGBELoader();
      rgbeLoader.load("/textures/environment.hdr", (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
      });

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
}
</style>