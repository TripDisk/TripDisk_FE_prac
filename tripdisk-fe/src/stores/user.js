import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
import router from "@/router";

const REST_API_URL = `http://localhost:8080/api/user`;

export const useUserStore = defineStore("user", () => {
  const loginUser = ref({ username: "" });

  const api = axios.create({
    baseURL: REST_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  // 로그인 기능
  const login = function (email, password) {
    console.log(email);
    console.log(password);

    api
      .post(`/login`, { email, password })
      .then((response) => {
        console.log(response.data);
        session();
        console.log(loginUser.value);
        router.push({ name: "calendar" });
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
        loginUser.value = { username: "" };
        router.push({ name: "login" });
      });
  };

  // 세션 정보 확인 기능
  const session = async function () {
    try {
      const response = await api.get(`/current`);
      console.log(response.data);
      loginUser.value = response.data;
      // console.log(loginUser.value.username);
      router.push({ name: "calendar" });
    } catch (error) {
      console.log("여기로 왔니?");
      console.log(error.response.data);
      loginUser.value = { username: "" };
    }
  };

  // 회원가입 기능
  const signup = async (username, email, password, profileImg) => {
    try {
      const response = await api.post(`/signup`, {
        username,
        email,
        password,
        profileImg,
      });
      alert(response.data); // 서버의 성공 메시지 표시
      router.push({ name: "login" }); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      console.error(error.response.data); // 에러 메시지 출력
      alert("회원가입에 실패했습니다!");
    }
  };

  // 로그아웃 기능
  const logout = async () => {
    try {
      const response = await api.post(`/logout`);
      alert(response.data);
      loginUser.value = { username: "" };
      await router.push({ name: "login" });
    } catch (error) {
      console.log(error.response.data);
      alert(error.response.data);
      loginUser.value = { username: "" };
      router.push({ name: "login" });
    }
  };

  // 회원 탈퇴 기능
  const signout = function () {
    api
      .delete(`/signout`)
      .then((response) => {
        console.log(response.data);
        alert(response.data);
        loginUser.value = { username: "" };
        router.push({ name: "login" });
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data);
        loginUser.value = { username: "" };
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

  return { loginUser, login, session, signup, logout, signout };
});
