<template>
  <div class="post-update-wrapper">
    <h2>게시글 수정</h2>

    <form @submit.prevent="submitUpdate">
      <!-- 제목 -->
      <div class="form-group">
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          v-model="store.post.title"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <!-- 날짜 -->
      <div class="form-group">
        <label for="date">날짜</label>
        <input type="date" id="date" v-model="store.post.date" required />
      </div>

      <!-- 장소 -->
      <div class="form-group">
        <label for="place">장소</label>
        <input
          type="text"
          id="place"
          v-model="store.post.place"
          placeholder="장소를 입력하세요"
          required
        />
      </div>

      <!-- 내용 -->
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="store.post.content"
          placeholder="게시글 내용을 입력하세요"
          required
        ></textarea>
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

      <!-- 이미지 새로 업로드 -->
      <div class="form-group">
        <label for="imageFiles">이미지 업로드</label>
        <input
          type="file"
          id="imageFiles"
          multiple
          @change="handleImageUpload"
        />
      </div>

      <button type="submit" class="submit-button">수정</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/post.js";

const route = useRoute();
const router = useRouter();

const store = usePostStore();
onMounted(() => {
  store.getPost(history.state.id);
});
const handleImageUpload = (event) => {
  store.post.imageFiles = Array.from(event.target.files);
};

const submitUpdate = async () => {
  const formData = new FormData();

  let json = JSON.stringify({
    title: store.post.title,
    scheduleId: store.post.scheduleId,
    date: store.post.date,
    place: store.post.place,
    content: store.post.content,
  });
  const blob = new Blob([json], { type: "application/json" });
  formData.append("post", blob);
  store.post.imageFiles.forEach((file) => {
    formData.append("imageFiles", file);
  });

  const postId = store.post.postId;
  await store.updatePost(postId, formData);
};
</script>

<style scoped>
/* 전체 틀 */
.post-update-wrapper {
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

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 5px;
}

textarea {
  min-height: 100px;
}

/* 이미지 파일 업로드 */
input[type="file"] {
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

<!-- gitflow practice -->
