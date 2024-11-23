<template>
  <div class="schedule-detail-wrapper">
    <!-- 스케줄 전체 틀 -->
    <div class="schedule-detail">
      <!-- 제목 -->
      <h1 class="schedule-title">{{ store.schedule.location }} 일정</h1>

      <!-- 여행 시작일과 종료일 -->
      <div class="meta-info">
        <div class="info-item">
          <span class="label">여행 시작일:</span>
          <span class="value">{{ store.schedule.startDate }}</span>
        </div>
        <div class="info-item">
          <span class="label">여행 종료일:</span>
          <span class="value">{{ store.schedule.endDate }}</span>
        </div>
      </div>

      <!-- 여행지 -->
      <div class="location-box">
        <div class="location-item">
          <span class="label">여행지:</span>
          <span class="value">{{ store.schedule.location }}</span>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="button-group">
        <button class="edit-button" @click="updateSchedule">일정 수정</button>
        <button class="delete-button" @click="deleteSchedule">일정 삭제</button>
        <button class="add-post-button" @click="createPost">게시글 등록</button>
      </div>
    </div>

    <div class="post-detail-wrapper">
      <!-- 게시글 전체 틀 -->
      <div class="post-detail" v-for="post in stores.posts">
        <!-- 제목 -->
        <h1 class="post-title">{{ post.title }}</h1>

        <!-- 날짜와 장소 -->
        <div class="meta-info">
          <div class="info-item">
            <span class="label">날짜:</span>
            <span class="value">{{ post.date }}</span>
          </div>
          <div class="info-item">
            <span class="label">장소:</span>
            <span class="value">{{ post.place }}</span>
          </div>
        </div>

        <!-- 내용 -->
        <div class="content-box">
          <div class="content-item">
            <span class="label">내용:</span>
            <p class="value">{{ post.content }}</p>
          </div>
        </div>

        <!-- 이미지 갤러리 -->
        <div class="image-gallery">
          <div
            v-for="image in post.imageFiles"
            :key="image.fileId"
            class="image-wrapper"
          >
            <img
              :src="`http://localhost:8080${image.fileId}`"
              alt="Post Image"
            />
          </div>
        </div>

        <!-- 공유 여부 -->
        <div class="share-status">
          <span class="label">공유 여부:</span>
          <input type="checkbox" v-model="post.isShared" disabled />
        </div>

        <!-- 버튼 -->
        <div class="button-group">
          <button class="edit-button" @click="updatePost">게시글 수정</button>
          <button class="delete-button" @click="deletePost(post.postId)">
            게시글 삭제
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
  axios
    .delete(`http://localhost:8080/api-schedule/schedule/${route.params.id}`)
    .then(() => {
      router.push({ name: "calendar" });
    });
};

const updateSchedule = function () {
  router.push({ name: "scheduleUpdate" });
};

//////////
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
  axios.delete(`http://localhost:8080/api-post/post/${id}`).then(() => {
    router.push({ name: "calendar" });
  });
};

const updatePost = function () {
  router.push({ name: "postUpdate" });
};
</script>

<style scoped>
/* 전체 틀 */
.schedule-detail-wrapper {
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
.schedule-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

/* 여행 시작일과 종료일 */
.meta-info {
  margin-bottom: 20px;
}

.info-item {
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  color: #555;
}

.value {
  margin-left: 8px;
  color: #333;
}

/* 여행지 정보 */
.location-box {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.location-item {
  margin-top: 10px;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px;
}

.edit-button,
.delete-button,
.add-post-button {
  display: inline-block;
  text-align: center;
  background-color: #4caf50;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

.add-post-button {
  background-color: #2196f3;
}
.delete-button {
  background-color: #f44336; /* 일정 삭제 버튼 색상 */
}
.edit-button:hover {
  background-color: #45a049;
}
.delete-button:hover {
  background-color: #e53935; /* 호버 색상 */
}
.add-post-button:hover {
  background-color: #1976d2;
}
</style>
