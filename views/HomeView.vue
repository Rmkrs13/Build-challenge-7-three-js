<template>
  <div class="home">
    <Header />
    <img src="/logo.png" alt="Swear Logo" class="logo" />
    <SceneViewer />
    <div class="customizer-section">
      <Customizer />
    </div>
    <Footer />
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
  display: flex;
  flex-direction: column;
}

.logo {
  position: relative;
  margin: 10px auto;
  display: block;
  width: 120px; /* Increased size */
}
.customizer-section {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 5;
}
</style>