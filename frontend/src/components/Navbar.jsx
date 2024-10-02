import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/Navbar.css";
import { useAuthentication } from "../auth";
import api from "../api";

function Navbar() {
  const { isAuthorized, logout } = useAuthentication();
  const [username, setUsername] = useState("");

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
  };

  return (
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
              <Link onClick={handleLogout} to="/logout" className="button-link">
                Logout
              </Link>
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
  );
}

export default Navbar;
