import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Assets/notes-2.svg";

const Navbar = () => {
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  let location = useLocation();
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <img src={Logo} style={{width: "40px"}}  alt=".." />
          <Link className="navbar-brand" to="/home">
            Notebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>
            {!localStorage.getItem("token") ? (
              <form>
                <Link
                  to="/login"
                  className="btn btn-outline-secondary mx-2"
                  role="button"
                >
                  LOGIN
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-outline-secondary mx-2"
                  role="button"
                >
                  SIGNUP
                </Link>
              </form>
            ) : (
              <Link
                to="/signup"
                className="btn btn-outline-secondary mx-2"
                role="button"
                onClick={handleLogout}
              >
                LOGOUT
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
