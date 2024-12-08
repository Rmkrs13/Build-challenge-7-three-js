<template>
    <div class="login-container">
      <img src="/logo.png" alt="Logo" class="login-logo" />
      <form @submit.prevent="handleLogin" class="login-form">
        <input
          type="email"
          v-model="email"
          placeholder="Email Address"
          required
          autocomplete="email"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
          autocomplete="current-password"
        />
        <button type="submit">Log In</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    name: "LoginView",
    data() {
      return {
        email: "",
        password: "",
        errorMessage: null,
      };
    },
    methods: {
      async handleLogin() {
        try {
          const response = await axios.post(
            "https://api.sneaker-configurator.larslars.be/api/v1/auth/login",
            {
              email: this.email, // Use "email" as required by the API
              password: this.password, // Use "password" as required by the API
            }
          );
  
          if (response.data.status === "success") {
            localStorage.setItem("token", response.data.token); // Save token
            this.$router.push("/dashboard"); // Redirect to dashboard
          } else {
            this.errorMessage = "Login failed. Please try again.";
          }
        } catch (error) {
          this.errorMessage =
            error.response?.data?.message || "Something went wrong. Please try again.";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .login-logo {
    width: 150px;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    width: 90%;
    max-width: 400px;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
  
  .login-form input {
    margin-bottom: 15px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .login-form button {
    padding: 10px;
    background-color: #000;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
  }
  
  .login-form button:hover {
    background-color: #333;
  }
  
  .error-message {
    margin-top: 10px;
    color: red;
    font-size: 14px;
  }
  </style>