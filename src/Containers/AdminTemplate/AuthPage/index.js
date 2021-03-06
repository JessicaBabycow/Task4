import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import FormControl from "../../../Helper/Form/FormControl";
import { actLoginAdmin } from "./module/action";

function AuthPage(props) {
  const history = useHistory();

  const validationSchema = yup.object({
    taiKhoan: yup.string().required("(*) Username is required !"),
    matKhau: yup.string().required("(*) Password is required !"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    props.loginAdmin(value, history);
  };

  return (
    <div className="loginAdminForm">
      <div className="row  loginAdminForm__content">
        <div className="col-6 loginAdminForm__picture">
          <img src="./image/log-in-svg.svg" />
        </div>
        <div className="col-6 loginAdminForm__info">
          <h2 className="loginAdminForm__title">Admin</h2>
          <form
            className="loginAdminForm__form"
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
            <button className="loginAdminForm__button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginAdmin: (data, history) => {
      dispatch(actLoginAdmin(data, history));
    },
  };
};

export default connect(null, mapDispatchToProps)(AuthPage);
