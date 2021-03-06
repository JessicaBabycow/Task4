import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  actUserInformationApi,
  actUserInformationUpdateApi,
} from "./module/action";
import { BsPeopleCircle } from "react-icons/bs";
import FormControl from "../../../Helper/Form/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

function AdminPage(props) {
  const tk = JSON.parse(localStorage.getItem("Admin"));

  const [edit, setEdit] = useState(false);

  const { dataUserInformation, layThongTinAdmin, capNhatThongTinAdmin } = props;

  useEffect(() => {
    layThongTinAdmin({ taiKhoan: tk?.taiKhoan });
  }, []);

  const handleInfo = () => {
    if (edit) {
      return renderForm();
    } else {
      return renderInfo();
    }
  };

  const onSubmit = (value) => {
    capNhatThongTinAdmin({
      taiKhoan: dataUserInformation?.taiKhoan,
      matKhau: value.matKhau,
      email: value.email,
      soDt: value.soDt,
      maNhom: dataUserInformation?.maNhom,
      maLoaiNguoiDung: "QuanTri",
      hoTen: value.hoTen,
    });
    setEdit(!edit);
  };

  const validationSchema = yup.object({
    matKhau: yup.string().required("(*) Password is required !"),
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

  const renderForm = () => {
    return (
      <form
        className="adminPage__informationForm__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl
          control="input"
          id="taiKhoan"
          name="taiKhoan"
          type="text"
          readOnly
          placeholder={dataUserInformation?.taiKhoan}
          register={register}
          error={errors.taiKhoan}
        />
        <FormControl
          control="input"
          id="matKhau"
          placeholder="Password"
          name="matKhau"
          type="password"
          defaultValue={dataUserInformation?.matKhau}
          register={register}
          error={errors.matKhau}
        />
        <FormControl
          control="input"
          id="email"
          placeholder="Email"
          name="email"
          type="text"
          defaultValue={dataUserInformation?.email}
          register={register}
          error={errors.email}
        />
        <FormControl
          control="input"
          id="soDt"
          placeholder="Phone"
          name="soDt"
          type="number"
          defaultValue={dataUserInformation?.soDT}
          register={register}
          error={errors.soDt}
        />
        <FormControl
          control="input"
          id="hoTen"
          placeholder="Username"
          name="hoTen"
          type="text"
          defaultValue={dataUserInformation?.hoTen}
          register={register}
          error={errors.hoTen}
        />
        <button
          className="adminPage__informationForm__form__button"
          type="submit"
        >
          Submit
        </button>
        <button
          className="adminPage__informationForm__form__button__cancel"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Cancel
        </button>
      </form>
    );
  };

  const renderInfo = () => {
    return (
      <>
        <div className="adminPage__informationForm__title__a">
          <span>User Account : </span>
          {dataUserInformation?.taiKhoan}
        </div>
        <div className="adminPage__informationForm__title__a">
          <span>Password : </span>
          {dataUserInformation?.matKhau}
        </div>
        <div className="adminPage__informationForm__title__a">
          <span>Username : </span>
          {dataUserInformation?.hoTen}
        </div>
        <div className="adminPage__informationForm__title__a">
          <span>Email : </span>
          {dataUserInformation?.email}
        </div>
        <div className="adminPage__informationForm__title__a">
          <span>Phone : </span>
          {dataUserInformation?.soDT}
        </div>

        <button
          className="adminPage__informationForm__form__button"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      </>
    );
  };

  return (
    <div className="adminPage container">
      <div className="adminPage__container row">
        <div className="col-6">
          <img
            src="./image/undraw_Nature_fun_re_iney.svg"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="col-6 adminPage__main">
          <div className="adminPage__title">
            <BsPeopleCircle className="adminPage__icon" />
          </div>
          <div className="adminPage__info">{handleInfo()}</div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    loadingUserInformation: state.adminPageReducer.loadingUserInformation,
    dataUserInformation: state.adminPageReducer.dataUserInformation,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    layThongTinAdmin: (taiKhoan) => {
      dispatch(actUserInformationApi(taiKhoan));
    },

    capNhatThongTinAdmin: (data) => {
      dispatch(actUserInformationUpdateApi(data));
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(AdminPage);
