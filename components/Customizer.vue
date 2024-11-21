<template>
  <div id="customizer">
    <h2>Pas je Sneaker aan</h2>
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.control label {
  font-weight: bold;
}

.control input[type="color"] {
  width: 100%;
}
</style>