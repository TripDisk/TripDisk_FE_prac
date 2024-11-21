import { createRouter, createWebHistory } from "vue-router";
import CalendarView from "@/views/CalendarView.vue";
import LoginView from "@/views/LoginView.vue";

import ScheduleCreate from "@/components/schedule/ScheduleCreate.vue";
import ScheduleDetail from "@/components/schedule/ScheduleDetail.vue";
import ScheduleList from "@/components/schedule/ScheduleList.vue";
import ScheduleUpdate from "@/components/schedule/ScheduleUpdate.vue";
import PostCreate from "@/components/post/PostCreate.vue";
import PostDetail from "@/components/post/PostDetail.vue";
import PostList from "@/components/post/PostList.vue";
import PostUpdate from "@/components/post/PostUpdate.vue";
import UserSignup from "@/components/user/UserSignup.vue";
import { useUserStore } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login", // 기본 경로를 로그인 화면으로 설정
    },
    {
      path: "/calendar",
      name: "calendar",
      component: CalendarView,
      meta: { requiresAuth: true }, // 인증이 필요한 경로로 설정
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/schedule",
      name: "schedule",
      component: ScheduleList,
    },
    {
      path: "/schedule/create",
      name: "scheduleCreate",
      component: ScheduleCreate,
    },
    {
      path: "/schedule/:id",
      name: "scheduleDetail",
      component: ScheduleDetail,
    },
    {
      path: "/schedule/update",
      name: "scheduleUpdate",
      component: ScheduleUpdate,
    },
    {
      path: "/post",
      name: "post",
      component: PostList,
    },
    {
      path: "/:id/post/create",
      name: "postCreate",
      component: PostCreate,
    },
    {
      path: "/post/:id",
      name: "postDetail",
      component: PostDetail,
    },
    {
      path: "/post/update",
      name: "postUpdate",
      component: PostUpdate,
    },
    {
      path: "/signup",
      name: "signup",
      component: UserSignup,
    },
  ],
});

// Navigation Guard 설정
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const isAuthenticated = !!userStore.loginUser.username; // 로그인 여부 확인

  console.log(to);
  console.log(next);

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 인증이 필요한 페이지인데 로그인이 안 되어 있으면
    next({ name: "login" });
  } else if (to.name === "login" && isAuthenticated) {
    // 로그인 상태에서 로그인 페이지로 접근하면 달력으로 리다이렉트
    next({ name: "calendar" });
  } else {
    next(); // 그 외에는 정상 진행
  }
});

export default router;
