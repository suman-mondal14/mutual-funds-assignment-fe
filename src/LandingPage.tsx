// src/LandingPage.tsx
import React, { useState } from "react";
import { searchFunds } from "./services/fundApi";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const data = await searchFunds(query);
    setResults(data);
  };

  const handleViewDetails = (fund: any) => {
    navigate(`/fund/${fund.schemeCode}`, { state: { fund } });
  };

  return (
    <div className="container py-5 height-100">
      <h2 className="text-center text-primary mb-4">Search Mutual Funds</h2>
      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter mutual fund name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </form>

      {results.length > 0 && (
        <div className="list-group">
          {results.map((fund) => (
            <button
              key={fund.schemeCode}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleViewDetails(fund)}
            >
              {fund.schemeName}
              <span className="badge bg-primary">{fund.schemeCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
