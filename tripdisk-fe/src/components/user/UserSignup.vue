<template>
  <div class="signup-container">
    <div class="signup-box">
      <h1 class="signup-title">회원가입</h1>
      <form @submit.prevent="signup">
        <!-- 사용자 이름 -->
        <div class="form-group">
          <label for="username">사용자 이름</label>
          <input
            id="username"
            type="text"
            v-model.trim="username"
            placeholder="사용자 이름을 입력하세요"
            required
          />
        </div>

        <!-- 이메일 -->
        <div class="form-group">
          <label for="email">이메일</label>
          <input
            id="email"
            type="email"
            v-model.trim="email"
            placeholder="example@domain.com"
            required
          />
        </div>

        <!-- 비밀번호 -->
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            type="password"
            v-model.trim="password"
            placeholder="비밀번호를 입력하세요"
            required
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

        <!-- 회원가입 버튼 -->
        <button class="btn-signup">회원가입</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const username = ref("");
const email = ref("");
const password = ref("");
const profileImg = ref(null);
const previewImg = ref(null);

const router = useRouter();
const store = useUserStore();

const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileImg.value = file;
    previewImg.value = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
  }
};

const signup = () => {
  store.signup(username.value, email.value, password.value, profileImg.value);
};
</script>

<style scoped>
/* 전체 화면 배경 및 레이아웃 */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  margin: 0;
}

/* 회원가입 박스 */
.signup-box {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 회원가입 타이틀 */
.signup-title {
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

.form-group input:focus {
  border-color: #42b983;
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
.btn-signup {
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

.btn-signup:hover {
  background-color: #ff9d94;
}
</style>
