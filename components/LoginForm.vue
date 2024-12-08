<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 class="text-2xl font-bold text-center mb-4">Admin Login</h2>
        <form @submit.prevent="handleLogin">
          <shadcn-input
            label="Username"
            type="text"
            v-model="username"
            placeholder="Enter your username"
            required
            class="mb-4"
          />
          <shadcn-input
            label="Password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
            class="mb-4"
          />
          <shadcn-button type="submit" class="w-full">Login</shadcn-button>
        </form>
        <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        error: null,
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await fetch("https://api.sneaker-configurator.larslars.be/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: this.username, password: this.password }),
          });
          const result = await response.json();
  
          if (response.ok) {
            localStorage.setItem("token", result.token);
            this.$router.push("/dashboard");
          } else {
            this.error = result.message;
          }
        } catch (err) {
          this.error = "Something went wrong. Please try again.";
        }
      },
    },
  };
  </script>