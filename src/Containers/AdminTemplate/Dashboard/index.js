import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EditMovieForm from "../../../Components/EditMovieForm";
import RoomMovieForm from "../../../Components/RoomMovieForm";
import AddMovieForm from "../../../Components/AddMovieForm";
import ModalForm from "../../../Components/ModalForm";
import TableMovie from "../../../Components/TableMovie";
import {
  actMovieListPageApi,
  actMovieListApi,
  actDeleteMovieListApi,
  actEditMovieListApi,
  actAddPictureMovieApi,
  actGetGroupTheaterListApi,
  actGetTheaterListApi,
  actTaoLichChieuApi,
  actThemPhimApi,
} from "./module/action";
import Loader from "../../../Components/Loader";

function Dashboard(props) {
  const {
    keyword,
    layDanhSachPhimPhanTrang,
    layDanhSachPhim,
    timKiemPhim,
    xoaPhim,
    capNhatPhim,
    setModal,
    layThongTinHeThongRap,
    layThongTinCumRap,
    chonMaHeThongRap,
    chonMaCR,
    groupTheaterList,
    theaterList,
    roomList,
  } = props;
  let { dataDanhSachPhim } = props;
  // Lấy thông tin phim để edit
  const [movieEdit, setMovieEdit] = useState(null);
  // Lấy thông tin phim để tạo lịch chiếu
  const [movieRoom, setMovieRoom] = useState(null);
  // Set form cho modal
  const [formForModal, setFormForModal] = useState("");

  useEffect(() => {
    layDanhSachPhimPhanTrang(1);
    layDanhSachPhim();
  }, []);

  const handleSearch = (e) => {
    timKiemPhim(e.target.value);
  };

  const setFormModal = () => {
    if (formForModal === "Edit movie form") {
      return (
        <EditMovieForm
          movieEdit={movieEdit}
          capNhatPhim={capNhatPhim}
          actAddPictureMovieApi={actAddPictureMovieApi}
          setModal={setModal}
        />
      );
    } else if (formForModal === "Room movie form") {
      return (
        <RoomMovieForm
          layThongTinHeThongRap={layThongTinHeThongRap}
          layThongTinCumRap={layThongTinCumRap}
          chonMaHeThongRap={chonMaHeThongRap}
          chonMaCR={chonMaCR}
          groupTheaterList={groupTheaterList}
          theaterList={theaterList}
          roomList={roomList}
          movieRoom={movieRoom}
          actTaoLichChieuApi={actTaoLichChieuApi}
          setModal={setModal}
        />
      );
    } else {
      return (
        <AddMovieForm
          actThemPhimApi={actThemPhimApi}
          actAddPictureMovieApi={actAddPictureMovieApi}
          setModal={setModal}
        />
      );
    }
  };
  const renderTableMovie = () => {
    if (keyword) {
      dataDanhSachPhim = dataDanhSachPhim?.filter((item) => {
        return item.tenPhim.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      });
      return (
        <TableMovie
          dataDanhSachPhimPhanTrang={props.dataDanhSachPhimPhanTrang}
          layDanhSachPhimPhanTrang={props.layDanhSachPhimPhanTrang}
          keyword={props.keyword}
          movieList={dataDanhSachPhim}
          xoaPhim={xoaPhim}
          setModal={setModal}
          setMovieEdit={setMovieEdit}
          setMovieRoom={setMovieRoom}
          setFormForModal={setFormForModal}
        />
      );
    } else {
      return (
        <TableMovie
          dataDanhSachPhimPhanTrang={props.dataDanhSachPhimPhanTrang}
          layDanhSachPhimPhanTrang={props.layDanhSachPhimPhanTrang}
          keyword={props.keyword}
          movieList={props.dataDanhSachPhimPhanTrang?.items}
          xoaPhim={xoaPhim}
          setModal={setModal}
          setMovieEdit={setMovieEdit}
          setMovieRoom={setMovieRoom}
          setFormForModal={setFormForModal}
        />
      );
    }
  };

  if (props.loadingDanhSachPhimPhanTrang) return <Loader />;
  return (
    <div className="dashboard">
      <button
        className="dashboard__button"
        onClick={() => {
          setFormForModal("Add movie form");
          setModal();
        }}
      >
        Thêm phim
      </button>
      <input
        className="dashboard__search"
        type="text"
        placeholder="Tìm kiếm phim"
        onChange={handleSearch}
      />
      {renderTableMovie()}
      <ModalForm admin={true} componentModal={setFormModal()} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loadingDanhSachPhimPhanTrang:
      state.dashboardReducer.loadingDanhSachPhimPhanTrang,
    dataDanhSachPhimPhanTrang: state.dashboardReducer.dataDanhSachPhimPhanTrang,
    dataDanhSachPhim: state.dashboardReducer.dataDanhSachPhim,
    keyword: state.dashboardReducer.keyword,
    groupTheaterList: state.dashboardReducer.groupTheaterList,
    theaterList: state.dashboardReducer.theaterList,
    roomList: state.dashboardReducer.roomList,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    layDanhSachPhim: () => {
      dispatch(actMovieListApi());
    },
    layDanhSachPhimPhanTrang: (soTrang) => {
      dispatch(actMovieListPageApi(soTrang));
    },
    xoaPhim: (maPhim) => {
      dispatch(actDeleteMovieListApi(maPhim));
    },
    capNhatPhim: (data, setModal) => {
      dispatch(actEditMovieListApi(data, setModal));
    },
    layThongTinHeThongRap: () => {
      dispatch(actGetGroupTheaterListApi());
    },
    layThongTinCumRap: (maHeThongRap) => {
      dispatch(actGetTheaterListApi(maHeThongRap));
    },
    timKiemPhim: (keyword) => {
      const action = {
        type: "TIM_KIEM_PHIM",
        payload: keyword,
      };
      dispatch(action);
    },
    chonMaHeThongRap: (maHeThongRap) => {
      const action = {
        type: "CHON_MA_HE_THONG_RAP",
        payload: maHeThongRap,
      };
      dispatch(action);
    },
    chonMaCR: (maCumRap) => {
      const action = {
        type: "CHON_MA_CUM_RAP",
        payload: maCumRap,
      };
      dispatch(action);
    },
    setModal: () => {
      const action = {
        type: "SET_MODAL",
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
