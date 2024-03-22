import React, { useState, useRef } from 'react';
import 'tailwindcss/tailwind.css';
import MlUi from './MlUi';

function FileUpload() {
  const [file, setFile] = useState(null); // State for storing the selected file
  const [showDropMessage, setShowDropMessage] = useState(true);
  const [showUploadButton, setShowUploadButton] = useState(true);
  const [showMlUi, setShowMlUi] = useState(false); // State to control the visibility of the MlUi component
  const fileInputRef = useRef(null);

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0]; // Only consider the first selected file
    setFile(selectedFile);
    setShowDropMessage(false);
  };

  const handleUploadButtonClick = () => {
    setShowUploadButton(false); // Hide the upload button
    setShowMlUi(true); // Show the MlUi component
  };

  const handleCancel = () => {
    setFile(null); // Reset the selected file
    setShowDropMessage(true);
  };

  const passImageToMlUi = () => {
    if (file) {
      return URL.createObjectURL(file); // Pass the URL of the selected file
    }
    return null;
  };

  return (
    <div className="mt-0 bg-white h-screen w-screen sm:px-8 md:px-16 sm:py-8">
      <main className="container mx-auto max-w-screen-lg h-full">
        {showUploadButton && (
          <article
            aria-label="File Upload Modal"
            className="relative h-full flex flex-col bg-white shadow-xl rounded-md"
          >
            {showDropMessage && (
              <div id="overlay" className="w-full h-full absolute top-0 left-0 pointer-events-none z-50 flex flex-col items-center justify-center rounded-md mt-20">
                <i>
                  <svg className="fill-current w-12 h-12 mb-3 text-yellow-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                  </svg>
                </i>
                <p className="text-lg text-yellow-500">Drop a Picture to Upload</p>
              </div>
            )}

            <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                  <span>Drag and Drop a File</span>
                </p>
                <input
                  ref={fileInputRef}
                  id="hidden-input"
                  type="file"
                  className="hidden"
                  onChange={handleFileInputChange}
                />
                <button
                  id="button"
                  className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  onClick={() => fileInputRef.current.click()}
                >
                  Upload a Picture
                </button>
              </header>

              <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                To Upload
              </h1>

              {file && (
                <div className="flex justify-center items-center">
                  <div className="mb-20 block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
                    <article tabIndex="0" className="group w-full h-40 rounded-md focus:outline-none focus:shadow-outline relative bg-gray-100 cursor-pointer">
                      <img alt="upload preview" className="w-full h-full sticky object-cover rounded-md bg-fixed" src={URL.createObjectURL(file)} />
                      <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
                        <h1 className="flex-1"></h1>
                        <div className="flex">
                          <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-red-500" onClick={handleCancel}>
                            <svg className="pointer-events-none fill-current w-4 h-4 ml-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                              <path className="pointer-events-none" d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z" />
                            </svg>
                          </button>
                        </div>
                      </section>
                    </article>
                  </div>
                </div>
              )}

            </section>

            <footer className="flex justify-end px-8 pb-8 pt-4">
              <button
                onClick={handleUploadButtonClick}
                className="rounded-sm px-3 py-1 bg-yellow-500 hover:bg-yellow-400 text-white focus:shadow-outline focus:outline-none animate-bounce"
              >
                FaceStylize
              </button>
            </footer>
          </article>
        )}

        {showMlUi && <MlUi images={file ? [passImageToMlUi()] : []} />} {/* Conditionally render the MlUi component */}

      </main>
    </div>
  );
}

export default FileUpload;
