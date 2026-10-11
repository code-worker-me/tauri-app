import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "../stores/auth.store.js";

import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView, meta: { guestOnly: true } },
  { path: "/register", component: RegisterView, meta: { guestOnly: true } },
  { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true } },
  { path: "/products", component: ProductsView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to) => {
  const auth = useAuthStore();

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: "/login" };
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { path: "/dashboard" };
  }
});

export default router;
