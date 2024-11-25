<template>
  <div class="schedule-create-wrapper">
    <h2>스케줄 등록</h2>

    <form @submit.prevent="submitSchedule">
      <div class="form-group">
        <label for="startDate">여행 시작일</label>
        <input
          type="date"
          id="startDate"
          v-model="schedule.startDate"
          required
        />
      </div>
      <div class="form-group">
        <label for="endDate">여행 종료일</label>
        <input
          type="date"
          id="endDate"
          v-model="schedule.endDate"
          :min="schedule.startDate"
          required
        />
      </div>
      <div class="form-group">
        <label for="location">여행한 나라</label>
        <input
          type="text"
          id="location"
          v-model="schedule.location"
          placeholder="예: 대한민국, 미국 등"
          required
        />
      </div>
      <button type="submit" class="submit-button">등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useScheduleStore } from "@/stores/schedule.js";
const store = useScheduleStore();

// 폼 데이터 상태 관리
const schedule = ref({
  startDate: "",
  endDate: "",
  location: "",
});

const submitSchedule = () => {
  store.createSchedule(schedule.value);
};

// 시작일 변경 시 종료일 최소값 업데이트
watch(
  () => schedule.value.startDate,
  (newStartDate) => {
    if (newStartDate) {
      schedule.value.endDate = ""; // 시작일이 변경되면 종료일 초기화
    }
  }
);
</script>

<style scoped>
/* 전체 틀 */
.schedule-create-wrapper {
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
