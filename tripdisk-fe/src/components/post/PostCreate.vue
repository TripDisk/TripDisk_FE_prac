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

      <!-- 이미지 갤러리 -->
      <div class="image-gallery">
        <div
          v-for="(image, index) in imageFiles"
          :key="index"
          class="image-wrapper"
        >
          <img :src="image.previewUrl" alt="Uploaded Preview" />
          <button type="button" @click="removeImage(index)" class="remove-btn">
            x
          </button>
        </div>
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
  const files = Array.from(event.target.files);
  const newImages = files.map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file), // 로컬 미리보기 URL 생성
  }));
  imageFiles.value = [...imageFiles.value, ...newImages];
};

// 이미지 삭제 핸들러
const removeImage = (index) => {
  const removed = imageFiles.value.splice(index, 1); // index부터 1개 삭제
  if (removed[0]?.previewUrl) {
    URL.revokeObjectURL(removed[0].previewUrl); // 메모리 해제 (메모리 누수 방지)
  }
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
    imageFiles.value.forEach((image) => {
      formData.append("imageFiles", image.file);
    });

    await store.createPost(formData);
  }
};
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
  width: 95%;
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
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(150px, 1fr)
  ); /* 카드 크기 조정 */
  gap: 20px; /* 카드 간격 */
  margin-top: 20px;
}

.image-wrapper {
  position: relative;
  overflow: hidden; /* 영역을 벗어난 이미지를 숨김 */
  background-color: #f9f9f9; /* 카드 배경색 */
  border: 1px solid #ddd; /* 카드 테두리 */
  border-radius: 10px; /* 카드 모서리 둥글게 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 효과 */
  transition: transform 0.1s ease, box-shadow 0.2s ease; /* 호버 시 애니메이션 */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지 비율 유지하며 카드에 맞춤 */
  border-radius: 10px; /* 이미지 모서리 둥글게 */
}

.remove-btn {
  position: absolute;
  top: 10px; /* 버튼 위치 */
  right: 10px; /* 버튼 위치 */
  background-color: rgba(81, 80, 80, 0.8); /* 투명한 빨간색 배경 */
  color: white;
  border: none;
  border-radius: 50%; /* 원형 버튼 */
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 버튼 그림자 */
  font-size: 16px; /* 버튼 글자 크기 */
  transition: background-color 0.2s ease;
}

.remove-btn:hover {
  background-color: rgb(255, 0, 0); /* 호버 시 배경색 진하게 */
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
  width: 10%;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
  font-weight: bold;
}

.label {
  white-space: nowrap; /* 줄바꿈 방지 */
  display: inline-block; /* 텍스트를 한 줄로 유지 */
}

.checkbox {
  justify-items: flex-start;
}
</style>
