import { createRouter, createWebHistory } from "vue-router";
import Configurator from "../views/Configurator.vue";
import Login from "../views/Login.vue";

const routes = [
  { path: "/", component: Configurator },
  { path: "/login", component: Login },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;