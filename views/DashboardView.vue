<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="/logo.png" alt="Swear Logo" class="logo" />
      <h1>Admin Dashboard</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>
    <section class="dashboard-content">
      <div class="orders-section">
        <h2>Orders ({{ orders.length }})</h2>
        <table class="orders-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order._id">
              <td>{{ order.customer.name }}</td>
              <td>{{ order.status }}</td>
              <td>
                <button @click="viewOrder(order._id)" class="action-button">View</button>
                <button @click="deleteOrder(order._id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-if="orders.length === 0" class="empty-state">No orders available.</p>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      orders: [],
      socket: null,
    };
  },
  async created() {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://api.sneaker-configurator.larslars.be/api/v1/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.orders = response.data.data;

      // WebSocket connection
      this.socket = io("https://api.sneaker-configurator.larslars.be", { auth: { token } });
      this.socket.on("new_order", (order) => this.orders.push(order));
      this.socket.on("order_updated", (updatedOrder) => {
        const index = this.orders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) this.orders[index] = updatedOrder;
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
  beforeUnmount() {
    if (this.socket) this.socket.disconnect();
  },
  methods: {
    viewOrder(orderId) {
      this.$router.push(`/order/${orderId}`);
    },
    async deleteOrder(orderId) {
      const token = localStorage.getItem("token");
      try {
        await axios.delete(`https://api.sneaker-configurator.larslars.be/api/v1/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.orders = this.orders.filter((order) => order._id !== orderId);
      } catch (error) {
        console.error("Failed to delete order:", error);
      }
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.dashboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.logo {
  width: 100px;
}

.logout-button {
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #d32f2f;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.orders-table th,
.orders-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.action-button {
  background-color: #4caf50;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.password-form input {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.action-button:hover {
  background-color: #388e3c;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.message {
  margin-top: 10px;
  font-size: 14px;
  color: #333;
}

.empty-state {
  text-align: center;
  font-style: italic;
  margin-top: 20px;
}
</style>