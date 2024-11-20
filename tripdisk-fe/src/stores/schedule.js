import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:8080`;

export const useScheduleStore = defineStore("schedule", () => {
  const schedule = ref({});

  const getSchedule = function (id) {
    axios.get(`${REST_API_URL}/api-schedule/schedule/${id}`).then((res) => {
      schedule.value = res.data;
    });
  };

  return { getSchedule, schedule };
});
