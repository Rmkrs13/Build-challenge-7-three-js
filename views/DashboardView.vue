<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="/logo.png" alt="Swear Logo" class="logo" />
      <h1>Admin Dashboard</h1>
    </header>
    <section class="dashboard-content">
      <div class="orders-section">
        <h2>Orders ({{ orders.length }})</h2>
        <table class="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customer.name }}</td>
              <td>{{ order.status }}</td>
              <td>
                <button @click="viewOrder(order.id)" class="action-button">View</button>
                <button @click="deleteOrder(order.id)" class="delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="password-section">
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword" class="password-form">
          <input type="password" v-model="oldPassword" placeholder="Old Password" required />
          <input type="password" v-model="newPassword" placeholder="New Password" required />
          <button type="submit" class="action-button">Change Password</button>
        </form>
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
      oldPassword: "",
      newPassword: "",
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
        const index = this.orders.findIndex((o) => o.id === updatedOrder.id);
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
        this.orders = this.orders.filter((order) => order.id !== orderId);
        alert("Order deleted successfully!");
      } catch (error) {
        alert("Failed to delete order.");
      }
    },
    async changePassword() {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "https://api.sneaker-configurator.larslars.be/api/v1/auth/change-password",
          { oldPassword: this.oldPassword, newPassword: this.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Password changed successfully!");
      } catch (error) {
        alert("Failed to change password.");
      }
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
</style>