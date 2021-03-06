import {
  MOVIE_LIST_PAGE_REQUEST,
  MOVIE_LIST_PAGE_SUCCESS,
  MOVIE_LIST_PAGE_FAILED,
  MOVIE_LIST_REQUEST,
  MOVIE_LIST_SUCCESS,
  MOVIE_LIST_FAILED,
  DELETE_MOVIE_LIST_REQUEST,
  DELETE_MOVIE_LIST_SUCCESS,
  DELETE_MOVIE_LIST_FAILED,
  EDIT_MOVIE_LIST_REQUEST,
  EDIT_MOVIE_LIST_SUCCESS,
  EDIT_MOVIE_LIST_FAILED,
  GET_GROUP_THEATER_LIST_REQUEST,
  GET_GROUP_THEATER_LIST_SUCCESS,
  GET_GROUP_THEATER_LIST_FAILED,
  GET_THEATER_LIST_REQUEST,
  GET_THEATER_LIST_SUCCESS,
  GET_THEATER_LIST_FAILED,
} from "./constant";
import { format } from "date-fns";

let initialState = {
  // danh sách phim
  loadingDanhSachPhim: false,
  dataDanhSachPhim: null,
  errDanhSachPhim: null,
  // danh sách phim phân trang
  loadingDanhSachPhimPhanTrang: false,
  dataDanhSachPhimPhanTrang: null,
  errDanhSachPhimPhanTrang: null,
  // ds Hệ thống rạp
  groupTheaterList: [
    {
      value: "",
      label: "Select Group Theater",
    },
  ],
  // ds Cụm rạp
  theaterList: [
    {
      value: "",
      label: "Select Theater",
    },
  ],
  dataTheaterList: null,
  // ds Rạp
  roomList: [
    {
      value: "",
      label: "Select Room",
    },
  ],
  // Chọn mã hệ thống rạp
  chonMaHeThongRap: "",
  // Chọn mã cụm rạp
  chonMaCumRap: "",
  // Từ khóa search
  keyword: "",
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    // danh sách phim
    case MOVIE_LIST_REQUEST:
      state.loadingDanhSachPhim = true;
      state.dataDanhSachPhim = null;
      state.errDanhSachPhim = null;
      return { ...state };
    case MOVIE_LIST_SUCCESS:
      state.loadingDanhSachPhim = false;
      state.dataDanhSachPhim = action.payload;
      state.errDanhSachPhim = null;
      return { ...state };
    case MOVIE_LIST_FAILED:
      state.loadingDanhSachPhim = false;
      state.dataDanhSachPhim = null;
      state.errDanhSachPhim = action.payload;
      return { ...state };

    // danh sách phim phân trang
    case MOVIE_LIST_PAGE_REQUEST:
      state.loadingDanhSachPhimPhanTrang = true;
      state.dataDanhSachPhimPhanTrang = null;
      state.errDanhSachPhimPhanTrang = null;
      return { ...state };
    case MOVIE_LIST_PAGE_SUCCESS:
      state.loadingDanhSachPhimPhanTrang = false;
      state.dataDanhSachPhimPhanTrang = action.payload;
      state.errDanhSachPhimPhanTrang = null;
      return { ...state };
    case MOVIE_LIST_PAGE_FAILED:
      state.loadingDanhSachPhimPhanTrang = false;
      state.dataDanhSachPhimPhanTrang = null;
      state.errDanhSachPhimPhanTrang = action.payload;
      return { ...state };

    // Xóa phim
    case DELETE_MOVIE_LIST_REQUEST:
      return { ...state };
    case DELETE_MOVIE_LIST_SUCCESS:
      let obj = { ...state.dataDanhSachPhimPhanTrang };
      let arr1 = [...obj.items];
      const index1 = arr1.findIndex((i) => {
        return i.maPhim === action.payload.maPhim;
      });
      arr1.splice(index1, 1);
      obj.items = arr1;
      state.dataDanhSachPhimPhanTrang = obj;
      if (state.keyword) {
        let arr2 = [...state.dataDanhSachPhim];
        const index2 = arr2.findIndex((i) => {
          return i.maPhim === action.payload.maPhim;
        });
        arr2.splice(index2, 1);
        state.dataDanhSachPhim = arr2;
      }
      return { ...state };
    case DELETE_MOVIE_LIST_FAILED:
      return { ...state };

    // Cập nhật phim
    case EDIT_MOVIE_LIST_REQUEST:
      return { ...state };
    case EDIT_MOVIE_LIST_SUCCESS:
      let editDay = format(
        new Date(action.payload.ngayKhoiChieu),
        "yyyy-MM-dd"
      );
      editDay = editDay + "T00:00:00";
      action.payload.ngayKhoiChieu = editDay;
      let object = { ...state.dataDanhSachPhimPhanTrang };
      let array1 = [...object.items];
      const i1 = array1.findIndex((i) => {
        return i.maPhim === action.payload.maPhim;
      });
      array1[i1] = action.payload;
      object.items = array1;
      state.dataDanhSachPhimPhanTrang = object;
      if (state.keyword) {
        let array2 = [...state.dataDanhSachPhim];
        const i2 = array2.findIndex((i) => {
          return i.maPhim === action.payload.maPhim;
        });
        array2[i2] = action.payload;
        state.dataDanhSachPhim = array2;
      }
      return { ...state };
    case EDIT_MOVIE_LIST_FAILED:
      return { ...state };

    // Lấy thông tin Hệ thống rạp
    case GET_GROUP_THEATER_LIST_REQUEST:
      return { ...state };
    case GET_GROUP_THEATER_LIST_SUCCESS:
      let optionGroupTheaterArray = [...state.groupTheaterList];
      action.payload.map((item) => {
        optionGroupTheaterArray.push({
          value: item.maHeThongRap,
          label: item.tenHeThongRap,
        });
      });
      state.groupTheaterList = optionGroupTheaterArray;
      return { ...state };
    case GET_GROUP_THEATER_LIST_FAILED:
      return { ...state };

    // Lấy thông tin Cụm rạp và rạp
    case GET_THEATER_LIST_REQUEST:
      return { ...state };
    case GET_THEATER_LIST_SUCCESS:
      if (state.chonMaHeThongRap) {
        state.dataTheaterList = action.payload;
        let optionTheaterArray = [...state.theaterList];
        action.payload.map((item) => {
          optionTheaterArray.push({
            value: item.maCumRap,
            label: item.tenCumRap,
          });
        });
        state.theaterList = optionTheaterArray;
      }
      return { ...state };
    case GET_THEATER_LIST_FAILED:
      return { ...state };

    // Chọn mã Hệ thống rạp
    case "CHON_MA_HE_THONG_RAP":
      state.theaterList = [
        {
          value: "",
          label: "Select Theater",
        },
      ];
      state.roomList = [
        {
          value: "",
          label: "Select Room",
        },
      ];
      state.chonMaHeThongRap = action.payload;

      return { ...state };

    // Chọn mã cụm rạp
    case "CHON_MA_CUM_RAP":
      state.roomList = [
        {
          value: "",
          label: "Select Room",
        },
      ];
      if (action.payload) {
        state.chonMaCumRap = action.payload;

        let list = [...state.dataTheaterList];
        let optionRoomArray = [...state.roomList];
        if (state.chonMaCumRap && state.dataTheaterList) {
          let indexRap = list.findIndex((item) => {
            return item.maCumRap === state.chonMaCumRap;
          });
          if (indexRap !== -1) {
            list[indexRap].danhSachRap.map((item) => {
              optionRoomArray.push({
                value: item.maRap,
                label: item.tenRap,
              });
            });
          }
        }
        state.roomList = optionRoomArray;
      }
      return { ...state };

    // Tìm kiếm phim
    case "TIM_KIEM_PHIM":
      state.keyword = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default dashboardReducer;
