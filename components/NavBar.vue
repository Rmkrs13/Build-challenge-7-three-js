<template>
    <nav class="navbar">
      <div class="logo">
        <h1>Sneaker Configurator</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    color: white;
    padding: 15px 20px;
  }
  .nav-links {
    display: flex;
    gap: 20px;
  }
  .nav-links a {
    color: white;
    text-decoration: none;
  }
  </style>