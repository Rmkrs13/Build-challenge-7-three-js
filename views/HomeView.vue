<template>
  <div class="home">
    <Header />
    <img src="/logo.png" alt="Swear Logo" class="logo" />
    <div class="customizer-section">
      <Customizer @submitOrder="openOrderModal" :onStepChange="updateStep" />
    </div>
    <Footer />
    <SceneViewer :configStep="currentStep" />
    <OrderForm
      v-if="showOrderModal"
      :orderData="orderData"
      @close="closeOrderModal"
      @orderPlaced="handleOrderPlaced"
    />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SceneViewer from "../components/SceneViewer.vue";
import Customizer from "../components/Customizer.vue";
import OrderForm from "../components/OrderForm.vue";

export default {
  components: { Header, Footer, SceneViewer, Customizer, OrderForm },
  data() {
    return {
      currentStep: 0, // Track the current customization step
      showOrderModal: false,
      orderData: {
        customer: {
          name: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          zip: "",
          country: "",
        },
        shoeConfig: {
          size: 42,
          colors: {
            laces: "Red",
            sole: "White",
            inside: "Blue",
          },
        },
      },
    };
  },
  methods: {
    updateStep(step) {
      this.currentStep = step; // Update the step when it changes in the Customizer
    },
    openOrderModal(orderDetails) {
      this.orderData.shoeConfig = orderDetails.shoeConfig;
      this.showOrderModal = true;
    },
    closeOrderModal() {
      this.showOrderModal = false;
    },
    handleOrderPlaced() {
      this.showOrderModal = false;
      alert("Order placed successfully!");
    },
  },
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.logo {
  position: fixed;
  top: 80px; /* Below the header */
  left: 50%;
  transform: translateX(-50%);
  width: 180px; /* Increased size for better visibility */
  z-index: 10;
}

.customizer-section {
  position: fixed;
  bottom: 100px; /* Above the footer */
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: #f8f8f8;
  padding: 10px 0;
  font-size: 12px;
  z-index: 10;
}
</style>