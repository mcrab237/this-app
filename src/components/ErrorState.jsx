import React from "react";
import "../styles/components/ErrorState.css";

const ErrorState = ({ message }) => (
  <div className="error-state">
    <div className="error-icon">⚠️</div>
    <h2 className="error-title">Oops! Something went wrong</h2>
    <p className="error-message">{message}</p>
    <button
      onClick={() => window.location.reload()}
      className="button button-primary"
    >
      Try Again
    </button>
  </div>
);

export default ErrorState;
