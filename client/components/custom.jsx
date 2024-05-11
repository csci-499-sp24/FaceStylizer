import React, { useRef } from 'react';

const CustomImageUpload = ({ handleFileSelect, handleImageRemove, handleSwitchImage, Custom }) => {
  const fileInputRef = useRef(null);

  const handleClick = (event) => {
    if (event.target === fileInputRef.current) {
      // Click event originated from the file input itself, allow default behavior
      return;
    }
    // Click event originated from another element, trigger file input click
    fileInputRef.current.click();
  };

  return (
    <div className="w-full max-w-4xl" onClick={handleClick}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
      />
      <div className={`rounded-lg p-4 ${Custom ? "" : "border-gray-300"}`}>
        {!Custom ? (
          <div className="text-gray-500 text-center">
            <img
              src="https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
              alt="Placeholder"
              className="mx-auto max-w-full max-h-96 rounded"
            />
            <p>Drag and drop some files here, or click to select files</p>
          </div>
        ) : (
          <div className="relative">
            <img
            
              src={Custom}
              alt="Preview"
              className="rounded mx-auto max-w-full max-h-96"
            />
            <button
              onClick={handleSwitchImage}
              className="absolute top-0 right-0 m-2 bg-white rounded-full p-1 shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>
            </button>
            <button onClick={handleImageRemove} className="absolute top-0 right-10 m-2 bg-white rounded-full p-1 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {/* <button
          onClick={() => fileInputRef.current.click()}
          className="justify-center items-center text-center cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 w-full"
        >
          Custom
        </button> */}
      </div>
    </div>
  );
}

export default CustomImageUpload;
