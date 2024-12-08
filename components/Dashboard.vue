<template>
    <div class="min-h-screen bg-gray-50">
      <nav class="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 class="text-xl font-bold">Dashboard</h1>
        <shadcn-button @click="logout" class="bg-red-500 text-white">Logout</shadcn-button>
      </nav>
      <main class="p-8">
        <h2 class="text-2xl font-semibold mb-4">Live Orders</h2>
        <ul>
          <li
            v-for="order in orders"
            :key="order.id"
            class="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <p><strong>Customer:</strong> {{ order.customer.name }}</p>
            <p><strong>Status:</strong> {{ order.status }}</p>
            <shadcn-button @click="markShipped(order.id)" class="bg-green-500 text-white mt-2">
              Mark as Shipped
            </shadcn-button>
          </li>
        </ul>
      </main>
    </div>
  </template>
  
  <script>
  import { io } from "socket.io-client";
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    mounted() {
      this.fetchOrders();
      const socket = io("https://api.sneaker-configurator.larslars.be");
      socket.on("newOrder", (order) => {
        this.orders.push(order);
      });
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await fetch("https://api.sneaker-configurator.larslars.be/api/v1/orders", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          const result = await response.json();
          if (response.ok) {
            this.orders = result.data;
          }
        } catch (err) {
          console.error("Failed to fetch orders", err);
        }
      },
      async markShipped(orderId) {
        try {
          const response = await fetch(
            `https://api.sneaker-configurator.larslars.be/api/v1/orders/${orderId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: "Shipped" }),
            }
          );
          if (response.ok) {
            this.orders = this.orders.map((order) =>
              order.id === orderId ? { ...order, status: "Shipped" } : order
            );
          }
        } catch (err) {
          console.error("Failed to update order status", err);
        }
      },
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
  };
  </script>