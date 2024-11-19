import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CalenderView from "@/views/CalenderView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      // component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalenderView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
