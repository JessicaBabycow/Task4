import React, { Fragment } from "react";

function SeatList(props) {
  const { bookingRoomDetail, addBookingSeatList } = props;

  let gheChan = "16";

  const xuongHangGhe = (tenGhe) => {
    if (tenGhe === gheChan) {
      gheChan = (parseFloat(gheChan) + 16).toString();
      return <br />;
    }
    return;
  };

  const setGheDangDat = (colorThuong, colorVip, style, className) => {
    if (style.backgroundColor === "rgb(19, 22, 41)") {
      style.backgroundColor = colorThuong;
      style.color = colorThuong;
      style.border = `2px solid ${colorThuong}`;
    } else {
      if (className === "seatList__thuong") {
        style.backgroundColor = "#131629";
        style.color = colorThuong;
        style.border = `2px solid ${colorThuong}`;
      } else if (className === "seatList__vip") {
        style.backgroundColor = "#131629";
        style.color = colorVip;
        style.border = `2px solid ${colorVip}`;
      }
    }
  };

  const renderSeatList = () => {
    if (bookingRoomDetail?.danhSachGhe?.length > 0) {
      return bookingRoomDetail.danhSachGhe.map((item) => {
        return (
          <Fragment key={item.maGhe}>
            {item.daDat ? (
              <button className="seatList__daDat" disabled>
                {item.tenGhe}
              </button>
            ) : (
              <button
                className={
                  item.loaiGhe === "Thuong"
                    ? "seatList__thuong"
                    : "seatList__vip"
                }
                style={{ backgroundColor: "#131629" }}
                onClick={(e) => {
                  setGheDangDat(
                    "#d2e0fa",
                    "#f37370",
                    e.target.style,
                    e.target.className
                  );
                  addBookingSeatList(item);
                }}
              >
                {item.tenGhe}
              </button>
            )}
            {xuongHangGhe(item.tenGhe)}
          </Fragment>
        );
      });
    }
  };

  return (
    <div className="seatList">
      <div className="seatList__screen"></div>
      {renderSeatList()}
      <div className="seatList__chuThich">
        <span>
          <button className="seatList__thuong">-</button> : Standard
        </span>
        <span>
          <button className="seatList__vip">-</button> : Vip
        </span>
        <span>
          <button className="seatList__dangDat">-</button> : Booking
        </span>
        <span>
          <button className="seatList__daDat">-</button> : Booked
        </span>
      </div>
    </div>
  );
}

export default SeatList;
