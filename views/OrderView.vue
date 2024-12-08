<template>
    <div class="order-view">
      <h1>Order Details</h1>
      <div class="order-details">
        <p><strong>Customer:</strong> {{ order.customer.name }}</p>
        <p><strong>Status:</strong> {{ order.status }}</p>
        <p>
          <strong>Configuration:</strong><br />
          <strong>Size:</strong> {{ order.shoeConfig.size }}<br />
          <strong>Laces:</strong>
          <span :style="{ backgroundColor: order.shoeConfig.colors.laces }" class="color-sample"></span><br />
          <strong>Sole:</strong>
          <span :style="{ backgroundColor: order.shoeConfig.colors.sole }" class="color-sample"></span><br />
          <strong>Inside:</strong>
          <span :style="{ backgroundColor: order.shoeConfig.colors.inside }" class="color-sample"></span>
        </p>
      </div>
      <div class="order-actions">
        <select v-model="order.status" class="status-dropdown">
          <option value="Pending">Pending</option>
          <option value="In Production">In Production</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <button @click="updateOrder" class="action-button">Update Status</button>
        <button @click="deleteOrder" class="delete-button">Delete Order</button>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["id"],
    data() {
      return {
        order: null,
        message: "",
      };
    },
    async created() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.order = response.data.data;
      } catch (error) {
        this.message = "Failed to fetch order details.";
      }
    },
    methods: {
      async updateOrder() {
        const token = localStorage.getItem("token");
        try {
          await axios.put(
            `https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`,
            { status: this.order.status },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          this.message = "Order status updated successfully.";
        } catch (error) {
          this.message = "Failed to update order status.";
        }
      },
      async deleteOrder() {
        const token = localStorage.getItem("token");
        try {
          await axios.delete(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.message = "Order deleted successfully.";
          setTimeout(() => this.$router.push("/dashboard"), 1000);
        } catch (error) {
          this.message = "Failed to delete order.";
        }
      },
    },
  };
  </script>

  <style scoped>
  .order-view {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .order-details {
    margin-bottom: 20px;
  }
  
  .color-sample {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    margin-left: 5px;
  }
  
  .order-actions {
    margin-top: 20px;
  }
  
  .status-dropdown {
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .action-button,
  .delete-button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .action-button {
    background-color: #4caf50;
    color: white;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
  }
  
  .message {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
  }
  
  .action-button:hover {
    background-color: #388e3c;
  }
  
  .delete-button:hover {
    background-color: #d32f2f;
  }
  </style>