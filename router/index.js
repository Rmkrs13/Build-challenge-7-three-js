import { createRouter, createWebHistory } from 'vue-router';
import Customizer from '../components/Customizer.vue';
import LoginForm from '../components/LoginForm.vue';
import Dashboard from '../components/Dashboard.vue';

const routes = [
  { path: '/', component: Customizer, name: 'home' },
  { path: '/login', component: LoginForm, name: 'login' },
  { path: '/dashboard', component: Dashboard, name: 'dashboard' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;