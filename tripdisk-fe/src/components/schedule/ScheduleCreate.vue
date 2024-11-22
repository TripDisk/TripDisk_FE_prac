<template>
  <div>
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
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useScheduleStore } from "@/stores/schedule.js";
const route = useRoute();
const store = useScheduleStore();

// 폼 데이터 상태 관리
const schedule = ref({
  startDate: history.state.startDate,
  endDate: "",
  location: "",
});
const submitSchedule = () => {
  store.createSchedule(schedule.value);
};

watch(
  () => schedule.value.startDate,
  (newStartDate) => {
    // 시작일이 변경될 때 종료일의 최소값을 설정
    if (newStartDate) {
      schedule.value.endDate = ""; // 시작일이 변경되면 종료일 초기화
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
