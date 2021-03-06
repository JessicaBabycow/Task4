import Axios from "axios";

// Lấy danh sách phim
export const getMovieList = (setMovieList) => {
  Axios({
    url:
      "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP09",
    method: "GET",
  })
    .then((result) => {
      setMovieList(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy thông tin lịch chiếu hệ thống rạp
export const getMovieDetail = (setMovieDetail) => {
  Axios({
    url:
      "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09",
    method: "GET",
  })
    .then((result) => {
      setMovieDetail(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy thông tin lịch chiếu phim
export const layThongTinLichChieuPhimApi = (
  maPhim,
  setThongTinLichChieuPhim
) => {
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`,
    method: "GET",
  })
    .then((result) => {
      setThongTinLichChieuPhim(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
