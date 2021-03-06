import React, { useState, useEffect } from "react";
import {
  getMovieList,
  getMovieDetail,
  layThongTinLichChieuPhimApi,
} from "./module/action";
import Slider from "react-slick";
import { settings } from "./module/settings";
import { animateScroll as BackToTop } from "react-scroll";
import { BsBoxArrowUp } from "react-icons/bs";

import MovieCard from "../../../Components/MovieCard";
import Loader from "../../../Components/Loader";
import TabsHomePage from "../../../Components/TabsHomePage";
import CarouselSlider from "../../../Components/CarouselSlider";
import News from "../../../Components/News";
import SearchHome from "../../../Components/SearchHome";

function HomePage() {
  let mybutton = document.getElementById("backToTop");
  const scrollFunction = () => {
    if (mybutton) {
      if (
        document.body.scrollTop > 2000 ||
        document.documentElement.scrollTop > 20
      ) {
        mybutton.style.display = "block";
      } else {
        mybutton.style.display = "none";
      }
    }
  };
  window.onscroll = () => {
    scrollFunction();
  };
  // Danh sách phim
  const [movieList, setMovieList] = useState(null);

  // Thông tin phim
  const [movieDetail, setMovieDetail] = useState(null);

  // Mã cụm rạp
  const [theaterGroupName, setTheaterGroupName] = useState("BHDStar");

  // Mã rạp
  const [theaterName, setTheaterName] = useState("bhd-star-cineplex-pham-hung");

  // Thông tin lịch chiếu phim
  const [thongTinLichChieuPhim, setThongTinLichChieuPhim] = useState(null);

  useEffect(() => {
    getMovieList(setMovieList);
    getMovieDetail(setMovieDetail);
  }, []);

  const renderMovieList = () => {
    if (movieList && movieList.length > 0) {
      return movieList.map((item) => {
        return <MovieCard key={item.maPhim} item={item} />;
      });
    }
  };

  const renderSlider = () => {
    return <Slider {...settings}>{renderMovieList()}</Slider>;
  };

  if (!movieList) return <Loader />;
  return (
    <div className="homePage">
      <div className="homePage__carouselSlider">
        <CarouselSlider />
      </div>
      <div className="container">
        {/* <div className="homePage__component">
          <SearchHome
            movieDetail={movieDetail}
            layThongTinLichChieuPhimApi={layThongTinLichChieuPhimApi}
            thongTinLichChieuPhim={thongTinLichChieuPhim}
            setThongTinLichChieuPhim={setThongTinLichChieuPhim}
          />
        </div> */}
        <div id="movies" className="homePage__component">
          <div
            style={{
              color: "white",
              fontSize: "30px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            Movies
          </div>
          {renderSlider()}
        </div>
        <div id="showtimes" className="homePage__component">
          <div
            style={{
              color: "white",
              fontSize: "30px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            Showtimes
          </div>
          <TabsHomePage
            movieDetail={movieDetail}
            theaterGroupName={theaterGroupName}
            setTheaterGroupName={setTheaterGroupName}
            theaterName={theaterName}
            setTheaterName={setTheaterName}
          />
        </div>
        <div
          id="news"
          className="homePage__component"
          style={{ marginBottom: "70px" }}
        >
          <News />
        </div>
        <div className="homePage__backToTop" id="backToTop">
          <BsBoxArrowUp
            className="homePage__backToTop__icon"
            onClick={() => {
              BackToTop.scrollToTop();
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
