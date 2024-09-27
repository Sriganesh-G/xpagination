// src/Pagination.js
import React from "react";
import "../App.css";
const Pagination = ({
  currentPage,
  totalPages,
  handleNext,
  handlePrevious,
}) => {
  return (
    <div>
      <button onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </button>
      <span className="currNum">{currentPage}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
