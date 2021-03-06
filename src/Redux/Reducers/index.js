import { combineReducers } from "redux";
import bookingTicketReducer from "../../Containers/HomeTemplate/BookingPage/module/reducer";
import dashboardReducer from "../../Containers/AdminTemplate/Dashboard/module/reducer";
import userManagementReducer from "../../Containers/AdminTemplate/UserManagement/module/reducer";
import homeTemplateReducer from "../../Containers/HomeTemplate/module/reducer";
import authPageReducer from "../../Containers/AdminTemplate/AuthPage/module/reducer";
import userPageReducer from "../../Containers/HomeTemplate/UserPage/module/reducer";
import adminPageReducer from "../../Containers/AdminTemplate/AdminPage/module/reducer";

const rootReducer = combineReducers({
  // reducer con
  bookingTicketReducer,
  dashboardReducer,
  userManagementReducer,
  homeTemplateReducer,
  authPageReducer,
  userPageReducer,
  adminPageReducer,
});

export default rootReducer;
