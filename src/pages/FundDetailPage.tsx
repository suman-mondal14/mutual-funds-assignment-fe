import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import axios from "axios";
import ToastMessage from "../components/ToastMessage";

const FundDetailPage: React.FC = () => {
  const { state } = useLocation() as any;
  const fund = state?.fund;
  const navigate = useNavigate();
  const { user } = useUser();

  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "danger">("success");
  const [showToast, setShowToast] = useState<boolean>(false);

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
      } else if (response.status === 409) {
        showToastHandler(response.data.message, "danger");
      }
    } catch (error) {
      showToastHandler("Something went wrong!", "danger");
    }

    //navigate("/saved-funds");
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
