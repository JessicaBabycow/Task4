import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="pageNotFound">
      <img src="./image/undraw_not_found_60pq.svg" alt="Page Not Found" />
      <div className="pageNotFound__wrapper">
        <h1>Page Not Found</h1>
        <p className="pageNotFound__wrapper__message">
          What is a 404 Error? A 404 error is a standard HTTP error message code
          that means the website you were trying to reach couldn't be found on
          the server.
        </p>
        <Link to="/" className="pageNotFound__wrapper__link">
          Learn More About Us
        </Link>
        <p className="pageNotFound__wrapper__copyRights">&copy; 2021 ReactJS</p>
      </div>
    </div>
  );
}

export default PageNotFound;
