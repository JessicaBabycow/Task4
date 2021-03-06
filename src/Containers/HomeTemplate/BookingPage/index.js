import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getBookingRoomDetail, actBookingTicketApi } from "./module/action";

import BookingMovieDetail from "../../../Components/BookingMovieDetail";
import SeatList from "../../../Components/SeatList";
import Loader from "../../../Components/Loader";

function BookingPage(props) {
  const tk = JSON.parse(localStorage.getItem("User"));
  // Danh sách phòng vé
  const [bookingRoomDetail, setBookingRoomDetail] = useState(null);
  const { themDanhSachVe, xoaDanhSachVe } = props;

  const { maLichChieu } = useParams();
  const history = useHistory();

  useEffect(() => {
    getBookingRoomDetail(maLichChieu, setBookingRoomDetail);
  }, []);

  useEffect(() => {
    if (!tk) {
      xoaDanhSachVe();
      history.push("/");
    }
  }, [tk]);

  const addBookingSeatList = (ghe) => {
    themDanhSachVe(ghe);
  };

  // Set hẹn giờ
  const [time, setTime] = useState({ s: 0, m: 30 });

  useEffect(() => {
    if (time.m === 0 && time.s === 0) {
      alert("Time out");
      xoaDanhSachVe();
      history.push("/");
    }
  }, [time]);

  useEffect(() => {
    let myInterval = setInterval(() => {
      run();
    }, 1000);
    return () => {
      // props.handleDatGhe(null, null);
      clearInterval(myInterval);
    };
  }, []);

  let updateM = time.m,
    updateS = time.s;
  const run = () => {
    if (updateS === 0) {
      updateM--;
      updateS = 60;
    }
    updateS--;
    return setTime({ s: updateS, m: updateM });
  };
  //--- End of Set hẹn giờ ---

  if (!bookingRoomDetail) return <Loader />;
  return (
    <div className="bookingPage container">
      <h2>
        Time :{" "}
        <span className="bookingPage__time">
          <span>{time.m >= 10 ? time.m : "0" + time.m}</span>&nbsp;:&nbsp;
          <span>{time.s >= 10 ? time.s : "0" + time.s}</span>
        </span>
      </h2>
      <div className="row">
        <div className="col-8">
          <SeatList
            bookingRoomDetail={bookingRoomDetail}
            addBookingSeatList={addBookingSeatList}
          />
        </div>
        <div className="col-4">
          <BookingMovieDetail
            bookingRoomDetail={bookingRoomDetail}
            danhSachVe={props.danhSachVe}
            tk={tk}
            maLichChieu={maLichChieu}
            actBookingTicketApi={actBookingTicketApi}
            history={history}
            xoaDanhSachVe={xoaDanhSachVe}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {
    danhSachVe: state.bookingTicketReducer.danhSachVe,
    dataUserLogin: state.homeTemplateReducer.dataUserLogin,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    themDanhSachVe: (ghe) => {
      const action = {
        type: "THEM_DANH_SACH_VE",
        payload: ghe,
      };
      dispatch(action);
    },
    xoaDanhSachVe: () => {
      const action = {
        type: "XOA_DANH_SACH_VE",
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProp, mapDispatchToProp)(BookingPage);
