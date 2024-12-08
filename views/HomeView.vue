<template>
  <div class="home">
    <Header />
    <img src="/logo.png" alt="Swear Logo" class="logo" />
    <div class="customizer-section">
      <Customizer />
    </div>
    <Footer />
    <SceneViewer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SceneViewer from "../components/SceneViewer.vue";
import Customizer from "../components/Customizer.vue";

export default {
  components: { Header, Footer, SceneViewer, Customizer },
};
</script>

<style scoped>
.home {
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.logo {
  position: fixed;
  top: 80px; /* Below the header */
  left: 50%;
  transform: translateX(-50%);
  width: 180px; /* Increased size for better visibility */
  z-index: 10;
}

.customizer-section {
  position: fixed;
  bottom: 100px; /* Above the footer */
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}
</style>