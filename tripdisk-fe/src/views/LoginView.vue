<template>
  <div class="box">
    <div class="email">
      <span>E-Mail</span>
      <input type="text" v-model.trim="email" />
    </div>

    <div class="password">
      <span>PW</span>
      <input type="text" v-model.trim="password" />
    </div>

    <button @click.prevent="login">로그인</button>
    <button>회원가입</button>
  </div>

  <button @click="session">세션 받아오기</button>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const store = useUserStore();

const email = ref("");
const password = ref("");

const login = function () {
  store.login(email.value, password.value);
  email.value = "";
  password.value = "";
};

const session = function() {
  store.session();
}

</script>

<style scoped></style>
