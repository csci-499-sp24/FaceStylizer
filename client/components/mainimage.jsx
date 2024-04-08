import React, { useState, useRef } from 'react';

const CenteredImage = () => {
  const uploadSectionRef = useRef(null); // This ref is attached to the upload section

  const scrollToUpload = () => {
    uploadSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Centered Image */}
      <div className="mb-4" style={{ marginTop: "-50px" }}>
        <img src= "/facial-recognition.png" alt="Centered Image" className="w-24 h-24 m-0" />
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-500 animate-bounce">Welcome to FACESTYLIZER</h1>
        <p className="text-lg text-gray-800">Your one-stop destination for stylized face designs</p>
      </div>
      
        {/* Begin Button */}
        <button 
            onClick={scrollToUpload} 
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded cursor-pointer hover:bg-yellow-600 focus:outline-none"
          >
            Begin
        </button>
    </div>
  );
};

export default CenteredImage;
