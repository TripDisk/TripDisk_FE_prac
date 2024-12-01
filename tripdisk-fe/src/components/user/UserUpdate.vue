<template>
  <div class="update-container">
    <div class="update-box">
      <h1 class="update-title">회원정보 수정</h1>

      <!-- 유저 이름 -->
      <div class="form-group">
        <label for="username">사용자 이름</label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="사용자 이름을 입력하세요"
        />
      </div>

      <!-- 이메일 (수정 불가) -->
      <div class="form-group">
        <label for="email">이메일</label>
        <input
          id="email"
          type="email"
          :value="userStore.loginUser.email"
          disabled
        />
      </div>

      <!-- 비밀번호 -->
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="새 비밀번호를 입력하세요"
        />
      </div>

      <!-- 프로필 이미지 -->
      <div class="form-group">
        <label for="profileImg">프로필 이미지</label>
        <input id="profileImg" type="file" @change="onFileChange" />
        <div v-if="previewImg" class="profile-preview">
          <img :src="previewImg" alt="Profile Preview" />
        </div>
      </div>

      <!-- 버튼 -->
      <button class="btn-save" @click.prevent="update">저장</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

// 사용자 정보 상태
const username = ref(userStore.loginUser.username); // 기존 이름
const email = ref(userStore.loginUser.email); // 기존 이메일
const password = ref(userStore.loginUser.password); // 새 비밀번호
const profileImg = ref(userStore.loginUser.profileImg); // 프로필 이미지 파일
const previewImg = ref(
  userStore.loginUser.profileImg
    ? `http://localhost:8080/img/${userStore.loginUser.profileImg}`
    : ""
); // 이미지 미리보기

// 파일 선택 핸들러
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileImg.value = file;
    previewImg.value = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
  }
};

// 회원 정보 수정
const update = function () {
  userStore.update(
    userStore.loginUser.userId,
    username.value,
    email.value,
    password.value,
    profileImg.value
  );
};
</script>

<style scoped>
/* 전체 화면 배경 및 레이아웃 */
.update-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  margin: 0;
}

/* 수정 박스 */
.update-box {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 수정 타이틀 */
.update-title {
  font-size: 24px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
}

/* 폼 그룹 */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:disabled {
  background-color: #f5f5f5;
  color: #999999;
}

.form-group input:focus {
  border-color: #fab6b0;
  outline: none;
}

/* 프로필 이미지 미리보기 */
.profile-preview img {
  margin-top: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ddd;
}

/* 버튼 스타일 */
.btn-save {
  width: 100%;
  padding: 10px 15px;
  background-color: #fab6b0;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.btn-save:hover {
  background-color: #ff9d94;
}
</style>
