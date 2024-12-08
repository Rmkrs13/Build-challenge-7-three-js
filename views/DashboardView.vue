<template>
  <div>
    <chakra-heading size="lg" mb="5">Dashboard</chakra-heading>
    <chakra-stack spacing="6">
      <!-- Summary Cards -->
      <chakra-box borderWidth="1px" borderRadius="lg" p="5" bg="gray.50">
        <chakra-heading size="md">Total Orders</chakra-heading>
        <chakra-text fontSize="2xl" fontWeight="bold">{{ totalOrders }}</chakra-text>
      </chakra-box>

      <chakra-box borderWidth="1px" borderRadius="lg" p="5" bg="gray.50">
        <chakra-heading size="md">Pending Orders</chakra-heading>
        <chakra-text fontSize="2xl" fontWeight="bold">{{ pendingOrders }}</chakra-text>
      </chakra-box>

      <chakra-box borderWidth="1px" borderRadius="lg" p="5" bg="gray.50">
        <chakra-heading size="md">Shipped Orders</chakra-heading>
        <chakra-text fontSize="2xl" fontWeight="bold">{{ shippedOrders }}</chakra-text>
      </chakra-box>

      <!-- Navigation -->
      <chakra-button size="lg" colorScheme="teal" width="100%" @click="goToOrders">
        Manage Orders
      </chakra-button>
    </chakra-stack>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      totalOrders: 0,
      pendingOrders: 0,
      shippedOrders: 0,
    }
  },
  methods: {
    async fetchOrderStats() {
      try {
        const response = await axios.get('https://api.sneaker-configurator.larslars.be/api/v1/orders', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        const orders = response.data.data
        this.totalOrders = orders.length
        this.pendingOrders = orders.filter(order => order.status === 'Pending').length
        this.shippedOrders = orders.filter(order => order.status === 'Shipped').length
      } catch (error) {
        console.error('Error fetching order stats:', error)
      }
    },
    goToOrders() {
      this.$router.push('/orders')
    },
  },
  created() {
    this.fetchOrderStats()
  },
}
</script>

<style scoped>
/* Add additional styling if necessary */
</style>