// FailedLogo.js
import React from 'react';

const FailedLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dc3545"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" fill="#f8d7da" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="#dc3545" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="#dc3545" />
    </svg>
  );
};

export default FailedLogo;
