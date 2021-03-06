import React from "react";
import { Route } from "react-router-dom";
import HeaderHome from "../../Components/HeaderHome";
import FooterHome from "../../Components/FooterHome";
import { connect } from "react-redux";

function HomeLayout(props) {
  const { modal, setModal } = props;

  return (
    <div className="homeLayout">
      <HeaderHome setModal={setModal} modal={modal} />
      {props.children}
      <FooterHome />
    </div>
  );
}

function HomeTemplate({ Component, ...props }) {
  return (
    <Route
      {...props}
      render={(propsComponent) => (
        <HomeLayout>
          <Component {...propsComponent} />
        </HomeLayout>
      )}
    />
  );
}

const mapStateToProp = (state) => {
  return {
    modal: state.homeTemplateReducer.modal,
  };
};

const mapDispatchToProp = (dispatch) => {
  return {
    setModal: () => {
      const action = {
        type: "SET_MODAL",
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(HomeTemplate);
