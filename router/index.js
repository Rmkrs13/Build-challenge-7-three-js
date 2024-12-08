<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import Configurator from "../components/Configurator.vue";
import LoginForm from "../components/LoginForm.vue";
import Dashboard from "../components/Dashboard.vue";

const routes = [
  { path: "/", component: Configurator, name: "home" },
  { path: "/login", component: LoginForm, name: "login" },
  { path: "/dashboard", component: Dashboard, name: "dashboard" },
=======
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Configurator from '../views/Configurator.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/configurator', name: 'Configurator', component: Configurator },
>>>>>>> parent of 44619cd (Cleaning out file sytem)
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;