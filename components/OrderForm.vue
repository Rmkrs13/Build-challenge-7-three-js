<template>
    <div id="order-modal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">X</button>
        <img src="/logo.png" alt="Swear Logo" class="modal-logo" />
  
        <!-- Success Message -->
        <div v-if="orderPlaced" class="success-message">
          <h2>Thank you for your order!</h2>
          <p>Your customized shoes are being prepared. We’ll keep you updated via email.</p>
        </div>
  
        <!-- Order Form -->
        <div v-else>
          <div class="order-overview">
            <h3>Order Overview</h3>
            <p>
              <strong>Shoe Size:</strong>
              <select v-model="orderData.shoeConfig.size" id="size" required>
                <option v-for="size in shoeSizes" :key="size" :value="size">{{ size }}</option>
              </select>
            </p>
            <p>
              <strong>Laces Color:</strong> 
              <span :style="{ backgroundColor: orderData.shoeConfig.colors.laces }" class="color-sample"></span> 
              {{ orderData.shoeConfig.colors.laces }}
            </p>
            <p>
              <strong>Sole Color:</strong> 
              <span :style="{ backgroundColor: orderData.shoeConfig.colors.sole }" class="color-sample"></span> 
              {{ orderData.shoeConfig.colors.sole }}
            </p>
            <p>
              <strong>Inside Color:</strong> 
              <span :style="{ backgroundColor: orderData.shoeConfig.colors.inside }" class="color-sample"></span> 
              {{ orderData.shoeConfig.colors.inside }}
            </p>
          </div>
  
          <form @submit.prevent="submitOrder">
            <input type="text" v-model="orderData.customer.name" placeholder="Full Name" required autocomplete="name" />
            <input type="email" v-model="orderData.customer.email" placeholder="Email Address" required autocomplete="email" />
            <input type="tel" v-model="orderData.customer.phone" placeholder="Phone Number" required autocomplete="tel" />
            <input type="text" v-model="orderData.customer.address" placeholder="Address" required autocomplete="street-address" />
            <input type="text" v-model="orderData.customer.city" placeholder="City" required autocomplete="address-level2" />
            <input type="text" v-model="orderData.customer.zip" placeholder="ZIP Code" required autocomplete="postal-code" />
            <select v-model="orderData.customer.country" required>
              <option disabled value="">Country</option>
              <option v-for="country in countries" :key="country" :value="country">{{ country }}</option>
            </select>
            <button type="submit">€120,00 Pay Now</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    props: ["orderData"],
    data() {
      return {
        orderPlaced: false,
        shoeSizes: Array.from({ length: 21 }, (_, i) => 36 + i), // Sizes 36 to 56
        countries: [
          "United States", "Canada", "United Kingdom", "Germany", "France", 
          "Netherlands", "Belgium", "Australia", "Spain", "Italy", 
          "Sweden", "Norway", "Denmark", "Finland", "Japan",
          "China", "India", "Brazil", "South Africa", "Mexico",
          "Russia", "Poland", "Switzerland", "Austria", "Portugal",
        ], // Add more countries as needed
      };
    },
    methods: {
      async submitOrder() {
        try {
          // Build the request data with hex colors
          const requestData = {
            customer: this.orderData.customer,
            shoeConfig: {
              size: this.orderData.shoeConfig.size,
              colors: {
                laces: this.getHexColor(this.orderData.shoeConfig.colors.laces),
                sole: this.getHexColor(this.orderData.shoeConfig.colors.sole),
                inside: this.getHexColor(this.orderData.shoeConfig.colors.inside),
              },
            },
          };
  
          // Send the order to the API
          await axios.post("https://api.sneaker-configurator.larslars.be/api/v1/orders", requestData);
          this.orderPlaced = true; // Set success state
        } catch (error) {
          console.error("Error submitting order:", error);
          alert("Something went wrong while placing your order. Please try again.");
        }
      },
      closeModal() {
        this.$emit("close");
      },
      getHexColor(color) {
        const colors = {
          red: "#ff0000",
          green: "#00ff00",
          blue: "#0000ff",
          white: "#ffffff",
        };
        return colors[color.toLowerCase()] || color; // Return the hex value or the original value
      },
    },
  };
  </script>
  <style scoped>
  #order-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    text-align: center;
    position: relative;
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .modal-logo {
    width: 120px;
    margin-bottom: 20px;
  }
  
  form input,
  form select {
    width: 80%;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  form button {
    width: 80%;
    padding: 10px;
    background: #000;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    margin-top: 20px;
  }
  
  form button:hover {
    background: #333;
  }
  
  .success-message h2 {
    color: #4caf50;
    margin-bottom: 10px;
  }
  
  .success-message p {
    color: #333;
  }
  
  .color-sample {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid #000;
    margin-left: 10px;
    vertical-align: middle;
  }
  </style>