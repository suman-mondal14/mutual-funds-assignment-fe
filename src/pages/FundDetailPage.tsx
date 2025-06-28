import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";

const generateRandomFundDetails = () => {
  const categories = [
    "Equity - Large Cap",
    "Debt - Short Term",
    "Hybrid - Balanced",
    "Equity - Mid Cap",
    "Index Fund",
    "ELSS - Tax Saving",
  ];
  const riskLevels = ["Low", "Moderate", "High"];
  const amcs = [
    "HDFC Mutual Fund",
    "SBI Mutual Fund",
    "ICICI Prudential",
    "Axis Mutual Fund",
    "XYZ Asset Management",
  ];

  const randomDate = () => {
    const start = new Date(2005, 0, 1);
    const end = new Date(2020, 11, 31);
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return {
    category: categories[Math.floor(Math.random() * categories.length)],
    nav: (Math.random() * 200 + 10).toFixed(2),
    risk: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    launchDate: randomDate(),
    amc: amcs[Math.floor(Math.random() * amcs.length)],
    expenseRatio: (Math.random() * 2).toFixed(2) + "%",
    oneYearReturn: (Math.random() * 20 - 5).toFixed(2) + "%",
  };
};

const FundDetailPage: React.FC = () => {
  const { state } = useLocation() as any;
  const fund = state?.fund;
  const navigate = useNavigate();
  const { user } = useUser();

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  const fundDetails = generateRandomFundDetails();

  const showToastHandler = (message: string, type: "success" | "danger") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = async () => {
    const payload = {
      schemeCode: fund.schemeCode,
      schemeName: fund.schemeName,
      userId: user?._id,
    };

    try {
      const response = await axios.post(
        "https://mutual-funds-assignment-be.onrender.com/api/v1/save-mutual-fund",
        payload
      );

      if (response.status === 201) {
        showToastHandler(response.data.message, "success");

        setTimeout(() => {
          navigate("/saved-funds");
        }, 1500);
      } else if (response.status === 409) {
        showToastHandler(response.data.message, "danger");
      }
    } catch (error) {
      showToastHandler("Something went wrong!", "danger");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!fund) {
    return <p className="text-center mt-5 text-danger">No fund data found.</p>;
  }

  return (
    <>
      <Header />
      <div
        className="container d-flex justify-content-center align-items-center py-5"
        style={{ minHeight: "80vh" }}
      >
        <div
          className="card shadow-lg rounded-4 border-0"
          style={{ width: "100%", maxWidth: "500px", background: "#f8f9fa" }}
        >
          <div className="card-body p-4">
            <h4 className="text-primary fw-bold mb-3 text-center">
              {fund.schemeName}
            </h4>

            <div className="mb-3">
              <label className="form-label text-muted">Scheme Code</label>
              <div className="fs-5 fw-semibold">{fund.schemeCode}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">Fund Category</label>
              <div className="fw-medium">{fundDetails.category}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">NAV</label>
              <div className="fw-medium">₹{fundDetails.nav}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">Risk Level</label>
              <div className="fw-medium">{fundDetails.risk}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">Launch Date</label>
              <div className="fw-medium">{fundDetails.launchDate}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">AMC (Fund House)</label>
              <div className="fw-medium">{fundDetails.amc}</div>
            </div>

            <div className="mb-2">
              <label className="form-label text-muted">Expense Ratio</label>
              <div className="fw-medium">{fundDetails.expenseRatio}</div>
            </div>

            <div className="mb-3">
              <label className="form-label text-muted">1-Year Return</label>
              <div
                className={`fw-medium ${
                  fundDetails.oneYearReturn.startsWith("-")
                    ? "text-danger"
                    : "text-success"
                }`}
              >
                {fundDetails.oneYearReturn}
              </div>
            </div>

            <div className="d-grid gap-2 mt-4">
              <button
                onClick={handleSave}
                className="btn btn-primary rounded-pill fw-semibold"
              >
                Save Fund
              </button>

              <button
                onClick={handleBack}
                className="btn btn-outline-secondary rounded-pill fw-semibold"
              >
                Back
              </button>
            </div>
          </div>
        </div>

        <ToastMessage
          message={toastMessage}
          type={toastType}
          show={showToast}
        />
      </div>
    </>
  );
};

export default FundDetailPage;
