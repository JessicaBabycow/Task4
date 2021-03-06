import React from "react";
import { Link } from "react-router-dom";

function TabsDetailPage(props) {
  const tk = JSON.parse(localStorage.getItem("User"));
  const {
    id,
    movieDetail,
    theaterGroupList,
    setTheaterGroupName,
    getTheaterList,
    theaterList,
    setTheaterList,
  } = props;

  const renderLogo = () => {
    return theaterGroupList.map((item, index) => {
      return (
        <li key={index} className="tabsDetailPage__colOne__list">
          <a
            onClick={() => {
              setTheaterGroupName(item.maHeThongRap);
              getTheaterList(item.maHeThongRap, setTheaterList);
            }}
          >
            <img src={item?.logo} />
            <span>{item.tenHeThongRap}</span>
          </a>
        </li>
      );
    });
  };

  const renderMovieList = () => {
    return theaterList?.map((item, index) => {
      return (
        <div key={index} className="tabsDetailPage__colThree__list">
          <div className="tabsDetailPage__colThree__list__content">
            <div className="row">
              <img src="./../image/cinema.jpg" />
              <div style={{ margin: "0 0 10px 10px" }}>
                <p className="tabsDetailPage__colThree__list__content__title">
                  {item.tenCumRap}
                </p>
                <p>{item.diaChi}</p>
              </div>
            </div>
            <div>{renderMovieTime(item.maCumRap)}</div>
          </div>
        </div>
      );
    });
  };

  const renderMovieTime = (maCumRap) => {
    return movieDetail?.lichChieu?.map((i) => {
      if (maCumRap === i?.thongTinRap?.maCumRap) {
        return (
          <Link
            key={i.maLichChieu}
            to={tk ? `/booking/${i.maLichChieu}` : `/detail/${id}`}
            className="tabsDetailPage__colThree__list__button"
            onClick={() => {
              if (!tk) {
                alert("Please sign in to book tickets !");
              }
            }}
          >
            {new Date(i.ngayChieuGioChieu).toLocaleTimeString()}
          </Link>
        );
      }
    });
  };

  return (
    <div className="tabsDetailPage row">
      <div className="tabsDetailPage__colOne col-3">
        <ul>{renderLogo()}</ul>
      </div>
      <div className="tabsDetailPage__colThree col-9">{renderMovieList()}</div>
    </div>
  );
}

export default TabsDetailPage;
