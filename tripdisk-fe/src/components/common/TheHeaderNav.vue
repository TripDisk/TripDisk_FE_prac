<template>
  <div>
    <nav>
      <div
        class="user-menu"
        v-if="userStore.loginUser.username"
        @mouseenter="toggleDropdown(true)"
        @mouseleave="toggleDropdown(false)"
      >
        <!-- 프로필 사진 -->
        <img
          :src="`http://localhost:8080/img/${userStore.loginUser.profileImg}`"
          alt="프로필 이미지"
          class="profile-img"
        />

        <!-- 유저 버튼 -->
        <button class="user-button">
          {{ userStore.loginUser.username }}님
        </button>
        <div v-if="isDropdownVisible" class="dropdown-menu">
          <ul>
            <li @click="mypage">마이페이지</li>
            <li @click="logout">로그아웃</li>
            <li @click="signout">회원탈퇴</li>
            <li @click="update">회원정보 수정</li>
          </ul>
        </div>
      </div>

      <img
        :src="`http://localhost:8080/img/background.png`"
        alt="로고 이미지"
        class="logo-img"
        @click="goToCalendar"
      />
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const isDropdownVisible = ref(false); // 드롭다운 메뉴 상태

const toggleDropdown = (visible) => {
  isDropdownVisible.value = visible;
};

const logout = function () {
  const check = confirm("로그아웃 하시겠습니까?");
  if (check) {
    toggleDropdown(false);
    userStore.logout();
  }
};

const signout = function () {
  const check = confirm("회원 탈퇴를 하시겠습니까?");
  if (check) {
    toggleDropdown(false);
    userStore.signout();
  }
};

const update = function () {
  const check = confirm("회원 정보를 수정하시겠습니까?");
  if (check) {
    toggleDropdown(false);
    router.push({ name: "update" });
  }
};

const goToCalendar = function () {
  router.push({ name: "calendar" });
};

const mypage = function () {
  router.push("/myPage");
  toggleDropdown(false);
};
</script>

<style scoped>
nav {
  display: flex; /* 플렉스 박스 레이아웃으로 변경 */
  justify-content: flex-start; /* 내부 컨텐츠를 좌측 정렬 */
  align-items: center; /* 수직 방향으로 가운데 정렬 */
  padding: 30px 0px;
  /* 네비게이션 바에 여백 추가 */
  position: relative; /* 드롭다운 메뉴 배치를 위한 상대 위치 */
}

.user-menu {
  position: relative;
  align-items: center; /* 수직 방향으로 가운데 정렬 */
  display: flex;
}

/* 프로필 이미지 스타일 */
.profile-img {
  width: 40px;
  height: 40px;
  border-radius: 50%; /* 원 모양으로 설정 */
  object-fit: cover; /* 이미지 크기에 맞게 자르기 */
  margin-right: 10px; /* 이미지와 버튼 간격 */
  border: 1px solid #ddd; /* 테두리 추가 */
}

.logo-img {
  height: 100px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: auto;
  cursor: pointer;
}

.user-button {
  background-color: #fad0c9;
  color: #6e6e6d;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.user-button:hover {
  background-color: #daa39a;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 150px;
  margin-top: 0px;
  padding: 0;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-menu li {
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  color: #333;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-menu li:hover {
  background-color: #f5f5f5;
  color: #ff6a6aad;
}

/* 링크 스타일
nav a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
