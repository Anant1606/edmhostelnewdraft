import React from "react";
import "./verticalSocialBar.css";
import facebookIcon from "../assets/facebook-icon.png";
import instagramIcon from "../assets/instagram-icon.png";
import twitterIcon from "../assets/twitter-icon.png";
import linkedinIcon from "../assets/linkedin-icon.png";

const VerticalSocialBar = () => {
  return (
    <div className="social-bar-vertical">
      <span>FOLLOW US</span>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <img src={facebookIcon} alt="Facebook" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <img src={instagramIcon} alt="Instagram" />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <img src={twitterIcon} alt="Twitter" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" />
      </a>
    </div>
  );
};

export default VerticalSocialBar;
