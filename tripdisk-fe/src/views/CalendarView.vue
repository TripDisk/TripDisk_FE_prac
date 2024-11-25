<template>
  <div class="container">
    <FullCalendar :options="calendarOptions">
      <!-- 안하면 자동으로 title만 들어감 -->
      <template v-slot:eventContent="arg">
        <div>
          <b>{{ arg.event.title }}</b>
          <!-- <p>{{ arg.event.start.toLocaleDateString() }}</p> -->
          <!-- <b>{{ arg.event.extendedProps.content }}</b> -->
        </div>
      </template>
    </FullCalendar>
  </div>
</template>

<script setup>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { reactive, ref, onMounted, watch } from "vue";
import { useCalendarStore } from "@/stores/calendar";
import { useRouter } from "vue-router";
import "@/style/calendar.css";
const router = useRouter();
const store = useCalendarStore();

const handleEventClick = function (arg) {
  const id = arg.event.extendedProps.no;
  const eventType = arg.event.extendedProps.type;
  // alert("게시글을 등록! " + arg.dateStr);
  if (eventType === "schedule") {
    router.push({ name: "scheduleDetail", params: { id } });
  } else if (eventType === "post") {
    router.push({ name: "postDetail", params: { id } });
  } else {
    alert("알 수 없는 이벤트 타입입니다.");
  }
};
const handleDateClick = function (arg) {
  alert("일정을 등록! " + arg.dateStr);
  router.push({ name: "scheduleCreate", state: { startDate: arg.dateStr } });
};
// store.total 데이터가 변경될 때마다 calendarOptions의 events를 갱신
watch(
  () => store.total, // 감시할 데이터
  (newTotal) => {
    // 데이터가 변경될 때 실행할 콜백 함수
    calendarOptions.value.events = newTotal;
  }
);

store
  .getSchedules()
  .then(() => {
    console.log("then1 sch : ", store.schedules);
    return store.getPosts();
  })
  .then(() => {
    console.log("then2 sch : ", store.schedules);
    console.log("then2 po : ", store.posts);
    store.combine();
  })
  .then(() => {
    console.log("TOTAL", store.total);
  });

// options api -> composition api
const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    start: "",
    center: "prevYear prev title next nextYear",
    end: "today",
  },
  eventClick: handleEventClick,
  dateClick: handleDateClick,
  events: store.total,
  handleWindowResize: true,
});
</script>
