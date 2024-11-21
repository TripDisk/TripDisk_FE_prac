import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:8080`;

export const useScheduleStore = defineStore("schedule", () => {
  const schedule = ref({});

  const getSchedule = function (id) {
    axios
      .get(`${REST_API_URL}/api-schedule/schedule/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        schedule.value = res.data;
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
          router.push({ name: "login" });
        } else if (error.response.status === 403) {
          alert("해당 일정에 접근 권한이 없습니다.");
        } else if (error.response.status === 404) {
          alert("요청한 일정이 없습니다.");
        } else {
          console.error("일정 요청 오류");
        }
      });
  };

  return { getSchedule, schedule };
});
