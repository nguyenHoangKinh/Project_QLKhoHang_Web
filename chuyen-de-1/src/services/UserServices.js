import axios from "axios";
import { BASE_URL } from "../config";
import { useState } from "react";

const LoginUserToken = (username,password) =>{
  axios
  .post(BASE_URL+"/auth/login", {
    username: username,
    password: password,
  })
  .then((response) => {
    if (response.data) {
      // alert("dang nhap thanh cong")
      console.log(response.data.others);
      const token = response.data.accessToken;
      localStorage.setItem("jsonwebtoken", token);
      window.location.href = "/HomeScreen";
    }
  })
  .catch((error) => {
    console.log(error.data.message);
    alert("Dang nhap that bai");
  });
};
const Logout = (token) => {
  console.log("category: ", token);
  axios
    .get(BASE_URL + "/auth/logout", {
      headers: {
        token: token,
      },
    })
    .then((res) => {
      if (res) {
        localStorage.removeItem("jsonwebtoken");
        window.location.href = "/login";
      }
    }).catch((error) => {
        console.log(error.res.message);
      });
};
export { Logout,LoginUserToken };
