<template>
    <div class="order-view">
      <h1>Order Details</h1>
      <p><strong>ID:</strong> {{ order.id }}</p>
      <p><strong>Customer:</strong> {{ order.customer.name }}</p>
      <p><strong>Status:</strong> {{ order.status }}</p>
      <p>
        <strong>Configuration:</strong>
        <br />
        <strong>Size:</strong> {{ order.shoeConfig.size }}
        <br />
        <strong>Laces:</strong> <span :style="{ backgroundColor: order.shoeConfig.colors.laces }" class="color-sample"></span>
        <strong>Sole:</strong> <span :style="{ backgroundColor: order.shoeConfig.colors.sole }" class="color-sample"></span>
        <strong>Inside:</strong> <span :style="{ backgroundColor: order.shoeConfig.colors.inside }" class="color-sample"></span>
      </p>
      <select v-model="order.status">
        <option value="Pending">Pending</option>
        <option value="In Production">In Production</option>
        <option value="Shipped">Shipped</option>
        <option value="Delivered">Delivered</option>
      </select>
      <button @click="updateOrder" class="action-button">Update</button>
      <button @click="deleteOrder" class="delete-button">Delete</button>
    </div>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    props: ["id"],
    data() {
      return {
        order: null,
      };
    },
    async created() {
      const token = localStorage.getItem("token");
      const response = await axios.get(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.order = response.data.data;
    },
    methods: {
      async updateOrder() {
        const token = localStorage.getItem("token");
        await axios.put(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`, { status: this.order.status }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Order updated!");
      },
      async deleteOrder() {
        const token = localStorage.getItem("token");
        await axios.delete(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${this.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Order deleted!");
        this.$router.push("/dashboard");
      },
    },
  };
  </script>
  <style scoped>
  .order-view {
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  
  .color-sample {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 50%;
    margin-left: 5px;
  }
  
  .action-button {
    background-color: #4caf50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .delete-button {
    background-color: #f44336;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>