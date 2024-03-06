import React from 'react';

const ArrowDown = () => {
  return (
    <div className="flex justify-center items-start min-h-screen">

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-yellow-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    
    </div>
  );
};

export default ArrowDown;
