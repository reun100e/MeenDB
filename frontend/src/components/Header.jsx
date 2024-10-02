import React from "react";
import "../styles/Header.css";
import img from "../assets/header-img.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <img src={img} alt="Background woman" className="header-bg" />
      <div className="header-content">
        <h1>ചാള or മത്തി?</h1>
        <h3>MeenDB has the answer</h3>
        <Link to="/fish">
          {" "}
          <button>Explore MeenDB</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
