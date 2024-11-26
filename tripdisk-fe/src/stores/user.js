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
    api
      .post(`/login`, { email, password })
      .then((response) => {
        session();
        router.push({ name: "calendar" });
      })
      .catch((error) => {
        alert(error.response.data);
        loginUser.value = { username: "" };
        router.push({ name: "login" });
      });
  };

  // 세션 정보 확인 기능
  const session = async function () {
    try {
      const response = await api.get(`/current`);
      loginUser.value = response.data;
      router.push({ name: "calendar" });
    } catch (error) {
      loginUser.value = { username: "" };
    }
  };

  // 회원가입 기능
  const signup = async (username, email, password, profileImg) => {
    try {
      const formData = new FormData(); // FormData 객체 생성
      formData.append("username", username); // 텍스트 데이터 추가
      formData.append("email", email);
      formData.append("password", password);
      if (profileImg) {
        formData.append("profileImg", profileImg); // 파일 데이터 추가
      }

      const response = await api.post(`/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data); // 서버의 성공 메시지 표시
      router.push({ name: "login" }); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
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
        alert(response.data);
        loginUser.value = { username: "" };
        router.push({ name: "login" });
      })
      .catch((error) => {
        alert(error.response.data);
        loginUser.value = { username: "" };
        router.push({ name: "login" });
      });
  };

  // 회원 정보 수정 기능
  const update = async (userId, username, email, password, profileImg) => {
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("email", email);
      formData.append("username", username);
      formData.append("password", password); // 비밀번호가 빈 값일 경우 기존 값 유지
      if (profileImg) {
        formData.append("profileImg", profileImg);
      }

      const response = await api.patch(`/update/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("회원정보가 수정되었습니다.");

      api.post(`/logout`);
      // api.post(`/login`, { email, password });
      login(email, password);

      // loginUser.value = {
      //   ...loginUser.value,
      //   username: username,
      //   password: password,
      //   profileImg: profileImg,
      // };

      console.log("UPDATE USER", loginUser.value);
    } catch (error) {
      alert("회원정보 수정에 실패했습니다.");
    }
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

  return { loginUser, login, session, signup, logout, signout, update };
});
