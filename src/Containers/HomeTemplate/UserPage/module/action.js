import {
  USER_INFORMATION_REQUEST,
  USER_INFORMATION_SUCCESS,
  USER_INFORMATION_FAILED,
  USER_INFORMATION_UPDATE_REQUEST,
  USER_INFORMATION_UPDATE_SUCCESS,
  USER_INFORMATION_UPDATE_FAILED,
} from "./constant";
import Axios from "axios";

// Lấy thông tin người dùng
export const actUserInformationApi = (taiKhoan) => {
  return (dispatch) => {
    dispatch(actUserInformationRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
      data: taiKhoan,
    })
      .then((result) => {
        dispatch(actUserInformationSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actUserInformationFailed(err));
      });
  };
};
const actUserInformationRequest = () => {
  return {
    type: USER_INFORMATION_REQUEST,
  };
};
const actUserInformationSuccess = (data) => {
  return {
    type: USER_INFORMATION_SUCCESS,
    payload: data,
  };
};
const actUserInformationFailed = (err) => {
  return {
    type: USER_INFORMATION_FAILED,
    payload: err,
  };
};

// Cập nhật thông tin người dùng
export const actUserInformationUpdateApi = (data) => {
  const accessToken = JSON.parse(localStorage.getItem("User")).accessToken;
  return (dispatch) => {
    dispatch(actUserInformationUpdateRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung",
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actUserInformationUpdateSuccess(result.data));
        alert("Update success !");
      })
      .catch((err) => {
        dispatch(actUserInformationUpdateFailed(err));
        alert("Email have already existed !");
      });
  };
};
const actUserInformationUpdateRequest = () => {
  return {
    type: USER_INFORMATION_UPDATE_REQUEST,
  };
};
const actUserInformationUpdateSuccess = (data) => {
  return {
    type: USER_INFORMATION_UPDATE_SUCCESS,
    payload: data,
  };
};
const actUserInformationUpdateFailed = (err) => {
  return {
    type: USER_INFORMATION_UPDATE_FAILED,
    payload: err,
  };
};
