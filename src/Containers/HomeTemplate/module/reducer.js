import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
} from "./constant";
let initialState = {
  modal: false,
  modalVideo: false,
  modalVideoUrl: "",
  loadingUserLogin: false,
  dataUserLogin: null,
  errUserLogin: null,
};

const homeTemplateReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MODAL":
      state.modal = !state.modal;
      return { ...state };
    case "SET_MODAL_VIDEO":
      state.modalVideo = !state.modalVideo;
      state.modalVideoUrl = action.payload;
      return { ...state };
    case "LOG_OUT_USER":
      localStorage.removeItem("User");
      state.dataUserLogin = null;
      return { ...state };
    case "LOG_IN_USER":
      const tk = JSON.parse(localStorage.getItem("User"));
      state.dataUserLogin = tk;
      return { ...state };
    case USER_LOGIN_REQUEST:
      state.loadingUserLogin = true;
      state.dataUserLogin = null;
      state.errUserLogin = null;
      return { ...state };
    case USER_LOGIN_SUCCESS:
      state.loadingUserLogin = false;
      if (action.payload.maLoaiNguoiDung === "KhachHang") {
        state.dataUserLogin = action.payload;
      }
      state.errUserLogin = null;
      return { ...state };
    case USER_LOGIN_FAILED:
      state.loadingUserLogin = false;
      state.dataUserLogin = null;
      state.errUserLogin = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default homeTemplateReducer;
