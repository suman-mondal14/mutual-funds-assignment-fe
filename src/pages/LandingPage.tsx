import React, { useState, useEffect } from "react";
import { searchFunds } from "../services/fundApi";
import { useNavigate } from "react-router-dom";

let debounceTimeout: ReturnType<typeof setTimeout>;

const LandingPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      clearTimeout(debounceTimeout);
      setResults([]);
      setSearched(false);
      setSearching(false);
      return;
    }

    setSearching(true);
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(async () => {
      try {
        const data = await searchFunds(query);
        setResults(data);
        setSearched(true);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
        setSearched(true);
      } finally {
        setSearching(false);
      }
    }, 500);
  }, [query]);

  const handleViewDetails = (fund: any) => {
    navigate(`/fund/${fund.schemeCode}`, { state: { fund } });
  };

  return (
    <div className="container py-5 height-100">
      <h2 className="text-center text-primary mb-4">Search Mutual Funds</h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="d-flex justify-content-center mb-4"
      >
        <input
          type="text"
          className="form-control w-50 me-2"
          placeholder="Enter mutual fund name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {searching && (
        <p className="text-center text-muted">Searching for "{query}"...</p>
      )}

      {searched && query.trim() && results.length === 0 && !searching && (
        <p className="text-center text-danger">
          No results found for "{query}"
        </p>
      )}

      {results.length > 0 && (
        <div className="list-group">
          {results.map((fund) => (
            <button
              key={fund.schemeCode}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => handleViewDetails(fund)}
            >
              {fund.schemeName}
              <span className="badge bg-primary">View</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
