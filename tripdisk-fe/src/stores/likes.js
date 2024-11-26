import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:8080/api/likes`;

export const useLikesStore = defineStore("likes", () => {
  const api = axios.create({
    baseURL: REST_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 좋아요 등록
  const addLike = function (userId, postId) {
    const data = {
      userId: userId,
      postId: postId,
    };
    axios
      .post(`${REST_API_URL}/add`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  // 좋아요 취소
  const deleteLike = function (userId, postId) {
    const data = {
      userId: userId,
      postId: postId,
    };
    axios
      .post(`${REST_API_URL}/delete`, data, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
      });
  };

  // 좋아요 클릭 여부 검사
  const checkLike = function (userId, postId) {
    return axios
      .get(`/check`, {
        params: {
          userId,
          postId,
        },
      })
      .then((res) => {});
  };

  return { addLike, deleteLike, checkLike };
});
