import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const ModalForm = (props) => {
  const { modal, setModal, logOut } = props;
  const tk = JSON.parse(localStorage.getItem("User"));

  // props cần thiết để truyền vào modal
  const { buttonOpenModal, componentModal, setForm, admin, cName } = props;

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  return (
    <div className="modalForm">
      {!admin ? (
        <div>
          {tk ? (
            <ButtonDropdown
              className={cName}
              isOpen={dropdownOpen}
              toggle={toggle}
            >
              <DropdownToggle caret>Hello {tk.taiKhoan}</DropdownToggle>
              <DropdownMenu>
                <DropdownItem style={{ color: "#000" }}>
                  <Link className="modalForm__link" to="/user">
                    Information
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem style={{ color: "red" }} onClick={logOut}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          ) : (
            <Button
              className={cName}
              onClick={() => {
                setModal();
                setForm("log in");
              }}
            >
              {buttonOpenModal}
            </Button>
          )}
        </div>
      ) : null}
      <Modal isOpen={modal} toggle={setModal}>
        <ModalHeader toggle={setModal}></ModalHeader>
        <ModalBody>{componentModal}</ModalBody>
      </Modal>
    </div>
  );
};

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
    logOut: () => {
      const action = {
        type: "LOG_OUT_USER",
      };
      dispatch(action);
    },
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(ModalForm);
