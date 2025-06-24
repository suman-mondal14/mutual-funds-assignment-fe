// src/SavedFundsPage.tsx
import React, { useEffect, useState } from "react";

const SavedFundsPage: React.FC = () => {
  const [savedFunds, setSavedFunds] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("savedFunds") || "[]");
    setSavedFunds(data);
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-primary">My Saved Mutual Funds</h2>
      {savedFunds.length === 0 ? (
        <p>No saved funds yet.</p>
      ) : (
        <ul className="list-group">
          {savedFunds.map((fund) => (
            <li
              key={fund.schemeCode}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {fund.schemeName}
              <span className="badge bg-primary">{fund.schemeCode}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedFundsPage;
