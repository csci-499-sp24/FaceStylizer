import React, { useState, useRef } from 'react';
import 'tailwindcss/tailwind.css';

function FileUpload({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState('');
  const [stylizedImage, setStylizedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
              setSelectedImage(reader.result);
          };
      }
  };

  const handleStyleChange = (event) => {
      setSelectedStyle(event.target.value);
  };
  
  const handleImageRemove = () => {
      setSelectedImage(null);
      fileInputRef.current.value = ''; 
  };

  async function handleSubmit() {
      let formData = new FormData();
      if (selectedImage) {
          // Convert base64/URLEncoded data component to raw binary data held in a string
          const byteString = atob(selectedImage.split(',')[1]);
          // Separate out the mime component
          const mimeString = selectedImage.split(',')[0].split(':')[1].split(';')[0];
          // Write the bytes of the string to a Blob
          const blob = new Blob([Uint8Array.from(byteString, c => c.charCodeAt(0))], { type: mimeString });
          formData.append('image', blob);
          formData.append('style', selectedStyle);

          try {
              const response = await StylizerApi.post('/stylize', formData, {
                  headers: {
                      'Content-Type': 'multipart/form-data',
                  },
              });
              // Assuming the response includes the URL to the stylized image
              setStylizedImage(URL.createObjectURL(response.data));
          } catch (error) {
              console.error('Error uploading file:', error);
          }
      } else {
          // Prompt the user to make sure they have selected an image and a style
          alert('Please select an image and a style.');
      }
  }

  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Get the file from the event
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
    }
  };

  return (
      <div className="flex flex-col items-center bg-white min-h-screen py-8">
          <h1 className="text-xl font-bold text-gray-800 mb-4">FaceStylizer</h1>

          <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInputChange}
          />

          {selectedImage ? (
              <div className="relative">
                  <img src={selectedImage} alt="Uploaded" className="object-contain rounded-lg shadow-lg" style={{ maxHeight: '500px', maxWidth: '100%' }} />
                  <button
                      className="absolute top-0 right-0 m-2 p-1 bg-red-500 rounded-full"
                      onClick={handleImageRemove}
                  >
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                  </button>
              </div>
          ) : (
            <div 
              className="upload-area border-2 border-dashed border-gray-300 rounded-md p-6 mt-4 text-center cursor-pointer"
              onClick={() => fileInputRef.current.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <svg className="mx-auto mb-2 h-12 w-12 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5l7 7-7 7"/>
              </svg>
              <p className="text-gray-600">Choose a file or drag it here.</p>
            </div>

          )}

          <div className="mt-4">
              <select
                  value={selectedStyle}
                  onChange={handleStyleChange}
                  className="btn-select" // Add your own styling
              >
                  <option value="" disabled>Select FaceStylizer</option>
                  <option value="style1">STYLE 1</option>
                  <option value="style2">STYLE 2</option>
                  <option value="style3">STYLE 3</option>
              </select>
          </div>

          <button
              className="btn-submit mt-4" // Add your own styling
              onClick={handleSubmit}
              disabled={!selectedImage || !selectedStyle}
          >
              Submit
          </button>

          {stylizedImage && (
              <div className="w-full md:w-3/4 mt-4">
                  <img src={stylizedImage} alt="Stylized" className="object-contain rounded-lg shadow-lg" style={{ maxHeight: '500px', maxWidth: '100%' }} />
              </div>
          )}
      </div>
  );
}

export default FileUpload;