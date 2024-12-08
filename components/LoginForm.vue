<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="p-8 bg-white rounded-lg shadow-md max-w-sm w-full">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input
            id="username"
            type="text"
            v-model="username"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            class="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          class="w-full p-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      console.log("Login attempted:", this.username, this.password);
      // Implement your authentication logic here
    },
  },
};
</script>