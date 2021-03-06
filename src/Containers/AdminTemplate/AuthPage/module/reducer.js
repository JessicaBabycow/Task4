import {
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGIN_FAILED,
} from "./constant";

let initialState = {
  loadingAdminLogin: false,
  dataAdminLogin: null,
  errAdminLogin: null,
};

const authPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOG_OUT_ADMIN":
      localStorage.removeItem("Admin");
      state.dataAdminLogin = null;
      return { ...state };
    case ADMIN_LOGIN_REQUEST:
      state.loadingAdminLogin = true;
      state.dataAdminLogin = null;
      state.errAdminLogin = null;
      return { ...state };
    case ADMIN_LOGIN_SUCCESS:
      state.loadingAdminLogin = false;
      if (action.payload.maLoaiNguoiDung === "QuanTri") {
        state.dataAdminLogin = action.payload;
      }
      state.errAdminLogin = null;
      return { ...state };
    case ADMIN_LOGIN_FAILED:
      state.loadingAdminLogin = false;
      state.dataAdminLogin = null;
      state.errAdminLogin = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default authPageReducer;
