<template>
  <div>
    <nav>
      <RouterLink :to="{ name: 'myPost' }">내 게시글</RouterLink> |
      <RouterLink :to="{ name: 'sharedPost' }">공유 게시글</RouterLink>
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
  color: #007bff;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}
</style>
