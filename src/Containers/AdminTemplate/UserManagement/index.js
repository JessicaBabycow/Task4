import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import TableUser from "../../../Components/TableUser";
import {
  actUserListPageApi,
  actUserListApi,
  actEditUserApi,
  actAddUserApi,
  actDeleteUserApi,
} from "./module/action";
import AddUserForm from "../../../Components/AddUserForm";
import EditUserForm from "../../../Components/EditUserForm";
import ModalForm from "../../../Components/ModalForm";
import Loader from "../../../Components/Loader";

function UserManagement(props) {
  const {
    layDanhSachNguoiDung,
    dataDanhSachNguoiDungPhanTrang,
    layDanhSachNguoiDungPhanTrang,
    timKiemNguoiDung,
    keyword,
    editNguoiDung,
    addNguoiDung,
    deleteNguoiDung,
    setModal,
  } = props;
  let { dataDanhSachNguoiDung } = props;

  // Set form cho modal
  const [formForModal, setFormForModal] = useState("");
  // Set user cho edit
  const [userEdit, setUserEdit] = useState(null);

  useEffect(() => {
    layDanhSachNguoiDungPhanTrang(1);
    layDanhSachNguoiDung();
  }, []);

  const handleSearch = (e) => {
    timKiemNguoiDung(e.target.value);
  };

  const renderTableUser = () => {
    if (keyword) {
      dataDanhSachNguoiDung = dataDanhSachNguoiDung.filter((item) => {
        return (
          item.taiKhoan.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        );
      });
      return (
        <TableUser
          dataDanhSachNguoiDungPhanTrang={dataDanhSachNguoiDungPhanTrang}
          layDanhSachNguoiDungPhanTrang={layDanhSachNguoiDungPhanTrang}
          keyword={keyword}
          userList={dataDanhSachNguoiDung}
          deleteNguoiDung={deleteNguoiDung}
          setModal={setModal}
          setFormForModal={setFormForModal}
          setUserEdit={setUserEdit}
        />
      );
    } else {
      return (
        <TableUser
          dataDanhSachNguoiDungPhanTrang={dataDanhSachNguoiDungPhanTrang}
          layDanhSachNguoiDungPhanTrang={layDanhSachNguoiDungPhanTrang}
          keyword={keyword}
          userList={dataDanhSachNguoiDungPhanTrang?.items}
          deleteNguoiDung={deleteNguoiDung}
          setModal={setModal}
          setFormForModal={setFormForModal}
          setUserEdit={setUserEdit}
        />
      );
    }
  };

  const setFormModal = () => {
    if (formForModal === "Edit user form") {
      return (
        <EditUserForm
          userEdit={userEdit}
          editNguoiDung={editNguoiDung}
          setModal={setModal}
        />
      );
    } else {
      return <AddUserForm addNguoiDung={addNguoiDung} setModal={setModal} />;
    }
  };

  if (props.loadingDanhSachNguoiDungPhanTrang) return <Loader />;
  return (
    <div className="userManagement">
      <button
        className="userManagement__button"
        onClick={() => {
          setFormForModal("Add user form");
          setModal();
        }}
      >
        Thêm người dùng
      </button>
      <input
        className="userManagement__search"
        type="text"
        placeholder="Tìm kiếm người dùng"
        onChange={handleSearch}
      />
      {renderTableUser()}
      <ModalForm admin={true} componentModal={setFormModal()} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    loadingDanhSachNguoiDungPhanTrang:
      state.userManagementReducer.loadingDanhSachNguoiDungPhanTrang,
    dataDanhSachNguoiDungPhanTrang:
      state.userManagementReducer.dataDanhSachNguoiDungPhanTrang,
    dataDanhSachNguoiDung: state.userManagementReducer.dataDanhSachNguoiDung,
    keyword: state.userManagementReducer.keyword,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    layDanhSachNguoiDung: () => {
      dispatch(actUserListApi());
    },
    layDanhSachNguoiDungPhanTrang: (soTrang) => {
      dispatch(actUserListPageApi(soTrang));
    },
    editNguoiDung: (data, setModal) => {
      dispatch(actEditUserApi(data, setModal));
    },
    addNguoiDung: (data, setModal) => {
      dispatch(actAddUserApi(data, setModal));
    },
    deleteNguoiDung: (taiKhoan, data) => {
      dispatch(actDeleteUserApi(taiKhoan, data));
    },
    timKiemNguoiDung: (keyword) => {
      const action = {
        type: "TIM_KIEM_NGUOI_DUNG",
        payload: keyword,
      };
      dispatch(action);
    },
    setModal: () => {
      const action = {
        type: "SET_MODAL",
      };
      dispatch(action);
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
