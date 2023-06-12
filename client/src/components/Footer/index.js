import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer">
      <div className="Footer__wrapper">
        <Link to="/" className="Footer__logo">
          Recipes
        </Link>
        <p className="Footer__copyright">Copyright © 2022 Recipes.</p>
      </div>
    </div>
  );
};

export default Footer;
