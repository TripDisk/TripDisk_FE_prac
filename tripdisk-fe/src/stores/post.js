import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:8080`;

export const usePostStore = defineStore("post", () => {
  const post = ref({});
  const posts = ref([]);

  // 조회
  const getPost = function (id) {
    axios
      .get(`${REST_API_URL}/api-post/post/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        post.value = res.data;
      });
  };

  // 스케줄id도 게시글 조회
  const getPostsByScheduleId = function (id) {
    axios
      .get(`${REST_API_URL}/api-post/${id}/post`, {
        withCredentials: true,
      })
      .then((res) => {
        posts.value = res.data;
      });
  };

  // 등록
  const createPost = function (data) {
    axios
      .post(`${REST_API_URL}/api-post/post`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        const { message, postId } = res.data;
        alert(message);
        if (postId) {
          router.push({ name: "postDetail", params: { id: postId } });
        }
      });
  };

  // 수정
  const updatePost = function (postId, data) {
    axios
      .patch(`${REST_API_URL}/api-post/post/${postId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log("1 : ", postId);
        if (postId) {
          router.push({ name: "postDetail", params: { id: postId } });
        }
      });
  };

  return { getPost, getPostsByScheduleId, createPost, updatePost, post, posts };
});
