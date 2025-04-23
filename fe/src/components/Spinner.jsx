import React from "react";

const Spinner = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center">
      <div className="spinner-container">
        <div className="spinner-ring"></div>
      </div>
    </div>
  );
};

export default Spinner;
