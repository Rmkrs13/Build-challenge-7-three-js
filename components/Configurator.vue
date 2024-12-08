<template>
    <div id="three-container"></div>
  </template>
  
  <script>
  import * as THREE from "three";
<<<<<<< HEAD
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
  import { GUI } from "dat.gui";
  
  export default {
    name: "Configurator",
    data() {
      return {
        scene: null,
        camera: null,
        renderer: null,
        controls: null,
        sneaker: null,
        gui: null,
      };
    },
    methods: {
      initScene() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        document.getElementById("three-container").appendChild(this.renderer.domElement);
  
        this.scene = new THREE.Scene();
  
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 1, 2);
  
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
  
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load("/textures/environment.hdr", (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          this.scene.background = texture;
          this.scene.environment = texture;
        });
  
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
  
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 10, 7.5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);
  
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
        const floor = new THREE.Mesh(planeGeometry, planeMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;
        this.scene.add(floor);
  
        const loader = new GLTFLoader();
        loader.load("/models/Shoe.glb", (gltf) => {
          this.sneaker = gltf.scene;
          this.sneaker.scale.set(3, 3, 3);
          this.sneaker.position.set(0, 0.5, 0);
          this.scene.add(this.sneaker);
        });
  
        this.gui = new GUI();
        const params = { lightIntensity: 1, cameraAngle: 0, modelRotation: 0 };
        this.gui.add(params, "lightIntensity", 0, 2);
        this.gui.add(params, "cameraAngle", -Math.PI, Math.PI);
        this.gui.add(params, "modelRotation", -Math.PI, Math.PI);
  
        this.animate();
      },
      animate() {
        requestAnimationFrame(this.animate);
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
      },
    },
    mounted() {
      this.initScene();
    },
    beforeUnmount() {
      this.renderer.dispose();
      this.gui.destroy();
=======
  
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
>>>>>>> parent of 44619cd (Cleaning out file sytem)
    },
  };
  </script>
  
  <style>
  #three-container {
    width: 100%;
    height: 100vh;
<<<<<<< HEAD
    overflow: hidden;
=======
>>>>>>> parent of 44619cd (Cleaning out file sytem)
  }
  </style>