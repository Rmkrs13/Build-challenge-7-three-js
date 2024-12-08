<template>
  <div id="customizer">
    <div v-if="step === 0">
      <h2>We build your shoes how you like them</h2>
      <p>Configure your shoes how you want them</p>
      <button class="cta-button" @click="startCustomization">Start Configuring</button>
    </div>

    <div v-else>
      <h3><strong>{{ step }}. {{ stepDescription }}</strong></h3>

      <div class="color-options">
        <button class="color-button red" @click="applyColor('red')" />
        <button class="color-button green" @click="applyColor('green')" />
        <button class="color-button blue" @click="applyColor('blue')" />
        <button class="color-button white" @click="applyColor('white')" />
        <div class="color-button custom">
          <input
            type="color"
            v-model="customColor"
            @input="applyCustomColor"
          />
        </div>
      </div>

      <div class="navigation-buttons">
        <button v-if="step > 1" class="prev-button" @click="previousStep">
          Back
        </button>
        <button class="next-button" @click="nextStep">
          {{ step === 3 ? "Let’s Order" : "Next" }}
        </button>
      </div>

      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["onStepChange"], // Pass function to adjust the camera
  data() {
    return {
      step: 0,
      selectedColor: "",
      customColor: "#ffffff",
    };
  },
  computed: {
    progress() {
      return (this.step / 3) * 100;
    },
    stepDescription() {
      switch (this.step) {
        case 1:
          return "Choose a color for the laces.";
        case 2:
          return "Pick a color for the sole.";
        case 3:
          return "Select a color for the inside.";
        default:
          return "";
      }
    },
  },
  methods: {
    startCustomization() {
      this.step = 1;
      this.onStepChange(this.step); // Notify SceneViewer of step change
    },
    nextStep() {
      if (this.step < 3) {
        this.step++;
        this.onStepChange(this.step); // Notify SceneViewer of step change
      } else {
        this.orderShoe();
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step--;
        this.onStepChange(this.step); // Notify SceneViewer of step change
      }
    },
    orderShoe() {
      alert("Order placed successfully!");
    },
    applyColor(color) {
      this.selectedColor = color;
      const hexColor = this.getHexColor(color);

      if (this.step === 1) this.updateLacesColor(hexColor);
      if (this.step === 2) this.updateSoleColor(hexColor);
      if (this.step === 3) this.updateBodyColor(hexColor);
    },
    applyCustomColor() {
      this.selectedColor = this.customColor;

      if (this.step === 1) this.updateLacesColor(this.customColor);
      if (this.step === 2) this.updateSoleColor(this.customColor);
      if (this.step === 3) this.updateBodyColor(this.customColor);
    },
    getHexColor(color) {
      switch (color) {
        case "red":
          return "#ff0000";
        case "green":
          return "#00ff00";
        case "blue":
          return "#0000ff";
        case "white":
          return "#ffffff";
        default:
          return "#ffffff";
      }
    },
    updateLacesColor(color) {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("laces")) {
            child.material.color.set(color);
          }
        });
      }
    },
    updateSoleColor(color) {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("sole")) {
            child.material.color.set(color);
          }
        });
      }
    },
    updateBodyColor(color) {
      if (window.sneaker) {
        window.sneaker.traverse((child) => {
          if (child.isMesh && child.name.toLowerCase().includes("inside")) {
            child.material.color.set(color);
          }
        });
      }
    },
  },
};
</script>

<style scoped>
#customizer {
  background: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
  z-index: 10;
  position: relative;
}

.color-options {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 20px 0;
}

.color-button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}

.color-button.red {
  background-color: #ff0000;
}

.color-button.green {
  background-color: #00ff00;
}

.color-button.blue {
  background-color: #0000ff;
}

.color-button.white {
  background-color: #ffffff;
  border: 1px solid #ccc;
}

.color-button.custom {
  background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff, #ffffff);
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-button.custom input[type="color"] {
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.color-button:hover {
  transform: scale(1.1);
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.prev-button,
.next-button,
.cta-button {
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, border 0.3s ease;
}

.prev-button {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
}

.prev-button:hover {
  background-color: #f0f0f0;
}

.next-button,
.cta-button {
  background-color: #000000;
  color: #ffffff;
  border: 1px solid #ffffff;
}

.next-button:hover,
.cta-button:hover {
  background-color: #333333;
  border-color: #cccccc;
}

h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.progress-bar {
  margin-top: 20px;
  height: 10px;
  background-color: #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #69ff47;
  transition: width 0.3s ease;
}
</style>