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
        <label for="shoe-body-color">Body Color:</label>
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
      soleColor: "#ffffff",
      shoeBodyColor: "#ffffff",
    };
  },
  methods: {
    updateLacesColor() {
      window.sneaker?.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes("laces")) {
          child.material.color.set(this.lacesColor);
        }
      });
    },
    updateSoleColor() {
      window.sneaker?.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes("sole")) {
          child.material.color.set(this.soleColor);
        }
      });
    },
    updateBodyColor() {
      window.sneaker?.traverse((child) => {
        if (child.isMesh && child.name.toLowerCase().includes("body")) {
          child.material.color.set(this.shoeBodyColor);
        }
      });
    },
  },
};
</script>

<style scoped>
#customizer {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin: 20px;
  text-align: center;
}
.controls {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.control label {
  font-weight: bold;
}
</style>