<template>
  <div class="schedule-detail-wrapper">
    <!-- 일정 정보 섹션 -->
    <div class="schedule-detail">
      <!-- 제목 -->
      <h1 class="schedule-title">{{ store.schedule.location }}</h1>

      <!-- 여행 시작일과 종료일 -->
      <div class="meta-info">
        <div class="info-item">
          <span class="label">여행일 : </span>
          <span class="value"
            >{{ store.schedule.startDate }} ~ {{ store.schedule.endDate }}</span
          >
        </div>
      </div>

      <!-- 버튼 -->
      <div class="button-group">
        <button class="edit-button" @click="updateSchedule">일정 수정</button>
        <button class="delete-button" @click="deleteSchedule">일정 삭제</button>
        <button class="add-post-button" @click="createPost">게시글 등록</button>
      </div>
    </div>

    <!-- 게시글 목록 섹션 -->
    <div class="post-list" v-if="stores.posts.length > 0">
      <!-- 게시글이 있을 때만 표시 -->
      <h2 class="post-list-title">게시글 목록</h2>
      <div class="post-item" v-for="post in stores.posts" :key="post.postId">
        <!-- 제목과 날짜, 장소 -->
        <RouterLink :to="`/post/${post.postId}`"
          ><div class="post-summary">
            <div class="left">
              <h3 class="post-title">
                {{ post.title }}
              </h3>
              <span class="post-place">장소 : {{ post.place }}</span>
            </div>
            <span class="post-date">날짜 : {{ post.date }}</span>
          </div>

          <!-- 공유 여부 -->
          <div class="share-status">
            <span class="label">공유 여부:</span>
            <input type="checkbox" :checked="post.isShared" disabled />
          </div>
          <!-- 좋아요 버튼 -->
          <div class="likes">
            <i v-if="post.isLiked" class="bi bi-heart-fill"></i>
            <i v-else class="bi bi-heart"></i>
            <span>{{ post.likesCount }}</span>
          </div>
        </RouterLink>

        <!-- 버튼 -->
        <div class="post-buttons">
          <button class="edit-button" @click="updatePost(post.postId)">
            수정
          </button>
          <button class="delete-button" @click="deletePost(post.postId)">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useScheduleStore } from "@/stores/schedule.js";
import { usePostStore } from "@/stores/post.js";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = useScheduleStore();
const stores = usePostStore();

onMounted(() => {
  stores.getPostsByScheduleId(route.params.id);
  store.getSchedule(route.params.id);
});

const deleteSchedule = function () {
  if (confirm("일정을 삭제하시겠습니까?")) {
    axios
      .delete(`http://localhost:8080/api-schedule/schedule/${route.params.id}`)
      .then((res) => {
        alert(res.data);
        router.push({ name: "calendar" });
      });
  }
};

const updateSchedule = function () {
  router.push({ name: "scheduleUpdate" });
};

const createPost = function () {
  router.push({
    name: "postCreate",
    params: { id: `${route.params.id}` },
    state: {
      startDate: store.schedule.startDate,
      endDate: store.schedule.endDate,
    },
  });
};

const deletePost = function (id) {
  if (confirm("게시글을 삭제하시겠습니까?")) {
    axios.delete(`http://localhost:8080/api-post/post/${id}`).then(() => {
      stores.getPostsByScheduleId(route.params.id); // 게시글 목록 갱신
    });
  }
};

const updatePost = function (id) {
  router.push({ name: "postUpdate", state: { id } });
};
</script>

<style scoped>
/* 전체 틀 */
.schedule-detail-wrapper {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  font-family: "Arial", sans-serif;
}

/* 일정 정보 */
.schedule-detail {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.schedule-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.meta-info {
  margin-bottom: 10px;
}

.info-item {
  margin-bottom: 5px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  margin-left: 8px;
  color: #333;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.edit-button,
.delete-button,
.add-post-button {
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.edit-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
}

.delete-button:hover {
  background-color: #e53935;
}

.add-post-button {
  background-color: #2196f3;
}

.add-post-button:hover {
  background-color: #1976d2;
}

/* 게시글 목록 */
.post-list {
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-list-title {
  font-size: 1.6em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.post-item {
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
}

.post-item:last-child {
  border-bottom: none;
}

/* 제목과 장소, 날짜 */
.post-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.post-summary .left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.post-date {
  margin-left: auto; /* 날짜를 오른쪽으로 이동 */
  font-size: 0.9em;
  color: #999;
}

/* 버튼 섹션 */
.post-buttons {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px;
}

.post-buttons .edit-button,
.post-buttons .delete-button {
  text-align: center;
  background-color: #4caf50;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

.post-buttons .edit-button:hover {
  background-color: #45a049;
}

.post-buttons .delete-button {
  background-color: #f44336;
}

.post-buttons .delete-button:hover {
  background-color: #e53935;
}

a {
  text-decoration: none; /* 밑줄 제거 */
  color: black;
}

a:hover .post-summary {
  background-color: rgba(211, 211, 211, 0.2);
}
</style>
