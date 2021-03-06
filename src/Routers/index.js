import HomePage from "../Containers/HomeTemplate/HomePage";
import DetailPage from "../Containers/HomeTemplate/DetailPage";
import BookingPage from "../Containers/HomeTemplate/BookingPage";
import UserPage from "../Containers/HomeTemplate/UserPage";

import Dashboard from "../Containers/AdminTemplate/Dashboard";
import UserManagement from "../Containers/AdminTemplate/UserManagement";
import AdminPage from "../Containers/AdminTemplate/AdminPage";

const routesHome = [
  {
    exact: true,
    path: "/",
    component: HomePage,
  },
  {
    exact: false,
    path: "/detail/:id",
    component: DetailPage,
  },
  {
    exact: false,
    path: "/booking/:maLichChieu",
    component: BookingPage,
  },
  {
    exact: false,
    path: "/user",
    component: UserPage,
  },
];

const routesAdmin = [
  {
    exact: false,
    path: "/dashboard",
    component: Dashboard,
  },
  {
    exact: false,
    path: "/manage-user",
    component: UserManagement,
  },
  {
    exact: false,
    path: "/admin",
    component: AdminPage,
  },
];

export { routesHome, routesAdmin };
