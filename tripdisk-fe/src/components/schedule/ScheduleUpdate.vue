<template>
  <div>
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
  store.updateSchedule();
};
watch(
  () => store.schedule.startDate,
  (newStartDate) => {
    // 시작일이 변경될 때 종료일의 최소값을 설정
    if (newStartDate) {
      store.schedule.endDate = ""; // 시작일이 변경되면 종료일 초기화
    }
  }
);
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #45a049;
}
</style>
