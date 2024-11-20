<!--<template>
  <div class="box">
    <div class="email">
      <span>Email</span>
      <input type="text" v-model.trim="email" />
    </div>

    <div class="password">
      <span>PW</span>
      <input type="text" v-model.trim="password" />
    </div>

    <button @click.prevent="login">로그인</button>
    <button @click="goToSignup">회원가입</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

// 로그인
const login = function () {
  store.login(email.value, password.value);
  email.value = "";
  password.value = "";
};

// 회원가입
const goToSignup = function () {
  router.push({ name: "signup" });
};
</script>

<style scoped></style>-->

<template>
  <div class="login-container">
    <div class="login-box">
      <h1 class="login-title">로그인</h1>

      <div class="form-group">
        <label for="email">이메일</label>
        <input
          id="email"
          type="email"
          v-model.trim="email"
          placeholder="example@domain.com"
        />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          v-model.trim="password"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button class="btn-login" @click.prevent="login">로그인</button>
      <button class="btn-signup" @click="goToSignup">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

const email = ref("");
const password = ref("");

// 로그인
const login = function () {
  store.login(email.value, password.value);
  email.value = "";
  password.value = "";
};

// 회원가입
const goToSignup = function () {
  router.push({ name: "signup" });
};
</script>

<style scoped>
/* 전체 화면 배경 및 레이아웃 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f8f9fa;
  margin: 0;
}

/* 로그인 박스 */
.login-box {
  width: 100%;
  max-width: 400px;
  background: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 로그인 타이틀 */
.login-title {
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

/* 버튼 스타일 */
.btn-login {
  width: 100%;
  padding: 10px 15px;
  background-color: #42b983;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.btn-login:hover {
  background-color: #359d74;
}

.btn-signup {
  width: 100%;
  padding: 10px 15px;
  background-color: #ffffff;
  color: #42b983;
  border: 1px solid #42b983;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-signup:hover {
  background-color: #42b983;
  color: #ffffff;
}
</style>
