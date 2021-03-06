import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "../../Helper/Form/FormControl";
import { format } from "date-fns";

function AddMovieForm(props) {
  const { actThemPhimApi, actAddPictureMovieApi, setModal } = props;

  const [pic, setPic] = useState({ name: "abc.jpg", file: null });

  const validationSchema = yup.object({
    tenPhim: yup.string().required("(*) Tên phim is required !"),
    trailer: yup.string().notRequired(),
    hinhAnh: yup
      .mixed()
      .test("fileSize", "(*) Hình ảnh is required !", (value) => {
        if (!value.length) return false;
        return value[0].size > 0;
      }),
    moTa: yup.string().notRequired(),
    ngayKhoiChieu: yup.string().required("(*) Ngày khởi chiếu is required !"),
    danhGia: yup.string().notRequired(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (value) => {
    let day = value.ngayKhoiChieu;
    day = format(new Date(day), "dd/MM/yyyy");

    await actThemPhimApi(
      {
        maPhim: 0,
        tenPhim: value.tenPhim,
        biDanh: value.biDanh,
        trailer: value.trailer,
        hinhAnh: pic.name,
        moTa: value.moTa,
        maNhom: "GP09",
        ngayKhoiChieu: day,
        danhGia: value.danhGia,
      },
      setModal
    );

    let frm = new FormData();
    if (pic.file) {
      await frm.append("File", pic.file, pic.name);
      await frm.append("tenPhim", value.tenPhim);
      await frm.append("maNhom", "GP09");
      actAddPictureMovieApi(frm);
    }
  };

  const fileSelectedHandler = (e) => {
    setPic({ ...pic, name: e.target.files[0].name, file: e.target.files[0] });
  };

  return (
    <div className="addMovieForm">
      <div className="addMovieForm__content">
        <h2 className="addMovieForm__title">Thêm phim</h2>
        <form className="addMovieForm__form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control="input"
            id="tenPhim"
            name="tenPhim"
            type="text"
            placeholder="Tên phim"
            register={register}
            error={errors.tenPhim}
          />
          <FormControl
            control="input"
            id="hinhAnh"
            name="hinhAnh"
            type="file"
            placeholder="Hình ảnh"
            onChange={fileSelectedHandler}
            register={register}
            error={errors.hinhAnh}
          />
          <FormControl
            control="input"
            id="ngayKhoiChieu"
            name="ngayKhoiChieu"
            type="date"
            placeholder="Ngày khởi chiếu"
            register={register}
            error={errors.ngayKhoiChieu}
          />
          <FormControl
            control="input"
            id="trailer"
            name="trailer"
            type="text"
            placeholder="Trailer"
            register={register}
            error={errors.trailer}
          />
          <FormControl
            control="input"
            id="danhGia"
            name="danhGia"
            type="number"
            placeholder="Đánh giá"
            register={register}
            error={errors.danhGia}
          />
          <FormControl
            control="textarea"
            id="moTa"
            name="moTa"
            type="text"
            placeholder="Mô tả"
            register={register}
            error={errors.moTa}
          />
          <button className="loginUserForm__button" type="submit">
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMovieForm;
