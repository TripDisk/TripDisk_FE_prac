<template>
  <div>
    <h2>포스트 디테일</h2>

    <table>
      <tr>
        <th>날짜</th>
        <th>장소</th>
        <th>제목</th>
        <th>내용</th>
        <th>공유 여부</th>
      </tr>
      <tr>
        <td>{{ store.post.date }}</td>
        <td>{{ store.post.place }}</td>
        <td>{{ store.post.title }}</td>
        <td>{{ store.post.content }}</td>
        <td>{{ store.post.isShared }}</td>
      </tr>
    </table>

    <RouterLink :to="`/post/update`">게시글 수정</RouterLink>
  </div>
</template>

<script setup>
import { usePostStore } from "@/stores/post.js";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const store = usePostStore();

onMounted(() => {
  store.getPost(route.params.id);
});
</script>

<style scoped></style>
