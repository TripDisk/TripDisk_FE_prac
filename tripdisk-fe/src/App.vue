<template>
  <div>
    <TheHeaderNav />
    <RouterView />
  </div>
</template>

<script setup>
import TheHeaderNav from "./components/common/TheHeaderNav.vue";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

onMounted(() => {
  userStore.session(); // 앱 초기화 시 세션 확인
});
</script>

<style scoped>
div {
  width: 900px;
  margin: auto;
}
</style>
