<template>
  <div class="signup-container">
    <h2>회원가입</h2>
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" type="text" v-model.trim="username" required/>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" type="email" v-model.trim="email" required />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" type="password" v-model.trim="password" required />
    </div>
    <div class="form-group">
      <label for="profileImg">Profile Image URL</label>
      <input id="profileImg" type="file" @change="onFileChange" />
    </div>
    <button @click.prevent="signup">회원가입</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.js";

const username = ref("");
const email = ref("");
const password = ref("");
const profileImg = ref(null);

const router = useRouter();
const store = useUserStore();

const onFileChange = function(event) {
  const file = event.target.files[0];
  if (file) {
    profileImg.value = file;
  }
};

const signup = function () {
  store.signup(username.value, email.value, password.value, profileImg.value);
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}
input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
