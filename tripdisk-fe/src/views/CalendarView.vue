<template>
  <div>
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
const calendarOptions = reactive({
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
});
</script>

<style>
.fc {
  font-family: Arial, sans-serif;
  /* background-color: #f8f9fa; */
  /* 캘린더 배경색 */
  /* border: 1px solid var(--fc-border-color); */
  /* 테두리 색상 */
  border-radius: 8px;
  padding: 10px;
}

.fc-toolbar.fc-header-toolbar {
  display: flex;
  justify-content: space-between;
  /* 버튼들을 양쪽 끝으로 정렬 */
  align-items: center;
  /* 세로 정렬 */
  flex-wrap: nowrap;
  /* 줄바꿈 방지 */
}

/* 버튼 간 여백 조정 */
.fc-toolbar > div {
  display: flex;
  align-items: center;
  gap: 5px;
  /* 버튼 간격 */
}

/* 헤더 스타일 */
.fc-toolbar {
  background-color: #f8f9fa;
}

#fc-dom-1 {
  font-size: 20px;
  font-weight: lighter;
  color: black;
}

.fc-prev-button,
.fc-next-button,
.fc-prevYear-button,
.fc-nextYear-button {
  background: none !important;
  /* 배경색 제거 */
  border: none !important;
  /* 테두리 제거 */
  color: black !important;
  /* 텍스트 색상 설정 */
  font-size: 16px;
  /* 버튼 크기 조정 */
  padding: 5px;
  /* 여백 조정 */
  cursor: pointer;
  /* 마우스 커서 변경 */
}

.fc-prev-button:hover,
.fc-next-button:hover,
.fc-prevYear-button:hover,
.fc-nextYear-button:hover {
  color: skyblue !important;
  /* 호버 시 색상 변경 */
}

/* 오늘 날짜 강조 */
.fc-day-today {
  background-color: #e8f7ff !important;
  border: 1px solid black;
}

/* 이벤트 스타일 */
.fc-event {
  background-color: skyblue;
  color: black;
  border: none;
  border-radius: 4px;
  padding: 2px 5px;
  font-size: 12px;
  text-align: center;
}

/* 이벤트 dot 스타일 (시간 이벤트용) */
.fc-daygrid-event-dot {
  width: var(--fc-daygrid-event-dot-width);
  height: var(--fc-daygrid-event-dot-width);
  background-color: var(--fc-event-bg-color);
}
</style>
