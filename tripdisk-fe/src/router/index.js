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
      path: "/schedule:id",
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
      path: "/post/create",
      name: "postCreate",
      component: PostCreate,
    },
    {
      path: "/post:id",
      name: "postDetail",
      component: PostDetail,
    },
    {
      path: "/post/update",
      name: "postUpdate",
      component: PostUpdate,
    },
  ],
});

export default router;
