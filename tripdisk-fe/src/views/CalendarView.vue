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
import { reactive, ref, onMounted } from "vue";
import { useCalendarStore } from "@/stores/calendar";
import { useRouter } from "vue-router";
import "@/style/calendar.css";
const router = useRouter();

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
  router.push({ name: "scheduleCreate" });
};

const store = useCalendarStore();

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
    // let tmp = [];
    // for (let i = 0; i < store.total.length; i++) {
    //   let schedule = {
    //     id: i + 1,
    //     title: store.total[i].title,
    //     extendedProps: { content: store.total[i].content },
    //   };
    //   if (!!store.total[i].date) {
    //     (schedule.date = store.total[i].date),
    //       (schedule.extendedProps.type = "post"),
    //       (schedule.extendedProps.no = store.total[i].postId);
    //   } else {
    //     schedule.start = store.total[i].start; // 자동으로 자정으로 설정
    //     schedule.end = store.total[i].end; // 23:59:59으로 설정
    //     (schedule.extendedProps.type = "schedule"),
    //       (schedule.extendedProps.no = store.total[i].scheduleId);
    //   }
    //   tmp.push(schedule);
    // }
    // console.log("달력에 넣을래", tmp);
    // calendarOptions.events = tmp;
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
