import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.5rem",
          backgroundColor: "#f8f9fa",
          boxShadow: "0 1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            fontSize: "1.5rem",
            background: "none",
            border: "none",
            display: "block",
            color: "#0d6efd",
          }}
          className="d-md-none"
        >
          ☰
        </button>

        <nav
          className="d-none d-md-flex"
          style={{
            gap: "1.5rem",
          }}
        >
          <NavLink
            to="/landing"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
            }
            style={{ textDecoration: "none", fontWeight: 500 }}
          >
            Home
          </NavLink>
          <NavLink
            to="/saved-funds"
            className={({ isActive }) =>
              `nav-link ${isActive ? "fw-bold text-primary" : "text-dark"}`
            }
            style={{ textDecoration: "none", fontWeight: 500 }}
          >
            Saved Funds
          </NavLink>
        </nav>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span style={{ color: "#0d6efd", fontWeight: 500 }}>
            Hello {user?.fullname || "User"}
          </span>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "1px solid #dc3545",
              color: "#dc3545",
              padding: "0.375rem 0.75rem",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 1040,
          }}
          onClick={closeSidebar}
        ></div>
      )}

      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-250px",
          width: "240px",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1050,
          transition: "left 0.3s ease",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <h5 style={{ margin: 0 }}>Menu</h5>
          <button
            onClick={closeSidebar}
            style={{
              fontSize: "1.2rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
        <NavLink
          to="/landing"
          onClick={closeSidebar}
          style={{
            textDecoration: "none",
            padding: "0.75rem 0",
            color: "#333",
            fontWeight: 500,
            borderBottom: "1px solid #eee",
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/saved-funds"
          onClick={closeSidebar}
          style={{
            textDecoration: "none",
            padding: "0.75rem 0",
            color: "#333",
            fontWeight: 500,
            borderBottom: "1px solid #eee",
          }}
        >
          Saved Funds
        </NavLink>
      </div>
    </>
  );
};

export default Header;
