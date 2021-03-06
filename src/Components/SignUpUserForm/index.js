import React from "react";
import FormControl from "../../Helper/Form/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { actSignUpUser } from "./module/action";

function SignUpUserForm(props) {
  const { setForm } = props;

  const validationSchema = yup.object({
    taiKhoan: yup.string().required("(*) Username is required !"),
    matKhau: yup.string().required("(*) Password is required !"),
    confirmMatKhau: yup
      .string()
      .oneOf([yup.ref("matKhau"), ""], "(*) Password must match")
      .required("(*) Password is required !"),
    email: yup
      .string()
      .email("(*) Invalid email format")
      .required("(*) Email is required !"),
    soDt: yup.string().notRequired(),
    hoTen: yup.string().notRequired(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    actSignUpUser(
      {
        taiKhoan: value.taiKhoan,
        matKhau: value.matKhau,
        email: value.email,
        soDt: value.soDt,
        maNhom: "GP09",
        maLoaiNguoiDung: "KhachHang",
        hoTen: value.hoTen,
      },
      setForm
    );
    // setForm("log in");
  };

  return (
    <div className="signUpUserForm">
      <div className="signUpUserForm__content">
        <h2 className="signUpUserForm__title">Sign Up</h2>
        <p>Sign Up for booking ticket !</p>
        <form
          className="signUpUserForm__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            control="input"
            id="taiKhoan"
            name="taiKhoan"
            type="text"
            placeholder="Username"
            register={register}
            error={errors.taiKhoan}
          />
          <FormControl
            control="input"
            id="matKhau"
            placeholder="Password"
            name="matKhau"
            type="password"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="confirmMatKhau"
            placeholder="Confirm Password"
            name="confirmMatKhau"
            type="password"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="email"
            placeholder="Email"
            name="email"
            type="text"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="soDt"
            placeholder="Phone"
            name="soDt"
            type="number"
            register={register}
            error={errors.matKhau}
          />
          <FormControl
            control="input"
            id="hoTen"
            placeholder="Fullname"
            name="hoTen"
            type="text"
            register={register}
            error={errors.matKhau}
          />
          <button className="signUpUserForm__button" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUpUserForm;
