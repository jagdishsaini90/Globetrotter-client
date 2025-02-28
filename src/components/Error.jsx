import React from "react";

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <p className="error-text">⚠️ {error?.message}</p>
    </div>
  );
};

export default Error;
