import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Configurator from '../views/Configurator.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/configurator', name: 'Configurator', component: Configurator },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;