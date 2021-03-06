import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "../../Helper/Form/FormControl";

function EditUserForm(props) {
  const { userEdit, editNguoiDung, setModal } = props;

  const validationSchema = yup.object({
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
    editNguoiDung(
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
    <div className="editUserForm">
      <div className="editUserForm__content">
        <h2 className="editUserForm__title">Edit User</h2>
        <form className="editUserForm__form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control="input"
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            readOnly
            placeholder={userEdit?.taiKhoan}
            register={register}
            error={errors.taiKhoan}
          />
          <FormControl
            control="input"
            id="matKhau"
            name="matKhau"
            type="text"
            defaultValue={userEdit?.matKhau}
            placeholder="Mật khẩu"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="email"
            name="email"
            type="text"
            defaultValue={userEdit?.email}
            placeholder="Email"
            register={register}
            error={errors.email}
          />
          <FormControl
            control="input"
            id="soDt"
            name="soDt"
            type="number"
            defaultValue={userEdit?.soDt}
            placeholder="Số diện thoại"
            register={register}
            error={errors.soDt}
          />
          <FormControl
            control="select"
            id="maLoaiNguoiDung"
            name="maLoaiNguoiDung"
            type="text"
            placeholder="Mã loại người dùng"
            defaultValue={userEdit?.maLoaiNguoiDung}
            options={options}
            register={register}
            error={errors.maLoaiNguoiDung}
          />
          <FormControl
            control="input"
            id="hoTen"
            name="hoTen"
            type="text"
            defaultValue={userEdit?.hoTen}
            placeholder="Họ tên"
            register={register}
            error={errors.hoTen}
          />
          <button className="roomMovieForm__button" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUserForm;
