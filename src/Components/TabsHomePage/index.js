import React from "react";
import { Link } from "react-router-dom";

function TabsHomePage(props) {
  const tk = JSON.parse(localStorage.getItem("User"));
  const {
    movieDetail,
    theaterGroupName,
    setTheaterGroupName,
    theaterName,
    setTheaterName,
  } = props;

  const renderLogo = () => {
    return movieDetail?.map((item, index) => {
      return (
        <li key={index} className="tabsHomePage__colOne__list">
          <a
            onClick={() => {
              setTheaterGroupName(item.maHeThongRap);
              const cumRap = movieDetail.find((i) => {
                return i.maHeThongRap === item.maHeThongRap;
              });
              setTheaterName(cumRap.lstCumRap[0].maCumRap);
            }}
          >
            <img src={item?.logo} />
          </a>
        </li>
      );
    });
  };

  const renderTheaterName = () => {
    const theaterList = movieDetail?.find((item) => {
      return item.maHeThongRap === theaterGroupName;
    });
    return theaterList?.lstCumRap?.map((item, index) => {
      return (
        <div
          key={index}
          className="tabsHomePage__colTwo__list"
          onClick={() => {
            setTheaterName(item.maCumRap);
          }}
        >
          {item.tenCumRap}
        </div>
      );
    });
  };

  const renderMovieList = () => {
    const theaterList = movieDetail?.find((item) => {
      return item.maHeThongRap === theaterGroupName;
    });
    const movieList = theaterList?.lstCumRap?.find((item) => {
      return item.maCumRap === theaterName;
    });
    return movieList?.danhSachPhim?.map((item, index) => {
      return (
        <div key={index} className="tabsHomePage__colThree__list">
          <div className="tabsHomePage__colThree__list__content">
            <div className="row">
              <img src={item.hinhAnh} />
              <h5>{item.tenPhim}</h5>
            </div>
            <div>{renderMovieTime(item)}</div>
          </div>
        </div>
      );
    });
  };

  const renderMovieTime = (item) => {
    return item?.lstLichChieuTheoPhim?.map((i) => {
      return (
        <Link
          key={i.maLichChieu}
          to={tk ? `/booking/${i.maLichChieu}` : ""}
          className="tabsHomePage__colThree__list__button"
          onClick={() => {
            if (!tk) {
              alert("Please sign in to book tickets !");
            }
          }}
        >
          {new Date(i.ngayChieuGioChieu).toLocaleTimeString()}
        </Link>
      );
    });
  };

  return (
    <div className="tabsHomePage row">
      <div className="tabsHomePage__colOne col-1">
        <ul>{renderLogo()}</ul>
      </div>
      <div className="tabsHomePage__colTwo col-3">{renderTheaterName()}</div>
      <div className="tabsHomePage__colThree col-8">{renderMovieList()}</div>
    </div>
  );
}

export default TabsHomePage;
