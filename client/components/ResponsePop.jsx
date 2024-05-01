import React, { useState } from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-w-screen h-screen animated fadeIn faster bg-no-repeat bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80')" }}>
      <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
      <div className="relative w-full max-w-lg p-5 mx-auto my-auto bg-white rounded-xl shadow-lg">
        <div className="flex-auto justify-center p-5 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#D69E2E" class="w-16 h-16 mx-auto">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
</svg>

          <h2 className="text-xl font-bold py-4">Face Not Detected</h2>
          <p className="text-sm text-gray-500 px-8">Retry After Closing</p>
        </div>
        <div className="p-3 mt-2 text-center space-x-4 md:block">
    
          <button className="mb-2 md:mb-0 bg-yellow-500 border border-yellow-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-yellow-600" onClick={onConfirm}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
