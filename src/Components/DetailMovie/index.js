import React from "react";
import { Link as LinkScroll } from "react-scroll";
// import { Doughnut } from "react-chartjs-2";

function DetailMovie(props) {
  const { movieDetail, setModalVideo } = props;

  // const dataDoughnut = {
  //   // labels: ["Jan", "Feb"],
  //   datasets: [
  //     {
  //       labels: ["IMDb", "IMDb"],
  //       // data: [3, 2, 2, 1, 5],
  //       data: [movieDetail?.danhGia, 10 - movieDetail?.danhGia],
  //       backgroundColor: ["#5273e0", "#161d40"],
  //       borderWidth: 0,
  //     },
  //   ],
  // };

  // const optionsDoughnut = {
  //   responsive: true,
  //   title: {
  //     display: true,
  //     // text: "Doughnut Chart",
  //   },
  // };

  return (
    <div className="detailMovie row">
      <div className="detailMovie__left col-7">
        <div className="row">
          <div className="detailMovie__picture col-4">
            <img src={movieDetail?.hinhAnh} />
          </div>
          <div className="detailMovie__content col-8">
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
      <div className="detailMovie__right col-5">
        {/* <Doughnut data={dataDoughnut} options={optionsDoughnut} /> */}
        <div></div>
      </div>
    </div>
  );
}

export default DetailMovie;
