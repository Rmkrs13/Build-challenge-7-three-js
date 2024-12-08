import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/views/HomeView.vue";
import LoginView from "/views/LoginView.vue";
import DashboardView from "/views/DashboardView.vue";
import OrderView from "/views/OrderView.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
  },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: "/order/:id",
    component: OrderView,
    meta: { requiresAuth: true },
    props: true, // Pass the route params as props to the component
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Route Guard to check for authentication
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    next("/login");
  } else {
    next();
  }
});

export default router;