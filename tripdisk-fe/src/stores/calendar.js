import { ref, computed, onMounted } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:8080`;

export const useCalendarStore = defineStore(
  "calendar",
  () => {
    const schedules = ref([]);
    const posts = ref([]);

    const getSchedules = function () {
      return axios
        .get(`${REST_API_URL}/api-schedule/schedule`)
        .then((res) => {
          // console.log("schedule res : ", res);
          schedules.value = res.data.map((schedule) => ({
            id: schedule.scheduleId,
            title: schedule.location,
            start: schedule.startDate, // 자동으로 자정으로 설정
            end: `${schedule.endDate}T23:59:59`, // 23:59:59으로 설정
            extendedProps: {
              type: "schedule",
              no: schedule.scheduleId,
            },
          }));
        })
        .catch(() => {
          console.log("getSchedules 실패");
        });
    };

    const getPosts = function () {
      return axios
        .get(`${REST_API_URL}/api-post/post`)
        .then((res) => {
          // console.log("post res : ", res);
          posts.value = res.data.map((post) => ({
            id: post.postId,
            title: post.place,
            date: post.date,
            extendedProps: {
              content: post.content,
              type: "post",
              no: post.postId,
            },
          }));
        })
        .catch(() => {
          console.log("getPosts 실패");
        });
    };

    const total = ref([]);

    const combine = () => {
      console.log("COMBINE");
      total.value = [...schedules.value, ...posts.value];
      console.log(total.value);
    };

    return { getSchedules, getPosts, schedules, posts, combine, total };
  },
  {
    persist: true, // 상태를 저장하고 유지하려면 persist 설정
  }
);
