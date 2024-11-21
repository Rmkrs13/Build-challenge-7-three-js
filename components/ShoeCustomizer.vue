<template>
  <div id="customizer">
    <h2>Customize Your Shoe</h2>
    <div class="controls">
      <div class="control">
        <label for="laces-color">Laces Color:</label>
        <input id="laces-color" type="color" v-model="lacesColor" @input="updateLacesColor" />
      </div>
      <div class="control">
        <label for="sole-color">Sole Color:</label>
        <input id="sole-color" type="color" v-model="soleColor" @input="updateSoleColor" />
      </div>
      <div class="control">
        <label for="rotation">Rotation:</label>
        <input id="rotation" type="range" min="0" max="360" v-model="rotation" @input="updateRotation" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lacesColor: "#ffffff",
      soleColor: "#000000",
      rotation: 0,
    };
  },
  methods: {
    updateLacesColor() {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("laces")) {
            child.material.color.set(this.lacesColor);
          }
        });
      }
    },
    updateSoleColor() {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("sole")) {
            child.material.color.set(this.soleColor);
          }
        });
      }
    },
    updateRotation() {
      if (window.sneaker) {
        window.sneaker.rotation.y = (this.rotation * Math.PI) / 180;
      }
    },
  },
};
</script>

<style>
#customizer {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control label {
  font-weight: bold;
}

.control input[type="color"],
.control input[type="range"] {
  width: 100%;
}
</style>