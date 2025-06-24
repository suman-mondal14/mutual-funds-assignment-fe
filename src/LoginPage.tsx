// src/LoginPage.tsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    navigate("/landing");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-tertiary">
      <div
        className="card p-4 shadow rounded w-100"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-3 text-primary">Welcome Back</h2>
        <p className="text-center text-muted mb-4">Login to your account</p>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>

          <div className="text-center">
            <small className="text-muted">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary fw-bold">
                Register
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
