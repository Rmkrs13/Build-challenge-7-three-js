<template>
    <div class="login-page">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <input type="text" placeholder="Username" v-model="username" />
        <input type="password" placeholder="Password" v-model="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      handleLogin() {
        // Handle login logic here
        console.log('Logging in with:', this.username, this.password);
      },
    },
  };
  </script>
  
  <style>
  .login-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  button {
    padding: 10px 20px;
  }
  </style>