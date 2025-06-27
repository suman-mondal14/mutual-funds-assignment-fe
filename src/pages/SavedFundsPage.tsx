import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const SavedFundsPage: React.FC = () => {
  const [savedFunds, setSavedFunds] = useState<any[]>([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const fetchFunds = async () => {
    const userId = user?._id;
    try {
      const response = await axios.get(
        `https://mutual-funds-assignment-be.onrender.com/api/v1/get-mutual-funds/${userId}`
      );
      if (response.status === 200) {
        setSavedFunds(response.data.funds);
      }
    } catch (err) {
      console.error("Failed to fetch saved funds:", err);
    }
  };

  useEffect(() => {
    if (user) fetchFunds();
  }, [user]);

  const handleCardClick = (fund: any) => {
    navigate(`/fund/${fund.schemeCode}`, { state: { fund } });
  };

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-4 text-primary text-center">My Saved Mutual Funds</h2>

        {savedFunds.length === 0 ? (
          <p className="text-center text-muted">You have no saved funds.</p>
        ) : (
          <div className="row g-4">
            {savedFunds.map((fund) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={fund.schemeCode}
              >
                <div
                  className="card h-100 shadow-sm border-0 fund-card"
                  style={{
                    cursor: "pointer",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onClick={() => handleCardClick(fund)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 16px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 8px rgba(0,0,0,0.1)";
                  }}
                >
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h6 className="card-title text-primary mb-2">
                      {fund.schemeName}
                    </h6>
                    <div className="mt-auto text-end">
                      <span className="badge bg-dark">
                        Code: {fund.schemeCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SavedFundsPage;
