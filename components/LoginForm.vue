<template>
  <form @submit.prevent="handleLogin" class="login-form">
    <h1>Login</h1>
    <div class="input-group">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text" required />
    </div>
    <div class="input-group">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password" required />
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      // Handle login functionality here
      console.log("Logging in with:", this.username, this.password);
    },
  },
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  max-width: 300px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.input-group {
  display: flex;
  flex-direction: column;
}
button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>