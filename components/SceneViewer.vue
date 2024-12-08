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
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
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
  width: 100%;
  height: calc(100vh - 80px); /* Adjust height for header and footer */
  position: relative;
}
</style>