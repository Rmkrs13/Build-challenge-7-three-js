<template>
    <div class="orders">
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.id }}</td>
            <td>{{ order.customer.name }}</td>
            <td>
              <select v-model="order.status" @change="updateStatus(order)">
                <option value="Pending">Pending</option>
                <option value="In Production">In Production</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
            <td>
              <button @click="viewOrder(order.id)">View</button>
              <button @click="deleteOrder(order.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        orders: [],
      };
    },
    async created() {
      try {
        const response = await axios.get(
          "https://api.sneaker-configurator.larslars.be/api/v1/orders",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        this.orders = response.data.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    },
    methods: {
      async updateStatus(order) {
        try {
          await axios.put(
            `https://api.sneaker-configurator.larslars.be/api/v1/orders/${order.id}`,
            { status: order.status },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          alert("Order status updated successfully.");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      },
      async deleteOrder(orderId) {
        try {
          await axios.delete(
            `https://api.sneaker-configurator.larslars.be/api/v1/orders/${orderId}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          this.orders = this.orders.filter((order) => order.id !== orderId);
          alert("Order deleted successfully.");
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      },
      viewOrder(orderId) {
        this.$router.push(`/orders/${orderId}`);
      },
    },
  };
  </script>
  
  <style scoped>
  .orders {
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  button {
    margin-right: 5px;
  }
  </style>