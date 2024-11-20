import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

export default router;
