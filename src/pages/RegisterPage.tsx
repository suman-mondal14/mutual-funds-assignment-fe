import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  const navigate = useNavigate();

  const showToastMessage = (message: string, type: "success" | "danger") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToastMessage("Passwords do not match!", "danger");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/register",
        {
          fullname: name,
          email,
          phone,
          password,
        }
      );

      showToastMessage(response.data.message, "success");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      showToastMessage(errorMsg, "danger");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-body-tertiary position-relative">
      <div
        className="card p-4 shadow rounded w-100"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-3 text-primary">Create Account</h2>
        <p className="text-center text-muted mb-4">
          Please fill in the details
        </p>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
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

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>

          <div className="text-center">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-primary fw-bold">
                Login
              </Link>
            </small>
          </div>
        </form>
      </div>

      {/* Toast */}
      {showToast && (
        <div
          className={`toast align-items-center text-white bg-${toastType} border-0 position-absolute bottom-0 end-0 m-3 show`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
