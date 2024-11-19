import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:9999/api/user`;

export const useUserStore = defineStore("user", () => {
  const loginUser = ref(null);

  const login = function (email, password) {
    console.log(email);
    console.log(password);
    axios
      .post(`${REST_API_URL}/login`, { email, password })
      .then((response) => {
        console.log(response);
        router.push({ name: "calender" });
      })
      .catch((error) => {
        console.log(error);
        router.push({ name: "login" });
      });
  };

  // const userLogin = function (id, password) {
  //   axios
  //     .post(`${REST_API_URL}/login`, {
  //       id,
  //       password: password,
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       sessionStorage.setItem("access-token", res.data["access-token"]);

  //       const token = res.data["access-token"].split(".");
  //       const name = JSON.parse(atob(token[1]))["name"];

  //       loginUser.value = name;

  //       router.push({ name: "boardList" });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       router.push({ name: "home" });
  //     });
  // };

  return { loginUser, login };
});
