import {
  USER_INFORMATION_REQUEST,
  USER_INFORMATION_SUCCESS,
  USER_INFORMATION_FAILED,
  USER_INFORMATION_UPDATE_REQUEST,
  USER_INFORMATION_UPDATE_SUCCESS,
  USER_INFORMATION_UPDATE_FAILED,
} from "./constant";
let initialState = {
  loadingUserInformation: false,
  dataUserInformation: null,
  errUserInformation: null,
};

const userPageReducer = (state = initialState, action) => {
  switch (action.type) {
    // Lấy thông tin người dùng
    case USER_INFORMATION_REQUEST:
      state.loadingUserInformation = true;
      state.dataUserInformation = null;
      state.errUserInformation = null;
      return { ...state };
    case USER_INFORMATION_SUCCESS:
      state.loadingUserInformation = false;
      state.dataUserInformation = action.payload;
      state.errUserInformation = null;
      return { ...state };
    case USER_INFORMATION_FAILED:
      state.loadingUserInformation = false;
      state.dataUserInformation = null;
      state.errUserInformation = action.payload;
      return { ...state };

    // Cập nhật thông tin người dùng
    case USER_INFORMATION_UPDATE_REQUEST:
      return { ...state };
    case USER_INFORMATION_UPDATE_SUCCESS:
      state.dataUserInformation = action.payload;
      return { ...state };
    case USER_INFORMATION_UPDATE_FAILED:
      return { ...state };

    default:
      return { ...state };
  }
};

export default userPageReducer;
