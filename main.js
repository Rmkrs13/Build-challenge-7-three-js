import { createApp } from 'vue';
import App from './App.vue'; // Zorg dat App.vue bestaat in de src-map

// Monteer de Vue-app op het #app element in index.html
createApp(App).mount('#app');