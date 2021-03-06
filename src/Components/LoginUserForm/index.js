import React, { useEffect } from "react";
import FormControl from "../../Helper/Form/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { connect } from "react-redux";
import { actLogin } from "../../Containers/HomeTemplate/module/action";

function LoginUserForm(props) {
  const { setForm, dataUserLogin, setModal, userLogin } = props;

  const validationSchema = yup.object({
    taiKhoan: yup.string().required("(*) Username is required !"),
    matKhau: yup.string().required("(*) Password is required !"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    userLogin(value);
  };

  // *** Warning !!!
  useEffect(() => {
    if (dataUserLogin) {
      setModal();
    }
  }, [dataUserLogin]);

  return (
    <div className="loginUserForm">
      <div className="loginUserForm__content">
        <h2 className="loginUserForm__title">User Login</h2>
        <p>Login for booking ticket !</p>
        <form className="loginUserForm__form" onSubmit={handleSubmit(onSubmit)}>
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
          <button className="loginUserForm__button" type="submit">
            Login
          </button>
        </form>
        <p className="loginUserForm__signup">
          Don't have an account ?{" "}
          <button
            onClick={() => {
              setForm("sign up");
            }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
const mapStateToProp = (state) => {
  return {
    dataUserLogin: state.homeTemplateReducer.dataUserLogin,
  };
};
const mapDispatchToProp = (dispatch) => {
  return {
    userLogin: (data) => {
      dispatch(actLogin(data));
    },
    setModal: () => {
      const action = {
        type: "SET_MODAL",
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(LoginUserForm);
