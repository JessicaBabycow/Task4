import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "../../Helper/Form/FormControl";
import { format } from "date-fns";

function RoomMovieForm(props) {
  const {
    movieRoom,
    layThongTinHeThongRap,
    layThongTinCumRap,
    chonMaHeThongRap,
    chonMaCR,
    groupTheaterList,
    theaterList,
    roomList,
    actTaoLichChieuApi,
    setModal,
  } = props;

  useEffect(() => {
    layThongTinHeThongRap();
  }, []);

  const validationSchema = yup.object({
    heThongRap: yup.string().required("(*) Hệ thống rạp is required !"),
    cumRap: yup.string().required("(*) Cụm rạp is required !"),
    rap: yup.string().required("(*) Rạp is required !"),
    ngayChieu: yup.string().required("(*) Ngày chiếu is required !"),
    gioChieu: yup.string().required("(*) Giờ chiếu is required !"),
    giaVe: yup
      .number()
      .required("(*) Giá vé is required !")
      .positive()
      .integer()
      .min(75000)
      .max(200000),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (value) => {
    let ngayChieuGioChieu = "";
    if (value.ngayChieu !== "" && value.gioChieu !== "") {
      ngayChieuGioChieu = format(new Date(value.ngayChieu), "dd/MM/yyyy")
        .concat(" ", value.gioChieu)
        .concat(":00");
    }
    actTaoLichChieuApi(
      {
        maPhim: movieRoom?.maPhim,
        ngayChieuGioChieu: ngayChieuGioChieu,
        maRap: +value.rap,
        giaVe: +value.giaVe,
      },
      setModal
    );
  };

  return (
    <div className="roomMovieForm">
      <div className="roomMovieForm__content">
        <h2 className="roomMovieForm__title">Tạo lịch chiếu</h2>
        <form className="roomMovieForm__form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control="select"
            id="heThongRap"
            name="heThongRap"
            type="text"
            label="Chọn hệ thống rạp"
            placeholder="Chọn hệ thống rạp"
            options={groupTheaterList}
            register={register}
            error={errors.heThongRap}
            onChange={(e) => {
              chonMaHeThongRap(e.target.value);
              layThongTinCumRap(e.target.value);
            }}
          />
          <FormControl
            control="select"
            id="cumRap"
            name="cumRap"
            type="text"
            label="Chọn cụm rạp"
            placeholder="Chọn cụm rạp"
            options={theaterList}
            register={register}
            error={errors.cumRap}
            onChange={(e) => {
              chonMaCR(e.target.value);
            }}
          />
          <FormControl
            control="select"
            id="rap"
            name="rap"
            type="text"
            label="Chọn rạp"
            placeholder="Chọn rạp"
            options={roomList}
            register={register}
            error={errors.rap}
            onChange={(e) => {}}
          />

          <FormControl
            control="input"
            id="ngayChieu"
            name="ngayChieu"
            type="date"
            label="Chọn ngày chiếu"
            placeholder="Ngày chiếu"
            register={register}
            error={errors.ngayChieu}
          />
          <FormControl
            control="input"
            id="gioChieu"
            name="gioChieu"
            type="time"
            label="Chọn giờ chiếu"
            placeholder="Giờ chiếu"
            register={register}
            error={errors.gioChieu}
          />
          <FormControl
            control="input"
            id="giaVe"
            name="giaVe"
            type="number"
            label="Giá vé"
            placeholder="Giá vé"
            register={register}
            error={errors.giaVe}
          />
          <button className="roomMovieForm__button" type="submit">
            Tạo
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomMovieForm;
