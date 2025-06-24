// src/FundDetailPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

  if (!fund) {
    return <p className="text-center mt-5 text-danger">No fund data found.</p>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">{fund.schemeName}</h2>
      <p><strong>Scheme Code:</strong> {fund.schemeCode}</p>
      <button onClick={handleSave} className="btn btn-primary mt-3">
        Save Fund
      </button>
    </div>
  );
};

export default FundDetailPage;
