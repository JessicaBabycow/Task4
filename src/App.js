import { BrowserRouter, Route, Switch } from "react-router-dom";
import { routesHome, routesAdmin } from "./Routers";

import PageNotFound from "./Containers/PageNotFound";
import HomeTemplate from "./Containers/HomeTemplate";
import AdminTemplate from "./Containers/AdminTemplate";
import AuthPage from "./Containers/AdminTemplate/AuthPage";

import "./App.scss";

//Test Page
import Test from "./Containers/HomeTemplate/Test";

function App() {
  const showLayoutHome = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <HomeTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };

  const showLayoutAdmin = (routes) => {
    if (routes && routes.length > 0) {
      return routes.map((item, index) => {
        return (
          <AdminTemplate
            key={index}
            exact={item.exact}
            path={item.path}
            Component={item.component}
          />
        );
      });
    }
  };
  return (
    <BrowserRouter>
      <div className="app">
        <Switch>
          {showLayoutHome(routesHome)}
          {showLayoutAdmin(routesAdmin)}
          <Route exact={false} path="/auth" component={AuthPage} />

          {/* Test Page */}
          <Route exact={false} path="/test" component={Test} />
          {/* End of Test Page */}

          <Route path="" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
