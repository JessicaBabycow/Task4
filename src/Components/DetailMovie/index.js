import React from "react";
import { Link as LinkScroll } from "react-scroll";
// import { Doughnut } from "react-chartjs-2";

function DetailMovie(props) {
  const { movieDetail, setModalVideo } = props;

  return (
    <div className="detailMovie row">
      <div className="detailMovie__left col-xs-7 col-lg-7">
        <div className="row">
          <div className="detailMovie__picture col-xs-12 col-lg-4">
            <img src={movieDetail?.hinhAnh} />
          </div>
          <div className="detailMovie__content col-xs-12 col-lg-8">
            <p>{new Date(movieDetail?.ngayKhoiChieu).toLocaleDateString()}</p>
            <p className="detailMovie__content__name">
              <span className="detailMovie__content__span">C18</span>
              {movieDetail?.tenPhim}
            </p>
            <p>
              100 mins - <span> {movieDetail?.danhGia} IMDb - 2D/Digital</span>
            </p>
            <button
              className="detailMovie__trailerButton"
              onClick={() => {
                setModalVideo(movieDetail?.trailer);
              }}
            >
              Watch Trailer
            </button>
            <LinkScroll
              to="tabsDetailPage"
              smooth={true}
              duration={1000}
              className="detailMovie__bookingButton"
            >
              Booking
            </LinkScroll>
          </div>
        </div>
      </div>
      <div className="detailMovie__right col-xs-5 col-lg-5">
        <div></div>
      </div>
    </div>
  );
}

export default DetailMovie;
