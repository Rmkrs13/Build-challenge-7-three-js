<template>
    <div class="controls">
      <h2>Customize Your Sneaker</h2>
      <div class="control">
        <label for="laces-color">Laces Color:</label>
        <input id="laces-color" type="color" v-model="lacesColor" @input="updateLacesColor" />
      </div>
      <div class="control">
        <label for="sole-color">Sole Color:</label>
        <input id="sole-color" type="color" v-model="soleColor" @input="updateSoleColor" />
      </div>
      <div class="control">
        <label for="body-color">Body Color:</label>
        <input id="body-color" type="color" v-model="bodyColor" @input="updateBodyColor" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lacesColor: "#ffffff",
        soleColor: "#ffffff",
        bodyColor: "#ffffff",
      };
    },
    methods: {
      updateLacesColor() {
        this.$emit("update-color", { part: "laces", color: this.lacesColor });
      },
      updateSoleColor() {
        this.$emit("update-color", { part: "sole", color: this.soleColor });
      },
      updateBodyColor() {
        this.$emit("update-color", { part: "body", color: this.bodyColor });
      },
    },
  };
  </script>
  
  <style scoped>
  .controls {
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .control label {
    font-weight: bold;
  }
  .control input {
    margin-top: 8px;
  }
  </style>