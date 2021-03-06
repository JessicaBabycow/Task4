import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "../../Helper/Form/FormControl";

function AddUserForm(props) {
  const { addNguoiDung, setModal } = props;
  const validationSchema = yup.object({
    taiKhoan: yup.string().required("(*) Tài khoản is required !"),
    matKhau: yup.string().required("(*) Mật khẩu is required !"),
    email: yup
      .string()
      .email("(*) Invalid email format !")
      .required("(*) Email is required !"),
    soDt: yup
      .string()
      .notRequired()
      .matches(/^[0-9]+$/, "(*) Must be only digits"),
    hoTen: yup.string().notRequired(),
    maLoaiNguoiDung: yup
      .string()
      .required("(*) Mã loại người dùng is required !"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    console.log(value);
    addNguoiDung(
      {
        taiKhoan: value.taiKhoan,
        matKhau: value.matKhau,
        email: value.email,
        soDt: value.soDt,
        maNhom: "GP09",
        maLoaiNguoiDung: value.maLoaiNguoiDung,
        hoTen: value.hoTen,
      },
      setModal
    );
  };
  const options = [
    { value: "", label: "Select your options" },
    { value: "KhachHang", label: "Khách Hàng" },
    { value: "QuanTri", label: "Quản Trị" },
  ];
  return (
    <div className="addUserForm">
      <div className="addUserForm__content">
        <h2 className="addUserForm__title">Add User</h2>
        <form className="addUserForm__form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control="input"
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            placeholder="Tài khoản"
            register={register}
            error={errors.taiKhoan}
          />
          <FormControl
            control="input"
            id="matKhau"
            name="matKhau"
            type="text"
            placeholder="Mật khẩu"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <FormControl
            control="input"
            id="soDt"
            name="soDt"
            type="number"
            placeholder="Số diện thoại"
            register={register}
            error={errors.soDt}
          />
          <FormControl
            control="input"
            id="hoTen"
            name="hoTen"
            type="text"
            placeholder="Họ tên"
            register={register}
            error={errors.hoTen}
          />
          <FormControl
            control="select"
            id="maLoaiNguoiDung"
            name="maLoaiNguoiDung"
            type="text"
            placeholder="Mã loại người dùng"
            options={options}
            register={register}
            error={errors.maLoaiNguoiDung}
          />
          <button className="roomMovieForm__button" type="submit">
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUserForm;
