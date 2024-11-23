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
          <button
            type="button"
            @click="removeImage(image)"
            class="remove-image-btn"
          >
            x
          </button>
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

      <!-- 공유 여부 체크 박스 -->
      <div class="share-status">
        <span class="label">공유 여부:</span>
        <input class="checkbox" type="checkbox" v-model="store.post.isShared" />
      </div>

      <button type="submit" class="submit-button">수정</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { usePostStore } from "@/stores/post.js";
import { useScheduleStore } from "@/stores/schedule.js";

const route = useRoute();
const router = useRouter();

const store = usePostStore();

onMounted(() => {
  store.getPost(history.state.id);
});

// 기존 이미지 삭제
const removeImage = (image) => {
  store.post.imageFiles = store.post.imageFiles.filter(
    (img) => img.fileId !== image.fileId
  );
  console.log(store.post.imageFiles);
};

// 새 이미지 업로드 처리
const stores = useScheduleStore();

const handleImageUpload = (event) => {
  store.post.imageFiles = Array.from(event.target.files);
  console.log(store.post.imageFiles);
};

// 수정 폼 제출
const submitUpdate = async () => {
  const formData = new FormData();

  let json = JSON.stringify({
    title: store.post.title,
    scheduleId: store.post.scheduleId,
    date: store.post.date,
    place: store.post.place,
    content: store.post.content,
    isShared: store.post.isShared,
  });
  const blob = new Blob([json], { type: "application/json" });
  formData.append("post", blob);

  // 새로운 이미지와 삭제된 이미지를 반영
  store.post.imageFiles.forEach((file) => {
    formData.append("imageFiles", file);
  });
  console.log("수정:", formData.imageFiles);
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

.image-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.image-wrapper {
  position: relative;
  display: inline-block;
}

.remove-image-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}

.remove-image-btn:hover {
  background-color: #f44336;
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

/* 공유 여부 섹션 */
.share-status {
  display: flex;
  align-items: center;
  gap: 8px; 
  margin-bottom: 15px; 
}

.label {
  white-space: nowrap; /* 줄바꿈 방지 */
  display: inline-block; /* 텍스트를 한 줄로 유지 */
}

.checkbox {

  justify-items: flex-start;
}

</style>
