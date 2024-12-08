<template>
    <div id="three-container"></div>
  </template>
  
  <script>
  import * as THREE from "three";
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
    },
  };
  </script>
  
  <style>
  #three-container {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  </style>