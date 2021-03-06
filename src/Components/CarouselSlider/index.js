import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import { BiPlay } from "react-icons/bi";
import ModalVideo from "../../Components/ModalVideo";

const items = [
  {
    src: "./image/banner_rom.png",
    altText: "Slide 1",
    caption: "Slide 1",
    url: "https://www.youtube.com/watch?v=XRm1P7oGpMQ",
  },
  {
    src: "./image/banner_jungle.png",
    altText: "Slide 2",
    caption: "Slide 2",
    url: "https://www.youtube.com/watch?v=zkIGl8LLPyE",
  },
  {
    src: "./image/banner_evil.jpg",
    altText: "Slide 3",
    caption: "Slide 3",
    url: "https://www.youtube.com/watch?v=KtLXv04nM9s&t=19s",
  },
];

function CarouselSlider(props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <BiPlay
          className="carousel__icon"
          onClick={() => {
            props.setModalVideo(item.url);
          }}
        />
      </CarouselItem>
    );
  });

  return (
    <>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
      <ModalVideo />
    </>
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

export default connect(null, mapDispatchToProp)(CarouselSlider);
