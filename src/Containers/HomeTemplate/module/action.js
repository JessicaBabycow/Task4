import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from "./constant";
import Axios from "axios";

// Dăng nhập người dùng
export const actLogin = (data) => {
  return (dispatch) => {
    dispatch(actLoginRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data,
    })
      .then((result) => {
        dispatch(actLoginSuccess(result.data));
        if (result.data.maLoaiNguoiDung === "KhachHang") {
          localStorage.setItem("User", JSON.stringify(result.data));
        } else {
          alert("Vui lòng qua trang Admin để đăng nhập");
        }
      })
      .catch((err) => {
        dispatch(actLoginFailed(err));
        alert("Account or password is incorrect !");
      });
  };
};
const actLoginRequest = () => {
  return {
    type: USER_LOGIN_REQUEST,
  };
};
const actLoginSuccess = (data) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: data,
  };
};
const actLoginFailed = (err) => {
  return {
    type: USER_LOGIN_FAILED,
    payload: err,
  };
};
