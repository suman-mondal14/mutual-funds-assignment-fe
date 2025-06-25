import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const FundDetailPage: React.FC = () => {
  const { state } = useLocation() as any;
  const fund = state?.fund;
  const navigate = useNavigate();

  const handleSave = () => {
    const savedFunds = JSON.parse(localStorage.getItem("savedFunds") || "[]");
    savedFunds.push(fund);
    localStorage.setItem("savedFunds", JSON.stringify(savedFunds));
    alert("Fund saved!");
    navigate("/saved-funds");
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
          className="card shadow-lg"
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <div className="card-body">
            <h4 className="card-title text-primary mb-3">{fund.schemeName}</h4>
            <p className="card-text">
              <strong>Scheme Code:</strong> {fund.schemeCode}
            </p>

            <button onClick={handleSave} className="btn btn-primary mt-3 w-100">
              Save Fund
            </button>

            <button
              onClick={handleBack}
              className="btn btn-outline-secondary mt-2 w-100"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundDetailPage;
