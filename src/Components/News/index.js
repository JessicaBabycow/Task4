import React, { useState } from "react";
import { actors, producers, news1, news2, news3 } from "./newsList";
import { FcNext, FcPrevious } from "react-icons/fc";

function News() {
  const [news, setNews] = useState(news1);
  const handlePrevious = () => {
    if (news === news3) {
      setNews(news2);
    } else {
      setNews(news1);
    }
  };
  const handleNext = () => {
    if (news === news1) {
      setNews(news2);
    } else {
      setNews(news3);
    }
  };
  return (
    <div className="news row">
      <div className="news__hallOfFame col-xs-12 col-lg-3">
        <p className="news__title">Hall Of Fame</p>
        <p className="news__content">Top actors</p>
        {actors.map((item, index) => {
          return (
            <div className="news__item" key={index}>
              <img src={item.img} />
              <span className="news__name">
                <a href={item.href} target="_blank">
                  {item.name}
                </a>
              </span>
            </div>
          );
        })}
        <p className="news__content">Top producers</p>
        {producers.map((item, index) => {
          return (
            <div className="news__item" key={index}>
              <img src={item.img} />
              <span className="news__name">
                <a href={item.href} target="_blank">
                  {item.name}
                </a>
              </span>
            </div>
          );
        })}
      </div>
      <div className="news__news col-xs-12 col-lg-9">
        <div className="news__top">
          <p className="news__title">News</p>
          <div className="news__icon">
            {news === news1 ? (
              <button className="news__icon__a" disabled>
                <FcPrevious />
              </button>
            ) : (
              <button className="news__icon__a" onClick={handlePrevious}>
                <FcPrevious />
              </button>
            )}
            {news === news3 ? (
              <button className="news__icon__a" disabled>
                <FcNext />
              </button>
            ) : (
              <button className="news__icon__a" onClick={handleNext}>
                <FcNext />
              </button>
            )}
          </div>
        </div>
        <div className="news__container">
          <div className="row">
            <div className="col-5">
              <img className="news__news__big" src={news[0].img} />
            </div>
            <div className="news__news__bigContent col-xs-12 col-lg-7">
              <p>2 Hours Ago - by Yoga</p>
              <a href="https://www.glamorous.com/" target="_blank">
                {news[0].title}
              </a>
              <p>{news[0].content}</p>
            </div>
          </div>
          <div className="row" style={{ marginTop: "10px" }}>
            <div className="news__news__smallContent col-xs-12 col-lg-4">
              <img className="news__news__small" src={news[1].img} />
              <p>2 Hours Ago - by Yoga</p>
              <a href="https://www.glamorous.com/" target="_blank">
                {news[1].title}
              </a>
            </div>
            <div className="news__news__smallContent col-xs-12 col-lg-4">
              <img className="news__news__small" src={news[2].img} />
              <p>2 Hours Ago - by Yoga</p>
              <a href="https://www.glamorous.com/" target="_blank">
                {news[2].title}
              </a>
            </div>
            <div className="news__news__smallContent col-xs-12 col-lg-4">
              <img className="news__news__small" src={news[3].img} />
              <p>2 Hours Ago - by Yoga</p>
              <a href="https://www.glamorous.com/" target="_blank">
                {news[3].title}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
