import { createRouter, createWebHistory } from "vue-router";
import Configurator from "../components/Configurator.vue";
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  { path: "/", component: Configurator, name: "home" },
  { path: "/login", component: LoginForm, name: "login" },
  { path: "/dashboard", component: Dashboard, name: "dashboard" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;