import React from 'react';

const CenteredImage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Centered Image */}
      <div className="mb-4" style={{ marginTop: "-50px" }}>
        <img src="https://pics.craiyon.com/2023-06-07/b3be1cc88995470ba8a39f6aa9b20dd0.webp" alt="Centered Image" className="w-24 h-24 m-0" />
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-500 animate-bounce">Welcome to FACESTYLIZER</h1>
        <p className="text-lg text-gray-800">Your one-stop destination for stylish face designs</p>
      </div>
      
      <div>
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
    </div>
  );
};

export default CenteredImage;
