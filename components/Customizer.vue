<template>
  <div id="customizer">
    <h2>Create Your Perfect Shoe</h2>
    <div v-if="step === 0">
      <p>
        Customize your shoe with ready-made colors or choose your own.
        Click the button below to start.
      </p>
      <button class="cta-button" @click="startCustomization">Start Configuring</button>
    </div>

    <div v-else>
      <h2>Step {{ step }}</h2>
      <p>{{ stepDescription }}</p>

      <!-- Pre-defined Color Options -->
      <div v-if="step <= 3" class="color-options">
        <button class="color-button red" @click="applyColor('red')">Red</button>
        <button class="color-button green" @click="applyColor('green')">Green</button>
        <button class="color-button blue" @click="applyColor('blue')">Blue</button>
        <button class="color-button custom" @click="toggleCustomPicker">
          Custom
        </button>
      </div>

      <!-- Custom Color Picker -->
      <div v-if="showCustomPicker" class="custom-picker">
        <label for="custom-color">Choose Color:</label>
        <input
          id="custom-color"
          type="color"
          v-model="customColor"
          @input="applyCustomColor"
        />
      </div>

      <button v-if="step < 3" class="next-button" @click="nextStep">
        Next
      </button>
      <button v-if="step === 3" class="cta-button" @click="orderShoe">
        Let’s Order
      </button>

      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 0,
      selectedColor: "",
      customColor: "#ffffff",
      showCustomPicker: false,
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
    },
    nextStep() {
      this.showCustomPicker = false; // Hide picker when advancing
      if (this.step < 3) this.step++;
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
    toggleCustomPicker() {
      this.showCustomPicker = !this.showCustomPicker;
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
  gap: 10px;
  margin: 20px 0;
}

.color-button {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
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

.color-button.custom {
  background-color: #ffffff;
  border: 1px solid #ccc;
}

.color-button:hover {
  transform: scale(1.1);
}

.custom-picker {
  margin-top: 10px;
}

.next-button,
.cta-button {
  background-color: #69ff47;
  border: none;
  color: #333;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.next-button:hover,
.cta-button:hover {
  background-color: #58e038;
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