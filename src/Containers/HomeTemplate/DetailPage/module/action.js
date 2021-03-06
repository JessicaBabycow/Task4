import Axios from "axios";

// Lấy thông tin phim
export const getMovieDetail = (id, setMovieDetail) => {
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: "GET",
  })
    .then((result) => {
      setMovieDetail(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy danh sách hệ thống rạp
export const getTheaterGroupDetail = (setTheaterGroupList) => {
  Axios({
    url:
      "https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap",
    method: "GET",
  })
    .then((result) => {
      setTheaterGroupList(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy danh sách cụm rạp theo hệ thống
export const getTheaterList = (maHeThongRap, setTheaterList) => {
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
    method: "GET",
  })
    .then((result) => {
      setTheaterList(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Lấy review phim (mockAPI)
export const getReviewList = (setReviewList) => {
  Axios({
    url: "https://5f5f8142df620f00163e5d23.mockapi.io/reviewMovie",
    method: "GET",
  })
    .then((result) => {
      setReviewList(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const postReviewList = (data, setReviewList) => {
  Axios({
    url: "https://5f5f8142df620f00163e5d23.mockapi.io/reviewMovie",
    method: "POST",
    data,
  })
    .then((result) => {
      getReviewList(setReviewList);
    })
    .catch((err) => {
      console.log(err);
    });
};
