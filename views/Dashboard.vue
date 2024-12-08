<template>
    <div class="dashboard">
      <h1>Admin Dashboard</h1>
      <div class="stats">
        <div class="stat">
          <h2>Total Orders</h2>
          <p>{{ totalOrders }}</p>
        </div>
        <div class="stat">
          <h2>Pending Orders</h2>
          <p>{{ pendingOrders }}</p>
        </div>
      </div>
      <div class="orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id">
              <td>{{ order.id }}</td>
              <td>{{ order.customerName }}</td>
              <td>{{ order.status }}</td>
              <td>
                <button @click="updateOrderStatus(order.id, 'Shipped')">Mark as Shipped</button>
                <button @click="deleteOrder(order.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        totalOrders: 0,
        pendingOrders: 0,
        orders: [],
      };
    },
    mounted() {
      this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        // Fetch orders from the backend
        const response = await fetch("/api/v1/orders");
        const data = await response.json();
        this.orders = data.data;
        this.totalOrders = this.orders.length;
        this.pendingOrders = this.orders.filter(order => order.status === "Pending").length;
      },
      async updateOrderStatus(orderId, status) {
        // Update order status via the backend
        await fetch(`/api/v1/orders/${orderId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        this.fetchOrders(); // Refresh the orders
      },
      async deleteOrder(orderId) {
        // Delete order via the backend
        await fetch(`/api/v1/orders/${orderId}`, { method: "DELETE" });
        this.fetchOrders(); // Refresh the orders
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard {
    padding: 20px;
  }
  .stats {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
  }
  .stat {
    flex: 1;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  .orders table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .orders th,
  .orders td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .orders th {
    background-color: #f4f4f4;
  }
  button {
    padding: 5px 10px;
    margin-right: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #ddd;
  }
  </style>