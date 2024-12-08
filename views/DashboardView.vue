<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <nav>
      <router-link to="/orders">View Orders</router-link>
    </nav>
    <div class="stats">
      <p><strong>Total Orders:</strong> {{ totalOrders }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      totalOrders: 0,
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
      this.totalOrders = response.data.data.length;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

nav {
  margin-bottom: 20px;
}

nav a {
  text-decoration: none;
  color: blue;
  font-weight: bold;
}

.stats {
  margin-top: 20px;
}
</style>