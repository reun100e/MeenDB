import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import "../styles/Burger.css";
import { useAuthentication } from "../auth";
import api from "../api";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Navbar() {
  const { isAuthorized, logout } = useAuthentication();
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthorized) {
      fetchActiveUser();
    }
  }, [isAuthorized]);

  const fetchActiveUser = async () => {
    try {
      const response = await api.get("api/active-user/");
      setUsername(response.data.username);
    } catch (error) {
      console.error("Error fetching active user info", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect after logout
  };

  // Burger menu state management
  const [burgerClass, setBurgerClass] = useState("burger-bar unclicked");
  const [sidebar, setSidebar] = useState("sidebar hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  // Toggle burger menu change
  const updateMenu = async () => {
    if (!isMenuClicked) {
      setBurgerClass("burger-bar clicked");
      setSidebar("sidebar visible slideIn");
    } else {
      setBurgerClass("burger-bar unclicked");
      setSidebar("sidebar visible slideOut");
      await sleep(400);
      setSidebar("sidebar hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className="navbar">
        <Link to="/" className="navbar-logo-link">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Link>
        <ul className="navbar-menu-left">
          <li>
            <Link to="/why">Why MeenDB?</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <ul className="navbar-menu-right">
          {isAuthorized ? (
            <>
              <li className="navbar-username">
                <span>Welcome, {username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="button-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="button-link-login">
                  Log In
                </Link>
              </li>
              <li>
                <Link to="/register" className="button-link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="burger" onClick={updateMenu}>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
        <div className={burgerClass}></div>
      </div>
      <div className={sidebar}>
        <Link to="/" className="sidebar-logo-link" onClick={updateMenu}>
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </Link>
        <ul className="sidebar-top">
          {isAuthorized ? (
            <>
              <li className="navbar-username">
                <span>Welcome, {username}</span>
              </li>
              <li>
                <button onClick={handleLogout} className="button-link">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="button-link-login"
                  onClick={updateMenu}
                >
                  Log In
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="button-link"
                  onClick={updateMenu}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        <br />
        <ul className="sidebar-bottom">
          <li>
            <Link to="/why" onClick={updateMenu}>
              Why MeenDB?
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={updateMenu}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={updateMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
