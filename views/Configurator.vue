<template>
    <div id="three-container"></div>
  </template>
  
  <script>
  import * as THREE from "three";
  
  export default {
    name: "Configurator",
    mounted() {
      this.initThreeJs();
    },
    beforeUnmount() {
      // Clean up Three.js scene here
      if (this.renderer) {
        this.renderer.dispose();
      }
    },
    methods: {
      initThreeJs() {
        const container = document.getElementById("three-container");
  
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
  
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.z = 5;
  
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
  
        function animate() {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        }
        animate();
      },
    },
  };
  </script>
  
  <style>
  #three-container {
    width: 100%;
    height: 100vh;
  }
  </style>