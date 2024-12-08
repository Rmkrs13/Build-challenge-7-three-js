<template>
  <div id="app">
    <header>
      <a href="#">
        <img src="./public/logo.png" alt="Swear">
      </a>
    </header>
    <main>
      <Customizer />
    </main>
    <footer>
      <p>&copy; 2024 by SWEAR London | Web by Lars Raeymaekers</p>
    </footer>
  </div>
</template>

<script>
import Customizer from './components/Customizer.vue';

export default {
  name: 'App',
  components: {
    Customizer,
  },
};
</script>

<style>
/* Basis styling voor de pagina */
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

header {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  text-align: center;
  background-color: #69ff47;
}

header h1 {
  margin: 0;
  font-size: 1.8rem;
}

main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

footer p {
  margin: 0;
  background-color: #69ff47
}
</style>