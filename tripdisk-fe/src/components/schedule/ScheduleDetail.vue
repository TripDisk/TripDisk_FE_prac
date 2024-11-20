<template>
  <div>
    <h2>스케줄 디테일</h2>

    <table>
      <tr>
        <th>여행 시작일</th>
        <th>여행 종료일</th>
        <th>여행지</th>
      </tr>
      <tr>
        <td>{{ store.schedule.startDate }}</td>
        <td>{{ store.schedule.endDate }}</td>
        <td>{{ store.schedule.location }}</td>
      </tr>
    </table>

    <RouterLink :to="`/schedule/update`">일정 수정</RouterLink>
    <RouterLink :to="`/post/create`">게시글 등록</RouterLink>
  </div>
</template>

<script setup>
import { useScheduleStore } from "@/stores/schedule.js";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const store = useScheduleStore();

onMounted(() => {
  store.getSchedule(route.params.id);
});
</script>

<style scoped></style>
