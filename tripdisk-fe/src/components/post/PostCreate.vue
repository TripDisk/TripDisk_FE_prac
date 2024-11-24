<template>
  <div class="post-create-wrapper">
    <h2>게시글 등록</h2>

    <form @submit.prevent="submitPost">
      <!-- 제목 -->
      <div class="form-group">
        <label for="title">제목</label>
        <input
          type="text"
          id="title"
          v-model="post.title"
          placeholder="제목을 입력하세요"
          required
        />
      </div>

      <!-- 날짜 -->
      <div class="form-group">
        <label for="date">날짜</label>
        <input
          type="date"
          id="date"
          v-model="post.date"
          :min="stores.schedule.startDate"
          :max="stores.schedule.endDate"
          required
        />
      </div>

      <!-- 장소 -->
      <div class="form-group">
        <label for="place">장소</label>
        <input
          type="text"
          id="place"
          v-model="post.place"
          placeholder="장소를 입력하세요"
          required
        />
      </div>

      <!-- 내용 -->
      <div class="form-group">
        <label for="content">내용</label>
        <textarea
          id="content"
          v-model="post.content"
          placeholder="게시글 내용을 입력하세요"
          required
        ></textarea>
      </div>

      <!-- 이미지 업로드 -->
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

      <button type="submit" class="submit-button">등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { usePostStore } from "@/stores/post.js";
import { useScheduleStore } from "@/stores/schedule.js";
const route = useRoute();

const post = ref({
  title: "",
  date: "",
  place: "",
  content: "",
});
const imageFiles = ref([]);

const store = usePostStore();
const stores = useScheduleStore();

const handleImageUpload = (event) => {
  console.log("이미지");
  imageFiles.value = Array.from(event.target.files);
  console.log(imageFiles.value);
};

const submitPost = async () => {
  if (confirm("게시글을 등록하시겠습니까?")) {
    const formData = new FormData();

    let json = JSON.stringify({
      scheduleId: `${route.params.id}`,
      title: post.value.title,
      date: post.value.date,
      place: post.value.place,
      content: post.value.content,
      isShared: store.post.isShared,
    });
    const blob = new Blob([json], { type: "application/json" });
    formData.append("post", blob);
    // 이미지 파일을 FormData에 추가
    console.log("forEach");
    imageFiles.value.forEach((file) => {
      console.log(file);
      formData.append("imageFiles", file);
    });

    await store.createPost(formData);
  }
};

// const formData = new FormData();
// formData.append("title", post.value.title);
// formData.append("date", post.value.date);
// formData.append("place", post.value.place);
// formData.append("content", post.value.content);

// // 이미지 파일 추가
// post.value.imageFiles.forEach((file) => {
//   formData.append("imageFiles", file);
// });

// const submitPost = function () {
//   store.createPost(formData);
// };
</script>

<style scoped>
/* 전체 틀 */
.post-create-wrapper {
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
