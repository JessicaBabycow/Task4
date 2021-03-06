import React, { useEffect, useState } from "react";
import Select from "react-select";

function SearchHome(props) {
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
  const [dsMLC, setDSMCL] = useState([]);

  let option1 = [];

  useEffect(() => {
    renderOption2();
    setDSNgayXem([]);
    setDSGioXem([]);
  }, [thongTinLichChieuPhim]);

  useEffect(() => {
    if (maRap) {
      renderOption3();
      //   console.log(dsNgayXem);
    }
  }, [maRap]);

  useEffect(() => {
    if (ngayXem) {
      renderOption4();
      //   console.log(dsGioXem);
    }
  }, [ngayXem]);

  useEffect(() => {
    if (gioXem) {
      timMaLichChieu();
      console.log(dsMLC);
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
              dsMa.push({
                maLichChieu: ngay.maLichChieu,
              });
            }
          });
        }
      });
    });
    setDSMCL(dsMa);
  };
  return (
    <div className="searchHome">
      <Select
        options={option1}
        onChange={(value) => {
          layThongTinLichChieuPhimApi(value.value, setThongTinLichChieuPhim);
        }}
      />
      <Select
        options={dsMaRap}
        onChange={(value) => {
          setMaRap(value.value);
        }}
      />
      <Select
        options={dsNgayXem}
        onChange={(value) => {
          setNgayXem(value.value);
        }}
      />
      <Select
        options={dsGioXem}
        onChange={(value) => {
          setGioXem(value.value);
        }}
      />
    </div>
  );
}

export default SearchHome;
