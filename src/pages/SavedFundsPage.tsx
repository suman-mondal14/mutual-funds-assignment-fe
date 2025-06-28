import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import ToastMessage from "../components/ToastMessage";

const SavedFundsPage: React.FC = () => {
  const [savedFunds, setSavedFunds] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { user } = useUser();
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

  const showToastHandler = (message: string, type: "success" | "danger") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const fetchFunds = async () => {
    try {
      const res = await axios.get(
        `https://mutual-funds-assignment-be.onrender.com/api/v1/get-mutual-funds/${user?._id}`
      );
      setSavedFunds(res.data.funds);
    } catch (err) {
      console.error("Error fetching funds:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (
    e: React.MouseEvent,
    schemeCode: string | number
  ) => {
    e.stopPropagation();
    try {
      await axios.delete(
        `https://mutual-funds-assignment-be.onrender.com/api/v1/delete-mutual-fund/${user?._id}/${schemeCode}`
      );
      setSavedFunds((prev) =>
        prev.filter((fund) => fund.schemeCode !== schemeCode)
      );
      showToastHandler("Mutualfund deleted successfully", "success");
    } catch (error) {
      showToastHandler("Something went wrong! Try again", "danger");
    }
  };

  const handleCardClick = (fund: any) => {
    navigate(`/fund/${fund.schemeCode}`, { state: { fund } });
  };

  useEffect(() => {
    if (user) fetchFunds();
  }, [user]);

  return (
    <>
      <Header />
      <div className="container py-5">
        <h2 className="mb-5 text-center fw-bold text-primary">
          My Saved Mutual Funds
        </h2>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" />
            <p className="text-muted">Loading your saved funds...</p>
          </div>
        ) : savedFunds.length === 0 ? (
          <p className="text-center text-muted">
            You haven’t saved any funds yet.
          </p>
        ) : (
          <div className="row g-4">
            {savedFunds.map((fund) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={fund.schemeCode}
              >
                <div
                  className="card shadow-sm border-0 rounded-4 h-100 position-relative"
                  style={{
                    backgroundColor: "#fdfdff",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    paddingTop: "2rem",
                  }}
                  onClick={() => handleCardClick(fund)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-6px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 12px 24px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.1)";
                  }}
                >
                  {/* Delete Icon */}
                  <button
                    className="btn position-absolute"
                    style={{
                      top: "10px",
                      right: "10px",
                      zIndex: 10,
                      borderRadius: "50%",
                      padding:0
                    }}
                    onClick={(e) => handleDelete(e, fund.schemeCode)}
                    title="Delete Fund"
                  >
                    <MdDeleteOutline size={20} color="#dc3545" />
                  </button>

                  <div className="card-body d-flex flex-column justify-content-between p-3">
                    <h6
                      className="card-title fw-semibold text-primary mb-3 text-wrap"
                      style={{ fontSize: "0.95rem", minHeight: "48px" }}
                    >
                      {fund.schemeName}
                    </h6>
                    <div className="text-end">
                      <span className="badge bg-primary-subtle text-primary fw-semibold rounded-pill">
                        Code: {fund.schemeCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ToastMessage
          message={toastMessage}
          type={toastType}
          show={showToast}
        />
      </div>
    </>
  );
};

export default SavedFundsPage;
