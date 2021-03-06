import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import DetailMovie from "../../../Components/DetailMovie";
import {
  getMovieDetail,
  getTheaterGroupDetail,
  getTheaterList,
  getReviewList,
  postReviewList,
} from "./module/action";
import Loader from "../../../Components/Loader";
import ModalVideo from "../../../Components/ModalVideo";
import DetailMovieBottom from "../../../Components/DetailMovieBottom";

function DetailPage(props) {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [theaterGroupList, setTheaterGroupList] = useState(null);
  const [theaterGroupName, setTheaterGroupName] = useState("BHDStar");
  const [theaterList, setTheaterList] = useState(null);
  const [reviewList, setReviewList] = useState(null);

  const { setModalVideo } = props;

  useEffect(() => {
    getMovieDetail(id, setMovieDetail);
    getTheaterGroupDetail(setTheaterGroupList);
    getTheaterList("BHDStar", setTheaterList);
    getReviewList(setReviewList);
  }, []);

  if (!movieDetail) return <Loader />;
  return (
    <div className="detailPage container">
      <div className="detailPage__component">
        <DetailMovie movieDetail={movieDetail} setModalVideo={setModalVideo} />
      </div>
      <div className="detailPage__component">
        <DetailMovieBottom
          id={id}
          movieDetail={movieDetail}
          theaterGroupList={theaterGroupList}
          setTheaterGroupName={setTheaterGroupName}
          getTheaterList={getTheaterList}
          theaterList={theaterList}
          setTheaterList={setTheaterList}
          reviewList={reviewList}
          setReviewList={setReviewList}
          postReviewList={postReviewList}
        />
      </div>
      <ModalVideo />
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

export default connect(null, mapDispatchToProp)(DetailPage);
