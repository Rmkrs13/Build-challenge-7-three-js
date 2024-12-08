import { createRouter, createWebHistory } from "vue-router";
import HomeView from "/views/HomeView.vue";
import LoginView from "/views/LoginView.vue";
import DashboardView from "/views/DashboardView.vue";
import OrdersView from "/views/OrdersView.vue";
import OrderDetailView from "/views/OrderDetailView.vue";

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
    path: "/orders",
    component: OrdersView,
    meta: { requiresAuth: true },
  },
  {
    path: "/orders/:id",
    component: OrderDetailView,
    meta: { requiresAuth: true },
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