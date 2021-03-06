import React from "react";
import { Route, Redirect } from "react-router-dom";
import HeaderAdmin from "../../Components/HeaderAdmin";
import FooterAdmin from "../../Components/FooterAdmin";

function AdminLayout(props) {
  return (
    <div>
      <HeaderAdmin />
      {props.children}
      <FooterAdmin />
    </div>
  );
}

export default function AdminTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (localStorage.getItem("Admin")) {
          return (
            <AdminLayout>
              <Component {...propsComponent} />
            </AdminLayout>
          );
        }
        return <Redirect to="/auth" />;
      }}
    />
  );
}
