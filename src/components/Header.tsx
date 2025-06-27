import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <header className="d-flex justify-content-between align-items-center px-4 py-3 bg-light shadow-sm">

        <button
          className="btn btn-outline-primary d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileMenu"
          aria-controls="mobileMenu"
        >
          <i className="bi bi-list"></i>
          ☰
        </button>

        <nav className="d-none d-md-flex gap-3">
          <NavLink
            to="/landing"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/saved-funds"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
            }
          >
            Saved Funds
          </NavLink>
        </nav>


        <div className="d-flex align-items-center gap-3">
          <span className="text-primary fw-semibold d-none d-sm-inline">
            Hello {user?.fullname || "User"}
          </span>
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </header>


      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          <NavLink
            to="/landing"
            className="nav-link"
            data-bs-dismiss="offcanvas"
          >
            Home
          </NavLink>
          <NavLink
            to="/saved-funds"
            className="nav-link"
            data-bs-dismiss="offcanvas"
          >
            Saved Funds
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
