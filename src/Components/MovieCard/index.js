import React from "react";
import { Link } from "react-router-dom";
import { BsPlayFill } from "react-icons/bs";
import { connect } from "react-redux";

function MovieCard(props) {
  const { item, setModalVideo } = props;
  return (
    <div className="movieCard">
      <div className="movieCard__img">
        <img src={item?.hinhAnh} />
      </div>
      <div className="movieCard__content">
        <h4>{item?.tenPhim}</h4>
        <p>IMDb : {item?.danhGia}</p>
      </div>
      <div className="movieCard__button">
        <li>
          <a
            className="button__b1"
            onClick={() => {
              setModalVideo(item?.trailer);
            }}
          >
            <BsPlayFill />
            Trailer
          </a>
        </li>
        <li>
          <Link className="button__b1" to={`/detail/${item?.maPhim}`}>
            Booking
          </Link>
        </li>
      </div>
    </div>
  );
}
const mapDispatchToProp = (dispatch) => {
  return {
    setModalVideo: (url) => {
      const action = {
        type: "SET_MODAL_VIDEO",
        payload: url,
      };
      dispatch(action);
    },
  };
};
export default connect(null, mapDispatchToProp)(MovieCard);
