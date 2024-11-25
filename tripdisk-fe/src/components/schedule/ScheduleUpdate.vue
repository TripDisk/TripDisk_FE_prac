<template>
  <div class="schedule-update-wrapper">
    <h2>일정 수정</h2>

    <form @submit.prevent="submitUpdate">
      <div class="form-group">
        <label for="startDate">여행 시작일</label>
        <input
          type="date"
          id="startDate"
          v-model="store.schedule.startDate"
          required
        />
      </div>

      <div class="form-group">
        <label for="endDate">여행 종료일</label>
        <input
          type="date"
          id="endDate"
          v-model="store.schedule.endDate"
          :min="store.schedule.startDate"
          required
        />
      </div>

      <div class="form-group">
        <label for="location">여행한 나라</label>
        <input
          type="text"
          id="location"
          v-model="store.schedule.location"
          placeholder="예: 대한민국, 미국 등"
          required
        />
      </div>

      <button type="submit" class="submit-button">수정</button>
    </form>
  </div>
</template>

<script setup>
import { useScheduleStore } from "@/stores/schedule.js";
import { watch } from "vue";

const store = useScheduleStore();

const submitUpdate = function () {
  if (confirm("일정을 수정하시겠습니까?")) {
    store.updateSchedule();
  }
};

watch(
  () => store.schedule.startDate,
  (newStartDate) => {
    if (newStartDate) {
      store.schedule.endDate = "";
    }
  }
);
</script>

<style scoped>
/* 전체 틀 */
.schedule-update-wrapper {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

/* 제목 */
h2 {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

/* 폼 그룹 */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

/* 버튼 */
.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
  margin-top: 20px;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
