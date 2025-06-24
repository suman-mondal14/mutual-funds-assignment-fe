import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "danger" | "info" | "warning";
  show: boolean;
}

const ToastMessage: React.FC<ToastProps> = ({
  message,
  type = "info",
  show,
}) => {
  if (!show) return null;

  return (
    <div
      className={`toast align-items-center text-white bg-${type} border-0 position-absolute bottom-0 end-0 m-3 show`}
      role="alert"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
      </div>
    </div>
  );
};

export default ToastMessage;
