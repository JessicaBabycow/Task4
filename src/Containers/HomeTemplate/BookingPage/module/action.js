import Axios from "axios";

// Lấy danh sách phòng vé
export const getBookingRoomDetail = (maLichChieu, setBookingRoomDetail) => {
  Axios({
    url: `https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`,
    method: "GET",
  })
    .then((result) => {
      setBookingRoomDetail(result.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

// Đặt vé
export const actBookingTicketApi = (data, history, xoaDanhSachVe) => {
  const accessToken = JSON.parse(localStorage.getItem("User")).accessToken;
  Axios({
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyDatVe/DatVe",
    method: "POST",
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((result) => {
      alert("Booking Success !");
      history.push("/");
      xoaDanhSachVe();
    })
    .catch((err) => {
      alert("Booking Failed !");
      console.log(err);
    });
};
