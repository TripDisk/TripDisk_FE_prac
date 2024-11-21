import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const REST_API_URL = `http://localhost:8080`;

export const usePostStore = defineStore("post", () => {
  const post = ref({});

  const getPost = function (id) {
    axios
      .get(`${REST_API_URL}/api-post/post/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        post.value = res.data;
      });
  };

  return { getPost, post };
});
