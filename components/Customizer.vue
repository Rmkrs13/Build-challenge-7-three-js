<template>
  <div id="customizer">
    <h2 v-if="step === 0">Create Your Perfect Shoe</h2>
    <p v-if="step === 0">
      Customize your shoe to match your style. Click the button below to start your journey.
    </p>
    <button v-if="step === 0" class="cta-button" @click="startCustomization">
      Start Configuring
    </button>

    <div v-else>
      <h2>Step {{ step }}</h2>
      <p>{{ stepDescription }}</p>
      <div v-if="step === 1" class="control">
        <label for="laces-color">Laces Color:</label>
        <input id="laces-color" type="color" v-model="lacesColor" @input="updateLacesColor" />
      </div>
      <div v-if="step === 2" class="control">
        <label for="sole-color">Sole Color:</label>
        <input id="sole-color" type="color" v-model="soleColor" @input="updateSoleColor" />
      </div>
      <div v-if="step === 3" class="control">
        <label for="shoe-body-color">Inside Color:</label>
        <input id="shoe-body-color" type="color" v-model="shoeBodyColor" @input="updateBodyColor" />
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
      lacesColor: "#ffffff",
      soleColor: "#ffffff",
      shoeBodyColor: "#ffffff",
    };
  },
  computed: {
    progress() {
      return (this.step / 3) * 100;
    },
    stepDescription() {
      switch (this.step) {
        case 1:
          return "Choose the color for the laces.";
        case 2:
          return "Pick a color for the sole.";
        case 3:
          return "Select the inside color.";
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
      if (this.step < 3) this.step++;
    },
    orderShoe() {
      alert("Order placed successfully!");
    },
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

.control {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="color"] {
  width: 100%;
  border: none;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
}

.cta-button,
.next-button {
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

.cta-button:hover,
.next-button:hover {
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