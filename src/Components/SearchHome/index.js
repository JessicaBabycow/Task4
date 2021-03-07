import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

function SearchHome(props) {
  const tk = JSON.parse(localStorage.getItem("User"));

  const {
    movieDetail,
    layThongTinLichChieuPhimApi,
    thongTinLichChieuPhim,
    setThongTinLichChieuPhim,
  } = props;

  //   const [maPhim, setMaRap] = useState(null);
  const [maRap, setMaRap] = useState(null);
  const [ngayXem, setNgayXem] = useState(null);
  const [gioXem, setGioXem] = useState(null);

  const [dsMaRap, setDSMaRap] = useState([]);
  const [dsNgayXem, setDSNgayXem] = useState([]);
  const [dsGioXem, setDSGioXem] = useState([]);
  const [dsMLC, setDSMCL] = useState(null);

  let option1 = [];

  useEffect(() => {
    renderOption2();
    setDSNgayXem([]);
    setDSGioXem([]);
    setDSMCL(null);
  }, [thongTinLichChieuPhim]);

  useEffect(() => {
    if (maRap) {
      renderOption3();
      setDSGioXem([]);
      setDSMCL(null);
    }
  }, [maRap]);

  useEffect(() => {
    if (ngayXem) {
      renderOption4();
    }
  }, [ngayXem]);

  useEffect(() => {
    if (gioXem) {
      timMaLichChieu();
    }
  }, [gioXem]);

  const renderOption1 = () => {
    movieDetail?.map((item) => {
      item?.lstCumRap?.map((i) => {
        i?.danhSachPhim?.map((phim) => {
          option1.push({ value: phim.maPhim, label: phim.tenPhim });
        });
      });
    });
  };
  renderOption1();

  const renderOption2 = () => {
    let dsRap = [];
    thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
      item?.cumRapChieu?.map((i) => {
        dsRap.push({ value: i.maCumRap, label: i.tenCumRap });
      });
    });
    setDSMaRap(dsRap);
  };

  const renderOption3 = () => {
    let dsNgay = [];
    thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
      item?.cumRapChieu?.map((i) => {
        if (i.maCumRap === maRap) {
          i?.lichChieuPhim.map((ngay) => {
            dsNgay.push({
              value: ngay.ngayChieuGioChieu,
              label: new Date(ngay.ngayChieuGioChieu).toLocaleDateString(),
            });
          });
        }
      });
    });
    setDSNgayXem(dsNgay);
  };

  const renderOption4 = () => {
    let dsGio = [];
    dsNgayXem.map((item) => {
      dsGio.push({
        value: item.value,
        label: new Date(item.value).toLocaleTimeString(),
      });
    });
    setDSGioXem(dsGio);
  };

  const timMaLichChieu = () => {
    let dsMa = [];
    thongTinLichChieuPhim?.heThongRapChieu?.map((item) => {
      item?.cumRapChieu?.map((i) => {
        if (i.maCumRap === maRap) {
          i?.lichChieuPhim.map((ngay) => {
            if (ngay.ngayChieuGioChieu === gioXem) {
              setDSMCL(ngay.maLichChieu);
            }
          });
        }
      });
    });
  };

  return (
    <div className="searchHome">
      <div className="searchHome__title">What are you looking for ?</div>
      <div className="searchHome__list">
        <Select
          className="searchHome__list__select"
          options={option1}
          onChange={(value) => {
            layThongTinLichChieuPhimApi(value.value, setThongTinLichChieuPhim);
          }}
        />
        <Select
          className="searchHome__list__select"
          options={dsMaRap}
          onChange={(value) => {
            setMaRap(value.value);
          }}
        />
        <Select
          className="searchHome__list__select"
          options={dsNgayXem}
          onChange={(value) => {
            setNgayXem(value.value);
          }}
        />
        <Select
          className="searchHome__list__select"
          options={dsGioXem}
          onChange={(value) => {
            setGioXem(value.value);
          }}
        />
        {dsMLC ? (
          <button
            className="searchHome__list__button"
            onClick={() => {
              console.log(dsMLC);
            }}
          >
            <Link
              to={tk ? `/booking/${dsMLC}` : ""}
              onClick={() => {
                if (!tk) {
                  alert("Please sign in to book tickets !");
                }
              }}
            >
              Booking
            </Link>
          </button>
        ) : (
          <button className="searchHome__list__button" disabled>
            Booking
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchHome;
