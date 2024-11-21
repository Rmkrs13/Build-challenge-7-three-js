<template>
    <div id="app">
      <header>
        <h1>Sneaker Customizer</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Shop</a></li>
            <li><a href="#">Customize</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <ShoeCustomizer />
      </main>
      <footer>
        <p>&copy; 2024 Sneaker Customizer Store</p>
      </footer>
    </div>
  </template>
  
  <script>
  import ShoeCustomizer from './components/ShoeCustomizer.vue';
  
  export default {
    components: {
      ShoeCustomizer,
    },
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background-color: #f9f9f9;
  }
  
  header {
    background-color: #333;
    color: white;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  header h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  
  header nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }
  
  header nav ul li {
    margin: 0 10px;
  }
  
  header nav ul li a {
    color: white;
    text-decoration: none;
    font-weight: bold;
  }
  
  footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  </style>  