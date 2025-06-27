import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";
import { useUser } from "../context/UserContext";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState<boolean>(false);
  const { refetchUser } = useUser();

  const navigate = useNavigate();

  const showToastHandler = (message: string, type: "success" | "danger") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/login",
        payload
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        refetchUser();
        showToastHandler(response.data.message, "success");
        setTimeout(() => navigate("/landing"), 1000);
      } else {
        showToastHandler(response.data.message, "danger");
      }
    } catch (error) {
      showToastHandler("Login Failed", "danger");
    }
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
      <ToastMessage message={toastMessage} type={toastType} show={showToast} />
    </div>
  );
};

export default LoginPage;
