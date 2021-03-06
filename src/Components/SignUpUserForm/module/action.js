import Axios from "axios";

// Đăng ký người dùng
export const actSignUpUser = (data, setForm) => {
  Axios({
    url: "https://movie0706.cybersoft.edu.vn/api/QuanLyNguoiDung/DangKy",
    method: "POST",
    data,
  })
    .then((result) => {
      alert("Sign up success !");
      setForm("log in");
    })
    .catch((err) => {
      console.log(err);
      alert("Account or email has already existed !");
    });
};
