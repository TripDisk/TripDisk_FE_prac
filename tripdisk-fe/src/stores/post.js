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
        console.log(res.data);
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
          // location.href = `/post/${postId}`;
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
        alert(res.data);
        if (postId) {
          router.push({ name: "postDetail", params: { id: postId } });
        }
      });
  };

  // 좋아요 카운트 증가
  const countUpLikes = function (postId) {
    axios
      .post(`${REST_API_URL}/api-post/likes/countup/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        post.value.likesCount += 1;
      });
  };

  // 좋아요 카운트 감소
  const countDownLikes = function (postId) {
    axios
      .post(`${REST_API_URL}/api-post/likes/countdown/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        post.value.likesCount -= 1;
      });
  };

  return {
    getPost,
    getPostsByScheduleId,
    createPost,
    updatePost,
    post,
    posts,
    countUpLikes,
    countDownLikes,
  };
});
