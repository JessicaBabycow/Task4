import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
} from "./constant";
import Axios from "axios";

// Dăng nhập admin
export const actLoginAdmin = (data, history) => {
  return (dispatch) => {
    dispatch(actLoginAdminRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap",
      method: "POST",
      data,
    })
      .then((result) => {
        dispatch(actLoginAdminSuccess(result.data));
        if (result.data.maLoaiNguoiDung === "QuanTri") {
          localStorage.setItem("Admin", JSON.stringify(result.data));
          history.push("/dashboard");
        } else {
          alert("Vui lòng qua trang người dùng để đăng nhập");
        }
      })
      .catch((err) => {
        dispatch(actLoginAdminFailed(err));
        alert("Account or password is incorrect !");
        console.log(err);
      });
  };
};
const actLoginAdminRequest = () => {
  return {
    type: ADMIN_LOGIN_REQUEST,
  };
};
const actLoginAdminSuccess = (data) => {
  return {
    type: ADMIN_LOGIN_SUCCESS,
    payload: data,
  };
};
const actLoginAdminFailed = (err) => {
  return {
    type: ADMIN_LOGIN_FAILED,
    payload: err,
  };
};
