import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/views/HomeView.vue";
import LoginView from "/views/LoginView.vue";
import DashboardView from "/views/DashboardView.vue";

const routes = [
  {
    path: "/",
    component: HomeView, // Default route for all users
  },
  {
    path: "/login",
    component: LoginView, // Login route
  },
  {
    path: "/dashboard",
    component: DashboardView, // Dashboard route
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token"); // Check for authentication token
      if (!token) {
        next("/login"); // Redirect to login if no token is present
      } else {
        next(); // Allow access to dashboard
      }
    },
  },
  {
    path: "/:pathMatch(.*)*", // Catch-all route for unknown paths
    redirect: "/",
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});