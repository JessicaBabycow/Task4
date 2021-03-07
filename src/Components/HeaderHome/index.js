import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FaReact, FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
import { HeaderHomeListItems } from "./HeaderHomeListItems";
import ModalForm from "../../Components/ModalForm";
import LoginUserForm from "../LoginUserForm";
import SignUpUserForm from "../SignUpUserForm";

function HeaderHome(props) {
  const [clicked, setClicked] = useState(false);

  // Chuyển form login sang signup và ngược lại
  const [form, setForm] = useState("log in");
  const handleClicked = () => {
    setClicked(!clicked);
  };

  useEffect(() => {
    props.logIn();
  }, []);

  return (
    <nav className="headerHome">
      <h1 className="headerHome__logo">
        <Link to="/" className="headerHome__logo__link">
          React <FaReact className="headerHome__logo__mini" />
        </Link>
      </h1>
      <div className="headerHome__icon" onClick={handleClicked}>
        {clicked ? (
          <GrClose className="headerHome__icon__close" />
        ) : (
          <FaBars className="headerHome__icon__bars" />
        )}
      </div>
      <ul className={clicked ? "headerHome__menu active" : "headerHome__menu"}>
        {HeaderHomeListItems.map((item, index) => (
          <li key={index}>
            <LinkScroll
              className={item.cName}
              to={item.url}
              smooth={true}
              duration={1000}
            >
              {item.title}
            </LinkScroll>
          </li>
        ))}
      </ul>

      <ModalForm
        className="headerHome__modal"
        buttonOpenModal={"Login or Register"}
        titleModal={"Login"}
        buttonSubmitModal={"Login"}
        setForm={setForm}
        cName={"headerHome__linksMobile1"}
        componentModal={
          form === "log in" ? (
            <LoginUserForm setForm={setForm} />
          ) : (
            <SignUpUserForm setForm={setForm} />
          )
        }
        admin={false}
      />
    </nav>
  );
}

const mapDispatchToProp = (dispatch) => {
  return {
    logIn: () => {
      const action = {
        type: "LOG_IN_USER",
      };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProp)(HeaderHome);
