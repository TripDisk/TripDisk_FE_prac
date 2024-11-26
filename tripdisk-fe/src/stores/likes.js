import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:8080/api-likes`;

export const useLikesStore = defineStore("likes", () => {
  const api = axios.create({
    baseURL: REST_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 좋아요 등록
  const addLike = async (userId, postId) => {
    try {
      console.log("likes.js : ", "좋아요 등록 시작");
      console.log(userId, postId);
      const response = await api.post(`/add`, {
        userId,
        postId,
      });
    } catch (error) {
      console.log(err.response.data);
    }
  };

  // 좋아요 취소
  const deleteLike = async (userId, postId) => {
    try {
      const response = await api.post(`/delete`, {
        userId,
        postId,
      });
    } catch (error) {
      console.log(err.response.data);
    }
  };

  // 좋아요 클릭 여부 검사
  const checkLike = async (userId, postId) => {
    let result;
    await api
      .get(`/check`, {
        params: {
          userId,
          postId,
        },
      })
      .then((res) => {
        result = res.data;
      });
    return result;
  };

  return { addLike, deleteLike, checkLike };
});
