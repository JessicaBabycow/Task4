import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_PAGE_REQUEST,
  USER_LIST_PAGE_SUCCESS,
  USER_LIST_PAGE_FAILED,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "./constant";
import Axios from "axios";

// Lấy danh sách người dùng
export const actUserListApi = () => {
  return (dispatch) => {
    dispatch(actUserListRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09",
      method: "GET",
    })
      .then((result) => {
        dispatch(actUserListSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actUserListFailed(err));
      });
  };
};
const actUserListRequest = () => {
  return {
    type: USER_LIST_REQUEST,
  };
};
const actUserListSuccess = (data) => {
  return {
    type: USER_LIST_SUCCESS,
    payload: data,
  };
};
const actUserListFailed = (err) => {
  return {
    type: USER_LIST_FAILED,
    payload: err,
  };
};

// Lấy danh sách người dùng phân trang
export const actUserListPageApi = (soTrang) => {
  return (dispatch) => {
    dispatch(actUserListPageRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang?MaNhom=GP09&soTrang=${soTrang}&soPhanTuTrenTrang=20`,
      method: "GET",
    })
      .then((result) => {
        dispatch(actUserListPageSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actUserListPageFailed(err));
      });
  };
};
const actUserListPageRequest = () => {
  return {
    type: USER_LIST_PAGE_REQUEST,
  };
};
const actUserListPageSuccess = (data) => {
  return {
    type: USER_LIST_PAGE_SUCCESS,
    payload: data,
  };
};
const actUserListPageFailed = (err) => {
  return {
    type: USER_LIST_PAGE_FAILED,
    payload: err,
  };
};

// Edit user
export const actEditUserApi = (data, setModal) => {
  const accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  return (dispatch) => {
    dispatch(actEditUserRequest());
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
        dispatch(actEditUserSuccess(result.data));
        alert("Chỉnh sửa thành công !");
        setModal();
      })
      .catch((err) => {
        dispatch(actEditUserFailed(err));
        alert("Chỉnh sửa thất bại !");
      });
  };
};
const actEditUserRequest = () => {
  return {
    type: EDIT_USER_REQUEST,
  };
};
const actEditUserSuccess = (data) => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: data,
  };
};
const actEditUserFailed = (err) => {
  return {
    type: EDIT_USER_FAILED,
    payload: err,
  };
};

// Add user
export const actAddUserApi = (data, setModal) => {
  const accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  return (dispatch) => {
    dispatch(actAddUserRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actAddUserSuccess(result.data));
        alert("Thêm thành công !");
        setModal();
      })
      .catch((err) => {
        dispatch(actAddUserFailed(err));
        alert("Tài khoản hoặc email đã tồn tại !");
      });
  };
};
const actAddUserRequest = () => {
  return {
    type: ADD_USER_REQUEST,
  };
};
const actAddUserSuccess = (data) => {
  return {
    type: ADD_USER_SUCCESS,
    payload: data,
  };
};
const actAddUserFailed = (err) => {
  return {
    type: ADD_USER_FAILED,
    payload: err,
  };
};

// Delete user
export const actDeleteUserApi = (taiKhoan, data) => {
  const accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  return (dispatch) => {
    dispatch(actDeleteUserRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actDeleteUserSuccess(data));
        alert("Xóa thành công !");
      })
      .catch((err) => {
        dispatch(actDeleteUserFailed(err));
        alert("Người dùng này đã đặt vé không thể xóa !");
      });
  };
};
const actDeleteUserRequest = () => {
  return {
    type: DELETE_USER_REQUEST,
  };
};
const actDeleteUserSuccess = (data) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: data,
  };
};
const actDeleteUserFailed = (err) => {
  return {
    type: DELETE_USER_FAILED,
    payload: err,
  };
};
