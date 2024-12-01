<template>
  <div class="container">
    <!-- 검색창 -->
    <div class="search-wrapper">
      <!-- 전체 게시글 확인 버튼 -->
      <button @click="viewAllPosts" class="view-all-button">
        전체 게시글 확인
      </button>
      <div class="search-right">
        <!-- 공유한 글만 보기 체크박스 -->
        <label class="checkbox-wrapper">
          <input
            type="checkbox"
            v-model="isSharedOnly"
            @change="filterSharedPosts"
          />
          공유한 글만 보기
        </label>

        <form @submit.prevent="searchPosts">
          <!-- 검색 옵션 -->
          <select v-model="searchKey" class="search-select">
            <option value="all">전체</option>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="place">장소</option>
          </select>

          <!-- 검색창 -->
          <input
            type="text"
            v-model="searchWord"
            class="search-input"
            placeholder="검색어를 입력하세요"
          />

          <!-- 검색 버튼 -->
          <button class="search-button">검색</button>
        </form>
      </div>
    </div>

    <div class="post-detail-wrapper" v-for="post in filteredPosts">
      <!-- 게시글 전체 틀 -->
      <div class="post-detail">
        <!-- 제목과 일정으로 이동하기 -->
        <div class="title-row">
          <h1 class="post-title">{{ post.title }}</h1>
          <RouterLink
            :to="{ name: 'scheduleDetail', params: { id: post.scheduleId } }"
            class="schedule-link"
          >
            일정으로 이동하기
          </RouterLink>
        </div>

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
        <div
          class="image-gallery"
          v-if="post.imageFiles && post.imageFiles.length"
        >
          <div
            v-for="image in post.imageFiles"
            :key="image.fileId"
            class="image-wrapper"
          >
            <img
              v-if="image.fileId"
              :src="`http://localhost:8080${image.fileId}`"
              alt="Post Image"
            />
          </div>
        </div>

        <!-- 좋아요 버튼 -->
        <div class="likes">
          <i
            v-if="post.isLiked"
            class="bi bi-heart-fill"
            @click="removeLike(post.userId, post.postId)"
          ></i>
          <i
            v-else
            class="bi bi-heart"
            @click="toggleLike(post.userId, post.postId)"
          ></i>
          <span>{{ post.likesCount }}</span>
        </div>

        <!-- 공유 여부 -->
        <div class="share-status">
          <span class="label">공유 여부:</span>
          <input type="checkbox" v-model="post.isShared" disabled />
        </div>

        <!-- 버튼 -->
        <div class="button-group">
          <button class="edit-button" @click="updatePost(post.postId)">
            게시글 수정
          </button>
          <button class="delete-button" @click="deletePost(post.postId)">
            게시글 삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { usePostStore } from "@/stores/post";
import { useLikesStore } from "@/stores/likes";
import { useRouter } from "vue-router";
const router = useRouter();
const store = usePostStore();
const likesStore = useLikesStore();

onMounted(() => {
  store.getPosts();
});

const deletePost = function (id) {
  if (confirm("게시글을 삭제하시겠습니까?")) {
    axios.delete(`http://localhost:8080/api/post/${id}`).then(() => {
      router.push({ name: "calendar" });
    });
  }
};

const updatePost = function (id) {
  router.push({ name: "postUpdate", state: { id } });
};

const searchWord = ref("");
const searchKey = ref("all");

// 검색 요청
const searchPosts = function () {
  store.searchPosts(searchKey.value, searchWord.value).then(() => {
    // filterSharedPosts();
  });
};

const viewAllPosts = function () {
  store.getPosts();
};

// 체크박스 변경 시 공유된 게시글만 필터링
// const filtered = ref([]);
const isSharedOnly = ref(false); // 공유 여부 체크박스 상태
// 공유 여부에 따른 필터링
// const filterSharedPosts = () => {
//   if (isSharedOnly.value) {
//     filtered.value = store.posts.filter((post) => post.isShared); // 공유된 게시글만 저장
//   } else {
//     filtered.value = store.posts; // 전체 게시글 복원
//   }
// };

const filteredPosts = computed(() => {
  if (isSharedOnly.value) {
    return store.posts.filter((post) => post.isShared);
  }
  return store.posts;
});

const toggleLike = function (userId, postId) {
  likesStore.addLike(userId, postId);
  const post = store.posts.find((post) => post.postId === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likesCount += 1;
  }
};

const removeLike = function (userId, postId) {
  // liked.value = !liked.value;
  // store.countDownLikes(store.post.postId);
  // console.log("좋아요 개수 : ", store.post.likesCount);
  likesStore.deleteLike(userId, postId);
  const post = store.posts.find((post) => post.postId === postId);
  if (post) {
    post.isLiked = !post.isLiked;
    post.likesCount += -1;
  }
};
</script>

<style scoped>
/* 전체 페이지 틀 */
.container {
  max-width: 900px;
}
.post-detail-wrapper {
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}

/* 검색창 스타일링 */
.search-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 900px;
  width: 100%;
}

.search-right {
  display: flex;
  justify-content: space-between;
}

.checkbox-wrapper {
  display: block; /* 한 줄 전체를 차지하도록 변경 */
  margin-left: 10px; /* 왼쪽 여백 추가 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
  margin-top: 10px; /* 위쪽에 약간 여백 추가 */
  font-size: 1em; /* 텍스트 크기 조정 (필요 시) */
}

.search-wrapper button {
  padding: 8px 12px;
  font-size: 1em;
  background-color: #aa9d9d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px; /* Add rounded corners */
}

.search-wrapper button:hover {
  background-color: #927f7f;
}

/* 전체 게시글 확인 버튼 */
.view-all-button {
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.view-all-button:hover {
  background-color: #218838;
}

/* 검색 옵션, 검색창, 버튼 */
.search-wrapper select,
.search-wrapper .search-input,
.search-wrapper .search-button {
  padding: 8px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.search-wrapper .search-input {
  width: 250px;
}

.search-wrapper .search-button {
  background-color: #aa9d9d;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.search-wrapper .search-button:hover {
  background-color: #927f7f;
}

.search-wrapper select,
.search-wrapper .search-input {
  margin-right: 10px;
}

/* 제목과 일정 이동 링크 */
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.post-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #333;
}

.schedule-link {
  font-size: 1em;
  color: #333;
  text-decoration: none;
}

.schedule-link:hover {
  text-decoration: underline;
}

/* 장소 및 메타 정보 */
.meta-info {
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  gap: 10px;
}

.label {
  font-weight: bold;
  color: #666;
}

.value {
  color: #333;
}

/* 내용 박스 */
.content-box {
  margin-bottom: 20px;
}

.content-item {
  margin-bottom: 10px;
}

p.value {
  margin-top: 5px;
  line-height: 1.6;
  color: #444;
  text-align: justify;
}

/* 이미지 갤러리 */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.image-wrapper img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.image-wrapper img:hover {
  transform: scale(1.05);
}

/* 공유 여부 */
.share-status {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.share-status .label {
  font-weight: bold;
  margin-right: 10px;
  color: #666;
}

/* 버튼 그룹 */
.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  padding: 10px 15px;
  font-size: 1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 5px;
}

.edit-button {
  background-color: #e69a8d;
  color: white;
}

.edit-button:hover {
  background-color: #cc7566;
}

.delete-button {
  background-color: #a26e6a;
  color: white;
}

.delete-button:hover {
  background-color: #663d39;
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
