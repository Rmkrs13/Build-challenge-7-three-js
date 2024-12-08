<template>
    <div id="dashboard">
      <header>
        <h1>Welcome to the Admin Dashboard</h1>
        <button @click="logout">Logout</button>
      </header>
      <div class="content">
        <p>Manage orders and settings here.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem("token");
        this.$router.push("/login");
      },
    },
  };
  </script>
  
  <style scoped>
  #dashboard {
    padding: 20px;
  }
  
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #000;
    color: #fff;
    padding: 10px;
    border-radius: 4px;
  }
  
  button {
    padding: 5px 10px;
    background: #fff;
    color: #000;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  
  button:hover {
    background: #f0f0f0;
  }
  
  .content {
    margin-top: 20px;
  }
  </style>