import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { BsPeopleCircle } from "react-icons/bs";
import {
  actUserInformationApi,
  actUserInformationUpdateApi,
} from "./module/action";
import FormControl from "../../../Helper/Form/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Table } from "reactstrap";
import Loader from "../../../Components/Loader";

function UserPage(props) {
  const tk = JSON.parse(localStorage.getItem("User"));

  const {
    logIn,
    layThongTinUser,
    dataUserLogin,
    dataUserInformation,
    capNhatThongTinUser,
  } = props;

  const history = useHistory();
  const [info, setInfo] = useState("information");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    logIn();
    layThongTinUser({ taiKhoan: tk?.taiKhoan });
  }, []);

  useEffect(() => {
    if (!tk) {
      history.push("/");
    }
  }, [tk]);

  const handleInfo = () => {
    if (info === "information") {
      return renderInformation();
    } else {
      return renderHistory();
    }
  };

  const onSubmit = (value) => {
    capNhatThongTinUser({
      taiKhoan: dataUserInformation?.taiKhoan,
      matKhau: value.matKhau,
      email: value.email,
      soDt: value.soDt,
      maNhom: dataUserInformation?.maNhom,
      maLoaiNguoiDung: "KhachHang",
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

  const renderInformation = () => {
    return (
      <div className="userPage__informationForm">
        <div className="userPage__informationForm__content">
          <h2 className="userPage__informationForm__title">Information</h2>
          {!edit ? renderInformationDetail() : renderInformationForm()}
        </div>
      </div>
    );
  };

  const renderHistory = () => {
    return (
      <Table className="userPage__history" dark>
        <thead>
          <tr>
            <th>Movie</th>
            <th>Date of Booking</th>
            <th>List of Seat</th>
          </tr>
        </thead>
        <tbody>{renderTable()}</tbody>
      </Table>
    );
  };

  const renderTable = () => {
    return dataUserInformation?.thongTinDatVe?.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.tenPhim}</td>
          <td>{new Date(item.ngayDat).toLocaleDateString()}</td>
          <td>{renderDanhSachVe(item)}</td>
        </tr>
      );
    });
  };
  const renderDanhSachVe = (item) => {
    return item?.danhSachGhe?.map((i, index) => {
      return (
        <tr key={index}>
          <td style={{ border: "none" }}>{i.tenHeThongRap}</td>
          <td style={{ border: "none" }}>{i.tenRap}</td>
          <td style={{ border: "none" }}>Seat : {i.tenGhe}</td>
        </tr>
      );
    });
  };
  const renderInformationDetail = () => {
    return (
      <>
        <div className="userPage__informationForm__title__a">
          <span>User Account : </span>
          {dataUserInformation?.taiKhoan}
        </div>
        <div className="userPage__informationForm__title__a">
          <span>Password : </span>
          {dataUserInformation?.matKhau}
        </div>
        <div className="userPage__informationForm__title__a">
          <span>Username : </span>
          {dataUserInformation?.hoTen}
        </div>
        <div className="userPage__informationForm__title__a">
          <span>Email : </span>
          {dataUserInformation?.email}
        </div>
        <div className="userPage__informationForm__title__a">
          <span>Phone : </span>
          {dataUserInformation?.soDT}
        </div>

        <button
          className="userPage__informationForm__form__button"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Edit
        </button>
      </>
    );
  };

  const renderInformationForm = () => {
    return (
      <form
        className="userPage__informationForm__form"
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
          className="userPage__informationForm__form__button"
          type="submit"
        >
          Submit
        </button>
        <button
          className="userPage__informationForm__form__button__cancel"
          onClick={() => {
            setEdit(!edit);
          }}
        >
          Cancel
        </button>
      </form>
    );
  };

  if (props.loadingUserInformation) return <Loader />;
  return (
    <div className="userPage container">
      <div className="row">
        <div className="userPage__title col-xs-12 col-lg-3">
          <div>
            <BsPeopleCircle className="userPage__icon" />
            <p>{dataUserLogin?.hoTen}</p>
          </div>
          <div
            className="userPage__content"
            onClick={() => {
              setInfo("information");
            }}
          >
            <a>Personal Information</a>
          </div>
          <div
            className="userPage__content"
            onClick={() => {
              setInfo("history");
            }}
          >
            <a>Ticket booking history</a>
          </div>
        </div>
        <div className="col-xs-12 col-lg-9">{handleInfo()}</div>
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    loadingUserInformation: state.userPageReducer.loadingUserInformation,
    dataUserInformation: state.userPageReducer.dataUserInformation,
    dataUserLogin: state.homeTemplateReducer.dataUserLogin,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    logIn: () => {
      const action = {
        type: "LOG_IN_USER",
      };
      dispatch(action);
    },
    layThongTinUser: (taiKhoan) => {
      dispatch(actUserInformationApi(taiKhoan));
    },

    capNhatThongTinUser: (data) => {
      dispatch(actUserInformationUpdateApi(data));
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(UserPage);
