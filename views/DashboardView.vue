<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <img src="/logo.png" alt="Swear Logo" class="logo" />
      <h1>Admin Dashboard</h1>
      <button @click="logout" class="logout-button">Logout</button>
    </header>
    <section class="dashboard-content">
      <!-- Orders Section -->
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

      <!-- Password Change Section -->
      <div class="password-section">
        <h2>Change Password</h2>
        <form @submit.prevent="changePassword" class="password-form">
          <input
            type="password"
            v-model="oldPassword"
            placeholder="Old Password"
            required
            autocomplete="current-password"
          />
          <input
            type="password"
            v-model="newPassword"
            placeholder="New Password"
            required
            autocomplete="new-password"
          />
          <button type="submit" class="action-button">Change Password</button>
        </form>
        <p v-if="passwordMessage" :class="{ error: passwordError, success: !passwordError }">
          {{ passwordMessage }}
        </p>
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
      passwordMessage: "",
      passwordError: false,
      socket: null,
    };
  },
  async created() {
    const token = localStorage.getItem("token");

    try {
      // Fetch initial orders
      const response = await axios.get("https://api.sneaker-configurator.larslars.be/api/v1/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.orders = response.data.data;

      // Set up WebSocket connection
      this.socket = io("https://api.sneaker-configurator.larslars.be", {
        auth: { token },
        transports: ["websocket"], // Ensure proper WebSocket transport
      });

      // Listen for new orders
      this.socket.on("new_order", (order) => {
        this.orders.push(order);
      });

      // Listen for updated orders
      this.socket.on("order_updated", (updatedOrder) => {
        const index = this.orders.findIndex((o) => o._id === updatedOrder._id);
        if (index !== -1) {
          this.$set(this.orders, index, updatedOrder);
        }
      });
    } catch (error) {
      console.error("Error fetching orders or setting up WebSocket:", error);
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
    async changePassword() {
      const token = localStorage.getItem("token");
      try {
        await axios.post(
          "https://api.sneaker-configurator.larslars.be/api/v1/auth/change-password",
          { oldPassword: this.oldPassword, newPassword: this.newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        this.passwordMessage = "Password changed successfully.";
        this.passwordError = false;
        this.oldPassword = "";
        this.newPassword = "";
      } catch (error) {
        this.passwordMessage =
          error.response?.data?.message === "Old password is incorrect"
            ? "Old password is incorrect."
            : "Failed to change password. Please try again.";
        this.passwordError = true;
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

.message {
  margin-top: 10px;
  font-size: 14px;
  padding: 8px;
  border-radius: 4px;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.empty-state {
  text-align: center;
  font-style: italic;
  margin-top: 20px;
}

</style>