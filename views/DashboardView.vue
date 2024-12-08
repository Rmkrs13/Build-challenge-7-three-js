<template>
    <div class="dashboard">
      <header class="dashboard-header">
        <img src="/logo.png" alt="Logo" class="dashboard-logo" />
        <h1>Dashboard</h1>
        <button @click="logout">Log Out</button>
      </header>
  
      <div class="order-summary">
        <h2>Total Orders: {{ totalOrders }}</h2>
      </div>
  
      <div class="orders-list">
        <h3>Orders</h3>
        <ul>
          <li v-for="order in orders" :key="order.id" class="order-item">
            <div>
              <p><strong>Order ID:</strong> {{ order.id }}</p>
              <p><strong>Customer:</strong> {{ order.customer.name }}</p>
              <p><strong>Status:</strong> {{ order.status }}</p>
              <button @click="changeStatus(order.id, 'In Production')">
                Mark as In Production
              </button>
              <button @click="changeStatus(order.id, 'Shipped')">Mark as Shipped</button>
              <button @click="deleteOrder(order.id)">Delete Order</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { io } from "socket.io-client";
  
  export default {
    data() {
      return {
        orders: [],
        totalOrders: 0,
        socket: null,
      };
    },
    async created() {
      this.fetchOrders();
  
      // Initialize WebSocket connection
      this.socket = io("https://api.sneaker-configurator.larslars.be");
      this.socket.on("new_order", (order) => {
        this.orders.push(order);
        this.totalOrders++;
      });
      this.socket.on("order_updated", (updatedOrder) => {
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
        if (index !== -1) {
          this.orders[index].status = updatedOrder.status;
        }
      });
    },
    methods: {
      async fetchOrders() {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("https://api.sneaker-configurator.larslars.be/api/v1/orders", {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.orders = response.data.data;
          this.totalOrders = this.orders.length;
        } catch (error) {
          console.error("Error fetching orders:", error);
          alert("Failed to fetch orders. Please try again.");
        }
      },
      async changeStatus(orderId, status) {
        try {
          const token = localStorage.getItem("token");
          await axios.put(
            `https://api.sneaker-configurator.larslars.be/api/v1/orders/${orderId}`,
            { status },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert("Order status updated.");
        } catch (error) {
          console.error("Error updating order status:", error);
          alert("Failed to update order status.");
        }
      },
      async deleteOrder(orderId) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          this.orders = this.orders.filter((order) => order.id !== orderId);
          this.totalOrders--;
          alert("Order deleted.");
        } catch (error) {
          console.error("Error deleting order:", error);
          alert("Failed to delete order.");
        }
      },
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
    beforeUnmount() {
      if (this.socket) {
        this.socket.disconnect();
      }
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dashboard-logo {
    width: 100px;
  }
  
  .order-summary {
    margin-top: 20px;
  }
  
  .orders-list {
    margin-top: 20px;
  }
  
  .order-item {
    background: #f9f9f9;
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
  }
  
  .order-item button {
    margin: 5px;
  }
  </style>