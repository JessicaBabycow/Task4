import React, { useState } from "react";
import TabsDetailPage from "../TabsDetailPage";
import FormControl from "../../Helper/Form/FormControl";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import StarRatings from "react-star-ratings";
import { BsPeopleCircle } from "react-icons/bs";

function DetailMovieBottom(props) {
  const tk = JSON.parse(localStorage.getItem("User"));
  const {
    id,
    movieDetail,
    theaterGroupList,
    setTheaterGroupName,
    getTheaterList,
    theaterList,
    setTheaterList,
    reviewList,
    setReviewList,
    postReviewList,
  } = props;

  const [content, setContent] = useState("showtimes");
  const [rating, setRating] = useState(0);

  const validationSchema = yup.object({
    review: yup.string().required("(*) Review is required !"),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const renderShowtimes = () => {
    return (
      <TabsDetailPage
        id={id}
        movieDetail={movieDetail}
        theaterGroupList={theaterGroupList}
        setTheaterGroupName={setTheaterGroupName}
        getTheaterList={getTheaterList}
        theaterList={theaterList}
        setTheaterList={setTheaterList}
      />
    );
  };

  const renderInformation = () => {
    return (
      <div className="detailMovieBottom__information">
        <p>
          <span>Release date</span> :{" "}
          {new Date(movieDetail?.ngayKhoiChieu).toLocaleDateString()}
        </p>
        <p>
          <span>Director</span> : Tim Story
        </p>
        <p>
          <span>Actors</span> : Angelina Jolie, Chris Hemsworth, Anne Hathaway
        </p>
        <p>
          <span>Category</span> : Action, thriller
        </p>
        <p>
          <span>Country</span> : USA
        </p>
        <p>
          <span>Detail</span> : {movieDetail?.moTa}
        </p>
      </div>
    );
  };

  const onSubmit = (value) => {
    postReviewList(
      { id: "", name: tk.taiKhoan, review: value.review, imdb: rating * 2 },
      setReviewList
    );
  };

  const renderReviews = () => {
    return (
      <div className="detailMovieBottom__reviewForm">
        <form
          className="detailMovieBottom__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl
            control="input"
            id="review"
            name="review"
            type="text"
            placeholder="What do you think about this movie?"
            register={register}
            error={errors.review}
          />
          <StarRatings
            className="detailMovieBottom__rating"
            rating={rating}
            starRatedColor="#e8d639"
            starDimension="30px"
            changeRating={(rate) => {
              setRating(rate);
            }}
            numberOfStars={5}
            name="rating"
          />
          {tk ? (
            <button className="detailMovieBottom__form__button">Submit</button>
          ) : (
            <button className="detailMovieBottom__form__button" disabled>
              Submit
            </button>
          )}
        </form>
        {reviewList
          ?.slice(0)
          .reverse()
          .map((item) => {
            return (
              <div className="detailMovieBottom__reviewItem" key={item.id}>
                <div className="detailMovieBottom__name">
                  <p style={{ marginBottom: "0", paddingTop: "10px" }}>
                    {item.name}
                  </p>
                  <div style={{ float: "right" }}>
                    <span>{item.imdb}</span>
                    <StarRatings
                      rating={item.imdb / 2}
                      starDimension="15px"
                      starSpacing="2px"
                      starRatedColor="#f3ea62"
                    />
                  </div>
                </div>
                <p className="detailMovieBottom__review">{item.review}</p>
              </div>
            );
          })}
      </div>
    );
  };

  const renderContent = () => {
    if (content === "showtimes") {
      return renderShowtimes();
    } else if (content === "information") {
      return renderInformation();
    } else {
      return renderReviews();
    }
  };
  return (
    <div id="tabsDetailPage" className="detailMovieBottom">
      <div className="detailMovieBottom__list">
        <button
          onClick={() => {
            setContent("showtimes");
          }}
        >
          Showtimes
        </button>
        <button
          onClick={() => {
            setContent("information");
          }}
        >
          Information
        </button>
        <button
          onClick={() => {
            setContent("reviews");
          }}
        >
          Reviews
        </button>
      </div>
      <div className="detailMovieBottom__content">{renderContent()}</div>
    </div>
  );
}

export default DetailMovieBottom;
