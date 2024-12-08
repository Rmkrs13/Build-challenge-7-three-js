<template>
    <div class="modal">
      <div class="modal-content">
        <button class="close-button" @click="$emit('close')">X</button>
        <img src="/logo.png" alt="Swear Logo" class="modal-logo" />
        <div v-if="!orderPlaced">
          <h2>Place Your Order</h2>
          <form @submit.prevent="submitOrder">
            <input
              type="text"
              v-model="formData.customer.name"
              placeholder="Your Name"
              required
            />
            <input
              type="email"
              v-model="formData.customer.email"
              placeholder="Your Email"
              required
            />
            <input
              type="tel"
              v-model="formData.customer.phone"
              placeholder="Your Phone Number"
              required
            />
            <textarea
              v-model="formData.customer.address"
              placeholder="Your Address"
              required
            ></textarea>
            <input
              type="text"
              v-model="formData.customer.city"
              placeholder="City"
              required
            />
            <input
              type="number"
              v-model="formData.customer.zip"
              placeholder="ZIP Code"
              required
            />
            <input
              type="text"
              v-model="formData.customer.country"
              placeholder="Country"
              required
            />
            <button type="submit" class="submit-button">Submit Order</button>
          </form>
        </div>
        <div v-else class="thank-you-screen">
          <h2>Thank You!</h2>
          <p>Your order has been placed successfully.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: {
      orderData: {
        type: Object,
        required: true,
      },
    },
    data() {
      return {
        orderPlaced: false,
        formData: { ...this.orderData }, // Clone orderData to allow editing
      };
    },
    methods: {
      async submitOrder() {
        try {
          const response = await axios.post(
            "https://api.sneaker-configurator.larslars.be/api/v1/orders",
            this.formData
          );
          if (response.data.status === "success") {
            this.orderPlaced = true;
            this.$emit("orderPlaced"); // Notify parent of successful order
          } else {
            alert("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Error placing order:", error);
          alert("Failed to place order. Please check your details and try again.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 20;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .modal-logo {
    width: 100px;
    margin-bottom: 20px;
  }
  
  form input,
  form textarea,
  .submit-button {
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .submit-button {
    background: black;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }
  
  .thank-you-screen {
    text-align: center;
  }
  </style>