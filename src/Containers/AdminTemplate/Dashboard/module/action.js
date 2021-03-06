import {
  MOVIE_LIST_PAGE_REQUEST,
  MOVIE_LIST_PAGE_SUCCESS,
  MOVIE_LIST_PAGE_FAILED,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAILED,
  DELETE_MOVIE_LIST_REQUEST,
  DELETE_MOVIE_LIST_SUCCESS,
  DELETE_MOVIE_LIST_FAILED,
  EDIT_MOVIE_LIST_REQUEST,
  EDIT_MOVIE_LIST_SUCCESS,
  EDIT_MOVIE_LIST_FAILED,
  GET_GROUP_THEATER_LIST_REQUEST,
  GET_GROUP_THEATER_LIST_SUCCESS,
  GET_GROUP_THEATER_LIST_FAILED,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
  GET_THEATER_LIST_FAILED,
} from "./constant";

import Axios from "axios";

// Lấy danh sách phim
export const actMovieListApi = () => {
  return (dispatch) => {
    dispatch(actMovieListRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
      method: "GET",
    })
      .then((result) => {
        dispatch(actMovieListSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actMovieListFailed(err));
      });
  };
};
const actMovieListRequest = () => {
  return {
    type: MOVIE_LIST_REQUEST,
  };
};
const actMovieListSuccess = (data) => {
  return {
    type: MOVIE_LIST_SUCCESS,
    payload: data,
  };
};
const actMovieListFailed = (err) => {
  return {
    type: MOVIE_LIST_FAILED,
    payload: err,
  };
};

// Lấy danh sách phim phân trang
export const actMovieListPageApi = (soTrang) => {
  return (dispatch) => {
    dispatch(actMovieListPageRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP09&soTrang=${soTrang}&soPhanTuTrenTrang=10`,
      method: "GET",
    })
      .then((result) => {
        dispatch(actMovieListPageSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actMovieListPageFailed(err));
      });
  };
};
const actMovieListPageRequest = () => {
  return {
    type: MOVIE_LIST_PAGE_REQUEST,
  };
};
const actMovieListPageSuccess = (data) => {
  return {
    type: MOVIE_LIST_PAGE_SUCCESS,
    payload: data,
  };
};
const actMovieListPageFailed = (err) => {
  return {
    type: MOVIE_LIST_PAGE_FAILED,
    payload: err,
  };
};

// Xóa phim
export const actDeleteMovieListApi = (maPhim) => {
  const accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  return (dispatch) => {
    dispatch(actDeleteMovieListRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actDeleteMovieListSuccess(result.data));
        alert("Delete Success !");
      })
      .catch((err) => {
        dispatch(actDeleteMovieListFailed(err));
        alert("Phim đã tạo lịch chiếu không thể xóa !");
      });
  };
};
const actDeleteMovieListRequest = () => {
  return {
    type: DELETE_MOVIE_LIST_REQUEST,
  };
};
const actDeleteMovieListSuccess = (data) => {
  return {
    type: DELETE_MOVIE_LIST_SUCCESS,
    payload: data,
  };
};
const actDeleteMovieListFailed = (err) => {
  return {
    type: DELETE_MOVIE_LIST_FAILED,
    payload: err,
  };
};

// Cập nhật phim
export const actEditMovieListApi = (data, setModal) => {
  const accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  return (dispatch) => {
    dispatch(actEditMovieListRequest());
    Axios({
      url: "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhim",
      method: "POST",
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((result) => {
        dispatch(actEditMovieListSuccess(result.data));
        alert("Edit Success !");
        setModal();
      })
      .catch((err) => {
        dispatch(actEditMovieListFailed(err));
        alert("Edit failed !");
      });
  };
};
const actEditMovieListRequest = () => {
  return {
    type: EDIT_MOVIE_LIST_REQUEST,
  };
};
const actEditMovieListSuccess = (data) => {
  return {
    type: EDIT_MOVIE_LIST_SUCCESS,
    payload: data,
  };
};
const actEditMovieListFailed = (err) => {
  return {
    type: EDIT_MOVIE_LIST_FAILED,
    payload: err,
  };
};

// Upload hình ảnh phim
export const actAddPictureMovieApi = (data) => {
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/UploadHinhAnhPhim`,
    method: "POST",
    data,
  })
    .then((result) => {
      console.log("Picture success");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy hệ thống rạp
export const actGetGroupTheaterListApi = () => {
  return (dispatch) => {
    dispatch(actGetGroupTheaterListRequest());
    Axios({
      url:
        "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    })
      .then((result) => {
        dispatch(actGetGroupTheaterListSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetGroupTheaterListFailed(err));
      });
  };
};
const actGetGroupTheaterListRequest = () => {
  return {
    type: GET_GROUP_THEATER_LIST_REQUEST,
  };
};
const actGetGroupTheaterListSuccess = (data) => {
  return {
    type: GET_GROUP_THEATER_LIST_SUCCESS,
    payload: data,
  };
};
const actGetGroupTheaterListFailed = (err) => {
  return {
    type: GET_GROUP_THEATER_LIST_FAILED,
    payload: err,
  };
};

// Lấy cụm rạp và rạp
export const actGetTheaterListApi = (maHeThongRap) => {
  return (dispatch) => {
    dispatch(actGetTheaterListRequest());
    Axios({
      url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
      method: "GET",
    })
      .then((result) => {
        dispatch(actGetTheaterListSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actGetTheaterListFailed(err));
      });
  };
};
const actGetTheaterListRequest = () => {
  return {
    type: GET_THEATER_LIST_REQUEST,
  };
};
const actGetTheaterListSuccess = (data) => {
  return {
    type: GET_THEATER_LIST_SUCCESS,
    payload: data,
  };
};
const actGetTheaterListFailed = (err) => {
  return {
    type: GET_THEATER_LIST_FAILED,
    payload: err,
  };
};

// Tạo lịch chiếu
export const actTaoLichChieuApi = (data, setModal) => {
  let accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((result) => {
      alert("Tạo lịch chiếu thành công !");
      setModal();
    })
    .catch((err) => {
      alert("Tạo lịch chiếu thất bại !");
      console.log(err);
    });
};

// Thêm phim
export const actThemPhimApi = (data, setModal) => {
  let accessToken = JSON.parse(localStorage.getItem("Admin")).accessToken;

  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/ThemPhim`,
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((result) => {
      alert("Thêm phim thành công !");
      setModal();
      console.log(result.data);
    })
    .catch((err) => {
      alert("Thêm phim thất bại !");
      console.log(err);
    });
};
