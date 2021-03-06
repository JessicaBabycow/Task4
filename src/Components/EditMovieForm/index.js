import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import FormControl from "../../Helper/Form/FormControl";
import { format } from "date-fns";

function EditMovieForm(props) {
  const { movieEdit, capNhatPhim, actAddPictureMovieApi, setModal } = props;
  const [pic, setPic] = useState({ name: "abc.jpg", file: null });

  const validationSchema = yup.object({
    tenPhim: yup.string().required("(*) Tên phim is required !"),
    biDanh: yup.string().notRequired(),
    trailer: yup.string().notRequired(),
    hinhAnh: yup
      .mixed()
      .test("fileSize", "(*) Hình ảnh is required !", (value) => {
        if (!value.length) return true;
        return value[0].size > 0;
      }),
    moTa: yup.string().notRequired(),
    ngayKhoiChieu: yup.string().required("(*) Ngày khởi chiếu is required !"),
    danhGia: yup.number().notRequired().positive().integer().min(0).max(10),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (value) => {
    let arr = [];
    let picName = "";
    if (pic.name !== "abc.jpg") {
      arr = movieEdit?.hinhAnh?.split("/");
      setPic({ ...pic, name: arr[arr.length - 1] });
    }
    let day = value.ngayKhoiChieu;
    day = format(new Date(day), "dd/MM/yyyy");

    await capNhatPhim(
      {
        maPhim: movieEdit?.maPhim,
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

  const getDay = () => {
    let today = new Date(movieEdit?.ngayKhoiChieu);
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();
    let day = yyyy + "-" + mm + "-" + dd;
    return day;
  };

  return (
    <div className="editMovieForm">
      <div className="editMovieForm__content">
        <h2 className="editMovieForm__title">Edit User</h2>
        <form className="editMovieForm__form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            control="input"
            id="tenPhim"
            name="tenPhim"
            type="text"
            defaultValue={movieEdit?.tenPhim}
            placeholder="Tên phim"
            register={register}
            error={errors.tenPhim}
          />
          <FormControl
            control="input"
            id="biDanh"
            name="biDanh"
            type="text"
            defaultValue={movieEdit?.biDanh}
            placeholder="Bí danh"
            register={register}
            error={errors.biDanh}
          />
          <FormControl
            control="input"
            id="trailer"
            name="trailer"
            type="text"
            defaultValue={movieEdit?.trailer}
            placeholder="Trailer"
            register={register}
            error={errors.trailer}
          />
          <FormControl
            control="input"
            id="hinhAnh"
            name="hinhAnh"
            type="file"
            placeholder="Hình ảnh"
            // defaultValue={movieEdit?.hinhAnh.slice(42)}
            onChange={fileSelectedHandler}
            register={register}
            error={errors.hinhAnh}
          />
          <FormControl
            control="textarea"
            id="moTa"
            name="moTa"
            type="text"
            defaultValue={movieEdit?.moTa}
            placeholder="Mô tả"
            register={register}
            error={errors.moTa}
          />
          <FormControl
            control="input"
            id="ngayKhoiChieu"
            name="ngayKhoiChieu"
            type="date"
            defaultValue={getDay()}
            placeholder="Ngày khởi chiếu"
            register={register}
            error={errors.ngayKhoiChieu}
          />
          <FormControl
            control="input"
            id="danhGia"
            name="danhGia"
            type="number"
            defaultValue={movieEdit?.danhGia}
            placeholder="Đánh giá"
            register={register}
            error={errors.danhGia}
          />
          <button className="editMovieForm__button" type="submit">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMovieForm;
