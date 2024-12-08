<template>
  <div>
    <Header />
    <SceneViewer />
    <div class="customizer-section">
      <Customizer />
      <ProgressBar :progress="50" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import SceneViewer from "../components/SceneViewer.vue";
import Customizer from "../components/Customizer.vue";
import ProgressBar from "../components/ProgressBar.vue";

export default {
  components: { Header, Footer, SceneViewer, Customizer, ProgressBar },
};
</script>

<style scoped>
.customizer-section {
  text-align: center;
  margin-top: 20px;
}
</style>