<template>
  <div class="post-detail-wrapper">
    <!-- 게시글 전체 틀 -->
    <div class="post-detail">
      <!-- 제목 -->
      <h1 class="post-title">{{ store.post.title }}</h1>

      <!-- 날짜와 장소 -->
      <div class="meta-info">
        <div class="info-item">
          <span class="label">날짜:</span>
          <span class="value">{{ store.post.date }}</span>
        </div>
        <div class="info-item">
          <span class="label">장소:</span>
          <span class="value">{{ store.post.place }}</span>
        </div>
      </div>

      <!-- 내용 -->
      <div class="content-box">
        <div class="content-item">
          <span class="label">내용:</span>
          <p class="value">{{ store.post.content }}</p>
        </div>
      </div>

      <!-- 이미지 갤러리 -->
      <div class="image-gallery">
        <div
          v-for="image in store.post.imageFiles"
          :key="image.fileId"
          class="image-wrapper"
        >
          <img :src="`http://localhost:8080${image.fileId}`" alt="Post Image" />
        </div>
      </div>

      <!-- 공유 여부 -->
      <div class="share-status">
        <span class="label">공유 여부:</span>
        <input type="checkbox" v-model="store.post.isShared" disabled />
      </div>

      <!-- 좋아요 버튼 -->
      <div class="likes">
        <i
          v-if="store.post.isLiked"
          class="bi bi-heart-fill"
          @click="removeLike"
        ></i>
        <i v-else class="bi bi-heart" @click="toggleLike"></i>
        <span>{{ store.post.likesCount }}</span>
      </div>

      <!-- 버튼 -->
      <div class="button-group">
        <button class="edit-button" @click="updatePost(store.post.postId)">
          게시글 수정
        </button>
        <button class="delete-button" @click="deletePost">게시글 삭제</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/post.js";
import { useLikesStore } from "@/stores/likes";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = usePostStore();
const likesStore = useLikesStore();

// const liked = ref(false);

onMounted(() => {
  store.getPost(route.params.id);
});

const deletePost = function () {
  if (confirm("게시글을 삭제하시겠습니까?")) {
    axios
      .delete(`http://localhost:8080/api/post/${route.params.id}`)
      .then(() => {
        router.push({ name: "calendar" });
      });
  }
};

const updatePost = function (id) {
  router.push({ name: "postUpdate", state: { id } });
};

const toggleLike = function () {
  // liked.value = !liked.value;
  // console.log("좋아요 uid pid : ", store.post.userId, " ", store.post.postId);
  likesStore.addLike(store.post.userId, store.post.postId);
  store.post.isLiked = !store.post.isLiked;
  store.post.likesCount += 1;
  // store.checkMyLike(store.post.userId, store.post.postId);
};

const removeLike = () => {
  // liked.value = !liked.value;
  // store.countDownLikes(store.post.postId);
  // console.log("좋아요 개수 : ", store.post.likesCount);
  likesStore.deleteLike(store.post.userId, store.post.postId);
  store.post.isLiked = !store.post.isLiked;
  store.post.likesCount -= 1;
  // store.checkMyLike(store.post.userId, store.post.postId);
};
</script>

<style scoped>
/* 전체 틀 */
.post-detail-wrapper {
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
.post-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}

/* 날짜와 장소 */
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

/* 내용 틀 */
.content-box {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content-item p {
  margin-top: 10px;
  color: #555;
}

/* 공유 여부 */
.share-status {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.share-status .label {
  margin-right: 10px;
}

/* 이미지 갤러리 */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* 최소 150px */
  gap: 15px;
  margin-bottom: 20px;
}

.image-wrapper img {
  width: 100%;
  height: auto; /* 높이를 자동으로 설정 */
  object-fit: contain; /* 이미지 비율 유지, 잘리지 않도록 설정 */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  gap: 10px;
}

.edit-button,
.delete-button {
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
.delete-button {
  background-color: #f44336; /* 일정 삭제 버튼 색상 */
}
.edit-button:hover {
  background-color: #45a049;
}
.delete-button:hover {
  background-color: #e53935; /* 호버 색상 */
}
.bi {
  cursor: pointer;
  margin-right: 3px;
}

.bi-heart-fill {
  color: #ed6f63;
}

.likes {
  width: 5%;
  margin: 3px 0;
}
</style>
