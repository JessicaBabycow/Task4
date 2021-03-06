import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { HeaderAdminListItems } from "./HeaderAdminListItem";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { IconContext } from "react-icons";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

function HeaderAdmin(props) {
  const [sidebar, setSidebar] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const tk = JSON.parse(localStorage.getItem("Admin"));
  const history = useHistory();

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div className="headerAdmin">
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="headerAdmin__navbar">
          <a className="headerAdmin__navbar__menuBars">
            <FaIcons.FaBars onClick={showSidebar} />
          </a>
          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggle}
            className="headerAdmin__navbar__name"
          >
            <DropdownToggle caret>Hello {tk.taiKhoan}</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link className="headerAdmin__link" to="/admin">
                  Information
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
                onClick={() => {
                  props.logOutAdmin();
                  history.push("/auth");
                }}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <nav
          className={
            sidebar ? "headerAdmin__navMenu active" : "headerAdmin__navMenu"
          }
        >
          <ul className="headerAdmin__navMenu__items" onClick={showSidebar}>
            <li className="headerAdmin__navMenu__toggle">
              <a className="headerAdmin__navbar__menuBars">
                <AiIcons.AiOutlineClose />
              </a>
            </li>
            {HeaderAdminListItems.map((item, index) => (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
}

const mapStateToProp = (state) => {
  return {};
};

const mapDispatchToProp = (dispatch) => {
  return {
    logOutAdmin: () => {
      const action = {
        type: "LOG_OUT_ADMIN",
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProp, mapDispatchToProp)(HeaderAdmin);
