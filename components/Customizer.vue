<template>
  <div id="customizer">
    <h2>Mijn voorkeuren</h2>
    <div class="controls">
      <div class="control">
        <label for="laces-color">Veterskleur:</label>
        <input id="laces-color" type="color" v-model="lacesColor" @input="updateLacesColor" />
      </div>
      <div class="control">
        <label for="sole-color">Zoolkleur:</label>
        <input id="sole-color" type="color" v-model="soleColor" @input="updateSoleColor" />
      </div>
      <div class="control">
        <label for="shoe-body-color">Bodykleur:</label>
        <input id="shoe-body-color" type="color" v-model="shoeBodyColor" @input="updateBodyColor" />
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
      shoeBodyColor: "#ff0000",
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
    updateBodyColor() {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("inside")) {
            child.material.color.set(this.shoeBodyColor);
          }
        });
      }
    },
  },
};
</script>

<style>
#customizer {
  background: rgba(255, 255, 255, 0.2); /* Transparent background */
  backdrop-filter: blur(10px); /* Blur effect for glassy look */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Subtle border for effect */
  margin: 20px;
  position: fixed;
  top: 48px;
  left: 0px;
  z-index: 1000;
  width: 300px; /* Adjust width for a better design */
  color: black; /* Text color for better contrast */
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.control label {
  font-weight: bold;
  font-size: 14px; /* Adjust font size for modern look */
}

.control input[type="color"] {
  width: 100%;
  border: none;
  border-radius: 6px;
  height: 36px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.6);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>