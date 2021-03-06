import React from "react";

function BookingMovieDetail(props) {
  const {
    bookingRoomDetail,
    danhSachVe,
    tk,
    maLichChieu,
    actBookingTicketApi,
    history,
    xoaDanhSachVe,
  } = props;

  const total = () => {
    let sum = 0;
    if (danhSachVe?.length > 0) {
      danhSachVe.forEach((i) => {
        sum += i.giaVe;
      });
    }
    return sum;
  };

  const renderTable = () => {
    return danhSachVe?.map((item) => {
      return (
        <tr key={item.tenGhe}>
          <td>{item.tenGhe}</td>
          <td>{item.giaVe}</td>
        </tr>
      );
    });
  };

  const bookingSubmit = () => {
    let z = window.confirm("Are you sure to book these tickets ?");
    if (z) {
      let dsVe = [];
      danhSachVe.map((item) => {
        dsVe.push({ maGhe: item.maGhe, giaVe: item.giaVe });
      });
      actBookingTicketApi(
        {
          maLichChieu: maLichChieu,
          danhSachVe: dsVe,
          taiKhoanNguoiDung: tk?.taiKhoan,
        },
        history,
        xoaDanhSachVe
      );
    } else {
      return;
    }
    // let dsVe = [];
    // danhSachVe.map((item) => {
    //   dsVe.push({ maGhe: item.maGhe, giaVe: item.giaVe });
    // });
    // actBookingTicketApi(
    //   {
    //     maLichChieu: maLichChieu,
    //     danhSachVe: dsVe,
    //     taiKhoanNguoiDung: tk?.taiKhoan,
    //   },
    //   history,
    //   xoaDanhSachVe
    // );
  };

  return (
    <div className="bookingMovieDetail">
      <div className="bookingMovieDetail__content">
        <div className="">
          <img src={bookingRoomDetail?.thongTinPhim?.hinhAnh} />
        </div>
        <div className="bookingMovieDetail__content__name">
          <h4>{bookingRoomDetail?.thongTinPhim?.tenPhim}</h4>
          <p>{bookingRoomDetail?.thongTinPhim?.tenCumRap}</p>
          <p>{bookingRoomDetail?.thongTinPhim?.tenRap}</p>
          <p>
            {bookingRoomDetail?.thongTinPhim?.ngayChieu} -{" "}
            {bookingRoomDetail?.thongTinPhim?.gioChieu}
          </p>
        </div>
      </div>
      <div className="bookingMovieDetail__table">
        <table>
          <thead>
            <tr>
              <th>Seat</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{renderTable()}</tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td>{total()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      {danhSachVe.length > 0 ? (
        <button className="bookingMovieDetail__button" onClick={bookingSubmit}>
          Booking Now !
        </button>
      ) : (
        <button className="bookingMovieDetail__button" disabled>
          Booking Now !
        </button>
      )}
    </div>
  );
}

export default BookingMovieDetail;
