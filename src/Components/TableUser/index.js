import React from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { RiDeleteBin5Line, RiEdit2Fill } from "react-icons/ri";

function TableUser(props) {
  const {
    layDanhSachNguoiDungPhanTrang,
    keyword,
    dataDanhSachNguoiDungPhanTrang,
    userList,
    deleteNguoiDung,
    setModal,
    setFormForModal,
    setUserEdit,
  } = props;

  const renderUserList = () => {
    return userList?.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.taiKhoan}</th>
          <td>{item.matKhau}</td>
          <td>{item.email}</td>
          <td>{item.soDt}</td>
          <td>{item.maLoaiNguoiDung}</td>
          <td>{item.hoTen}</td>
          <td>
            <RiEdit2Fill
              onClick={() => {
                setFormForModal("Edit user form");
                setModal();
                setUserEdit(item);
              }}
            />
            <RiDeleteBin5Line
              onClick={() => {
                let z = window.confirm("Bạn có chắc muốn xóa người dùng này ?");
                if (z) {
                  deleteNguoiDung(item.taiKhoan, item);
                } else {
                  return;
                }
              }}
            />
          </td>
        </tr>
      );
    });
  };

  const renderPagination = () => {
    let arr = [];
    for (let i = 1; i <= dataDanhSachNguoiDungPhanTrang?.totalPages; i++) {
      arr.push(i);
    }
    return arr?.map((item, index) => {
      return (
        <PaginationItem key={index}>
          <PaginationLink
            onClick={() => {
              layDanhSachNguoiDungPhanTrang(item);
            }}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  const renderFirstPagePagination = () => {
    if (dataDanhSachNguoiDungPhanTrang?.currentPage === 1) {
      return (
        <PaginationItem disabled>
          <PaginationLink first />
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <PaginationLink
            first
            onClick={() => {
              props.layDanhSachNguoiDungPhanTrang(1);
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderLastPagePagination = () => {
    if (
      dataDanhSachNguoiDungPhanTrang?.currentPage ===
      dataDanhSachNguoiDungPhanTrang?.totalPages
    ) {
      return (
        <PaginationItem disabled>
          <PaginationLink last />
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <PaginationLink
            last
            onClick={() => {
              props.layDanhSachNguoiDungPhanTrang(
                dataDanhSachNguoiDungPhanTrang?.totalPages
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderPreviousPagination = () => {
    if (dataDanhSachNguoiDungPhanTrang?.currentPage === 1) {
      return (
        <PaginationItem disabled>
          <PaginationLink previous />
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <PaginationLink
            previous
            onClick={() => {
              props.layDanhSachNguoiDungPhanTrang(
                dataDanhSachNguoiDungPhanTrang?.currentPage - 1
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderNextPagination = () => {
    if (
      dataDanhSachNguoiDungPhanTrang?.currentPage ===
      dataDanhSachNguoiDungPhanTrang?.totalPages
    ) {
      return (
        <PaginationItem disabled>
          <PaginationLink next />
        </PaginationItem>
      );
    } else {
      return (
        <PaginationItem>
          <PaginationLink
            next
            onClick={() => {
              props.layDanhSachNguoiDungPhanTrang(
                dataDanhSachNguoiDungPhanTrang?.currentPage + 1
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  return (
    <>
      <div className="tableUser__table">
        <Table bordered hover striped>
          <thead>
            <tr>
              <th>Tài khoản</th>
              <th>Mật khẩu</th>
              <th>Email</th>
              <th>Số đt</th>
              <th>Mã loại người dùng</th>
              <th>Họ tên</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderUserList()}</tbody>
        </Table>
      </div>
      <div className="tableUser__pagination">
        {!keyword ? (
          <Pagination aria-label="Page navigation example">
            {renderFirstPagePagination()}
            {renderPreviousPagination()}
            {renderPagination()}
            {renderNextPagination()}
            {renderLastPagePagination()}
          </Pagination>
        ) : null}
      </div>
    </>
  );
}

export default TableUser;
