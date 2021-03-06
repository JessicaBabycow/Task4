import React from "react";
import { Table, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { RiDeleteBin5Line, RiEdit2Fill, RiAddCircleFill } from "react-icons/ri";

function TableMovie(props) {
  const {
    layDanhSachPhimPhanTrang,
    keyword,
    dataDanhSachPhimPhanTrang,
    movieList,
    xoaPhim,
    setModal,
    setMovieEdit,
    setMovieRoom,
    setFormForModal,
  } = props;

  const renderMovieList = () => {
    return movieList?.map((item) => {
      return (
        <tr key={item.maPhim}>
          <th scope="row">{item.maPhim}</th>
          <td>{item.tenPhim}</td>
          <td>
            <img src={item.hinhAnh} className="tableMovie__picture" />
          </td>
          <td>{item.moTa}</td>
          <td>{new Date(item.ngayKhoiChieu).toLocaleDateString()}</td>
          <td>{item.danhGia}</td>
          <td>
            <RiAddCircleFill
              onClick={() => {
                setFormForModal("Room movie form");
                setModal();
                setMovieRoom(item);
              }}
            />
            <RiEdit2Fill
              onClick={() => {
                setFormForModal("Edit movie form");
                setModal();
                setMovieEdit(item);
              }}
            />
            <RiDeleteBin5Line
              onClick={() => {
                let z = window.confirm("Bạn có chắc muốn xóa phim này ?");
                if (z) {
                  xoaPhim(item.maPhim);
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
    for (let i = 1; i <= dataDanhSachPhimPhanTrang?.totalPages; i++) {
      arr.push(i);
    }
    return arr?.map((item, index) => {
      return (
        <PaginationItem key={index}>
          <PaginationLink
            onClick={() => {
              layDanhSachPhimPhanTrang(item);
            }}
          >
            {item}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  const renderFirstPagePagination = () => {
    if (dataDanhSachPhimPhanTrang?.currentPage === 1) {
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
              props.layDanhSachPhimPhanTrang(1);
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderLastPagePagination = () => {
    if (
      dataDanhSachPhimPhanTrang?.currentPage ===
      dataDanhSachPhimPhanTrang?.totalPages
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
              props.layDanhSachPhimPhanTrang(
                dataDanhSachPhimPhanTrang?.totalPages
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderPreviousPagination = () => {
    if (dataDanhSachPhimPhanTrang?.currentPage === 1) {
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
              props.layDanhSachPhimPhanTrang(
                dataDanhSachPhimPhanTrang?.currentPage - 1
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  const renderNextPagination = () => {
    if (
      dataDanhSachPhimPhanTrang?.currentPage ===
      dataDanhSachPhimPhanTrang?.totalPages
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
              props.layDanhSachPhimPhanTrang(
                dataDanhSachPhimPhanTrang?.currentPage + 1
              );
            }}
          />
        </PaginationItem>
      );
    }
  };

  return (
    <>
      <div className="tableMovie__table">
        <Table bordered hover striped>
          <thead>
            <tr>
              <th>Mã phim</th>
              <th>Tên phim</th>
              <th>Hình ảnh</th>
              <th>Mô tả</th>
              <th>Ngày khởi chiếu</th>
              <th>Đánh giá</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderMovieList()}</tbody>
        </Table>
      </div>
      <div className="tableMovie__pagination">
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

export default TableMovie;
