import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_PAGE_REQUEST,
  USER_LIST_PAGE_SUCCESS,
  USER_LIST_PAGE_FAILED,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILED,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_FAILED,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILED,
} from "./constant";

let initialState = {
  // Lấy danh sách user
  loadingDanhSachNguoiDung: false,
  dataDanhSachNguoiDung: null,
  errDanhSachNguoiDung: null,
  // Lấy danh sách user phân trang
  loadingDanhSachNguoiDungPhanTrang: false,
  dataDanhSachNguoiDungPhanTrang: null,
  errDanhSachNguoiDungPhanTrang: null,
  keyword: "",
};

const userManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    // Lấy danh sách user
    case USER_LIST_REQUEST:
      state.loadingDanhSachNguoiDung = true;
      state.dataDanhSachNguoiDung = null;
      state.errDanhSachNguoiDung = null;
      return { ...state };
    case USER_LIST_SUCCESS:
      state.loadingDanhSachNguoiDung = false;
      state.dataDanhSachNguoiDung = action.payload;
      state.errDanhSachNguoiDung = null;
      return { ...state };
    case USER_LIST_FAILED:
      state.loadingDanhSachNguoiDung = false;
      state.dataDanhSachNguoiDung = null;
      state.errDanhSachNguoiDung = action.payload;
      return { ...state };

    // Lấy danh sách user phân trang
    case USER_LIST_PAGE_REQUEST:
      state.loadingDanhSachNguoiDungPhanTrang = true;
      state.dataDanhSachNguoiDungPhanTrang = null;
      state.errDanhSachNguoiDungPhanTrang = null;
      return { ...state };
    case USER_LIST_PAGE_SUCCESS:
      state.loadingDanhSachNguoiDungPhanTrang = false;
      state.dataDanhSachNguoiDungPhanTrang = action.payload;
      state.errDanhSachNguoiDungPhanTrang = null;
      return { ...state };
    case USER_LIST_PAGE_FAILED:
      state.loadingDanhSachNguoiDungPhanTrang = false;
      state.dataDanhSachNguoiDungPhanTrang = null;
      state.errDanhSachNguoiDungPhanTrang = action.payload;
      return { ...state };

    // Edit user
    case EDIT_USER_REQUEST:
      return { ...state };
    case EDIT_USER_SUCCESS:
      let object = { ...state.dataDanhSachNguoiDungPhanTrang };
      let array1 = [...object.items];
      const i1 = array1.findIndex((i) => {
        return i.taiKhoan === action.payload.taiKhoan;
      });
      array1[i1] = action.payload;
      object.items = array1;
      state.dataDanhSachNguoiDungPhanTrang = object;
      if (state.keyword) {
        let array2 = [...state.dataDanhSachNguoiDung];
        const i2 = array2.findIndex((i) => {
          return i.taiKhoan === action.payload.taiKhoan;
        });
        array2[i2] = action.payload;
        state.dataDanhSachNguoiDung = array2;
      }
      return { ...state };
    case EDIT_USER_FAILED:
      return { ...state };

    // Add user
    case ADD_USER_REQUEST:
      return { ...state };
    case ADD_USER_SUCCESS:
      return { ...state };
    case ADD_USER_FAILED:
      return { ...state };

    // Delete user
    case DELETE_USER_REQUEST:
      return { ...state };
    case DELETE_USER_SUCCESS:
      let obj = { ...state.dataDanhSachNguoiDungPhanTrang };
      let arr1 = [...obj.items];
      const index1 = arr1.findIndex((i) => {
        return i.taiKhoan === action.payload.taiKhoan;
      });
      arr1.splice(index1, 1);
      obj.items = arr1;
      state.dataDanhSachNguoiDungPhanTrang = obj;
      if (state.keyword) {
        let arr2 = [...state.dataDanhSachNguoiDung];
        const index2 = arr2.findIndex((i) => {
          return i.taiKhoan === action.payload.taiKhoan;
        });
        arr2.splice(index2, 1);
        state.dataDanhSachNguoiDung = arr2;
      }
      return { ...state };
    case DELETE_USER_FAILED:
      return { ...state };

    case "TIM_KIEM_NGUOI_DUNG":
      state.keyword = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};

export default userManagementReducer;
