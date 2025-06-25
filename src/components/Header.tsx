import React from "react";
import { useNavigate } from "react-router-dom";
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
    <header className="d-flex justify-content-end align-items-center px-4 py-4 bg-light shadow-sm gap-3">
      <h5 className="m-0 text-primary">
        <span className="fw-semibold">Hello {user?.fullname || "User"}</span>
      </h5>

      <button
        onClick={handleLogout}
        className="btn btn-outline-danger d-flex align-items-center"
        title="Logout"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
