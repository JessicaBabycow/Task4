import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTumblr,
} from "react-icons/fa";

function FooterHome() {
  return (
    <div id="contact" className="footerHome">
      <div className="footerHome__left">
        <img src="./image/footer-logo.jpg" alt="movie-logo" />
        <p>
          Manage ticket sales in your cinema chain. Box Office ensures a smooth
          customer experience due to an easy sales process. Take advantage of
          every promotion and up-sell opportunity.
        </p>
        <div className="socials">
          <a href="#">
            <FaFacebookF className="socials__icon" />
          </a>
          <a href="#">
            <FaInstagram className="socials__icon" />
          </a>
          <a href="#">
            <FaTwitter className="socials__icon" />
          </a>
          <a href="#">
            <FaYoutube className="socials__icon" />
          </a>
          <a href="#">
            <FaTumblr className="socials__icon" />
          </a>
        </div>
      </div>
      <ul className="footerHome__right">
        <li>
          <h2>Product</h2>
          <ul className="box">
            <li>
              <a href="#">Theme Design</a>
            </li>
            <li>
              <a href="#">Plugin Design</a>
            </li>
            <li>
              <a href="#">Wordpress</a>
            </li>
            <li>
              <a href="#">Joomla Design</a>
            </li>
            <li>
              <a href="#">HTML Template</a>
            </li>
          </ul>
        </li>
        <li className="features">
          <h2>Useful Links</h2>
          <ul className="box">
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">Sales</a>
            </li>
            <li>
              <a href="#">Tickets</a>
            </li>
            <li>
              <a href="#">Certification</a>
            </li>
            <li>
              <a href="#">Customer Service</a>
            </li>
          </ul>
        </li>
        <li>
          <h2>Adress</h2>
          <ul className="box">
            <li>
              <a href="#">127, Westwood Land</a>
            </li>
            <li>
              <a href="#">DA15 9PS, Sidcups</a>
            </li>
            <li>
              <a href="#">London</a>
            </li>
            <li>
              <a href="#">United Kingdom</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="footerHome__bottom">
        <p>All Right reserved by &copy;ReactJS 2021</p>
      </div>
    </div>
  );
}

export default FooterHome;
