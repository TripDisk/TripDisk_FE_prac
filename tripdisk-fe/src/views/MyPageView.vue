<template>
  <div>
    <nav>
      <RouterLink
        :to="{ name: 'myPost' }"
        :class="{ active: $route.name === 'myPost' }"
        >내 게시글</RouterLink
      >
      |
      <RouterLink
        :to="{ name: 'sharedPost' }"
        :class="{ active: $route.name === 'sharedPost' }"
        >공유 게시글</RouterLink
      >
    </nav>
    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped>
/* nav 스타일 */
nav {
  margin-bottom: 20px; /* 상단 여백을 조정 */
  padding: 10px 0;
  text-align: center;
  font-size: 1.2em;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #757575;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

/* 활성화된 링크 스타일 */
nav a.active {
  color: #000; /* 검정색으로 변경 */
}
</style>
