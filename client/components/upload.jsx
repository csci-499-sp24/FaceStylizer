import React, { useState, useRef, useEffect, useCallback } from 'react';
import FilesApi from "@/Api/FilesApi";
import StylizerApi from '@/Api/StylizerApi';
import { useDropzone } from "react-dropzone";
import ConfirmationModal from './ResponsePop';


function FileUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedStyle, setSelectedStyle] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [displayedImages, setDisplayedImages] = useState(images || []);
    const [stylizedImage, setStylizedImage] = useState(null);
    const firstImageRef = useRef(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedModel, setSelectedModel] = useState("");
    const scrollRef = useRef(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    
    
    
    const handleConfirm = () => {
      console.log("added!");
      setModalOpen(false);
    };
  
    const handleClose = () => {
      setModalOpen(false);
    };

    // const handleImageSelect = (image, index) => {
    //     setSelectedImage(image);
    //     setCurrentImageIndex(index);
    // };

    // const handleFileInputChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.readAsDataURL(file);
    //         reader.onloadend = () => {
    //             const newImages = [reader.result, ...displayedImages];
    //             setSelectedImage(reader.result);
    //             setCurrentImageIndex(0);
    //             setDisplayedImages(newImages);
    //         };
    //     }
    // };

    // const handleImageRemove = () => {
    //     setSelectedImage(null);
    //     setSelectedStyle(null);
    // };

    const handleClearImage = () => {
      setSelectedImage(null);
      setImageFile(null);
      setSelectedModel("");
    };
  

    // const handleModelChange = (event) => {
    //   setSelectedModel(event.target.value);
    // };
    const handleStyleChange = (event) => {
        setSelectedStyle(event.target.value); 
    };

    const handleSwitchImage = () => {
      open();
    };

    const onDrop = useCallback((acceptedFiles) => {
      const file = acceptedFiles[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
      onDrop,
      accept: "image/*",
      noClick: !!selectedImage,
    });

    const handleImageRemove = (index) => {
        // const updatedImages = [...displayedImages];
        // updatedImages.splice(index, 1);
        // setDisplayedImages(updatedImages);
        setSelectedImage(null);
        setSelectedStyle(null);
    };

    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-screen pt-40">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-full max-w-4xl"
      >
        <input {...getInputProps()} />
        <div 
          className={` rounded-lg p-4 ${
            selectedImage ? "" : "border-gray-300"
          }`}
        >
          {!selectedImage ? (
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
                src={selectedImage}
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

              
              <button
        onClick={handleClearImage}
      className="absolute top-0 right-10 m-2 bg-white rounded-full p-1 shadow-lg"
>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
     <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
      </svg>

        </button>

            </div>
          )}
        </div>
        <div className="w-full flex justify-center items-center">

        <select
                    id="restaurantImage"
                    className="text-center cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150 w-full"
                    onChange={handleStyleChange}
                >
                    <option>Select FaceStylizer</option>
                    <option value="disney">Disney</option>
                    <option value="jojo">JoJo</option>
                    <option value="jojo_yasuho">JoJo Yasuho</option>
                    <option value="arcane_jinx">Arcane Jinx</option>
                </select>
                </div>
           </div>
            <div className="w-full md:w-3/4 mt-4 flex justify-center items-center">
                {/* <button
                    className="inline-flex items-center shadow-md px-4 py-2 bg-red-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onClick={onBack}
                >
                    Back
                </button> */}
                <button
                    className="inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onClick={() => handleImageRemove(currentImageIndex)}
                    disabled={!selectedImage}
                >
                    Clear
                </button>
      


                {/* {selectedStyle && (
                    <button
                        className="inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                        onClick={() => console.log("Submitted")} 
                    >
                        Submit
                    </button>
                )} */}


                <button
                    className="inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    onClick={async () => {
                      setIsLoading(true); 
                      setTimeout(() => {
                        window.scrollTo(0, document.body.scrollHeight);
                      }, 100);
                        console.log('Submitting form data:', selectedImage);
                        
                        console.log(process.env.NODE_ENV)
                        console.log(`${process.env.NEXT_PUBLIC_STYLIZER_URL}`)
                        console.log(selectedStyle)
                  
                        let formData = new FormData();
                        if (selectedImage) {
                            // Convert data URL to blob
                            const response = await fetch(selectedImage);
                            const blob = await response.blob();
                            formData.append('image', blob, 'image.jpg'); // Attach image to payload 
                            formData.append('style', selectedStyle); // Attach selected style to payload
                        }

                        try {
                            console.log(`Sending request to ${process.env.NEXT_PUBLIC_STYLIZER_URL}`)
                            const response = await StylizerApi.post("upload", formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            console.log('Success response', response.data);
                            setStylizedImage(URL.createObjectURL(response.data));

                        } catch (error) {
                            console.error('Error Message:', await error.response.data.text())
                                                  }

                                                  setModalOpen(true);

                    }}
                    disabled={!selectedImage || !selectedStyle} // Button is disabled if no image is selected or no style is chosen
                >
                    Submit
                </button>

            </div>
            {isLoading && ( 
            <div className="w-full md:w-3/4 mt-4 flex justify-center items-center pt-60">
          <div className="bg-gray-200 h-96 w-full flex justify-center items-center">
       {!stylizedImage && (
          <svg className="animate-spin h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0117.709 5.29h2.004A10.001 10.001 0 002.002 12H6v-.009z"></path>
        </svg>
        )}
        {stylizedImage && (
            <img
                src={stylizedImage}
                alt="Stylized Image"
                className="max-h-96 max-w-full"
            />
        )}
       </div>
    </div>
            )}


{isLoading && (
<div>

                <button
                    className="mt-2 inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                    
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      window.location.reload();
                    }}
                  >
                      FaceStylize

                    </button>

                <button
                    className="mt-2 inline-flex items-center shadow-md px-4 py-2 bg-yellow-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"

                    onClick={async () => {
                        console.log('Submitting form data:', stylizedImage);
                        const url = 'upload/' + sessionStorage.getItem('username');
                        console.log(url);

                        console.log(process.env.NODE_ENV);       
                        let formData = new FormData();
                        if (stylizedImage) {
                            // Convert data URL to blob
                            const response = await fetch(stylizedImage);
                            const blob = await response.blob();
                            formData.append('image', blob, 'image.jpg'); // Assuming image is a JPEG
                        }

                        try {
                            const response = await FilesApi.post(url, formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            });
                            console.log('Uploaded file successfully:', response.data);
                        } catch (error) {
                            console.error('Error uploading file:', error);
                        }
                    }}
                >
                    Save Image
                </button>
                </div>)}
                     <ConfirmationModal isOpen={modalOpen} onClose={handleClose} onConfirm={handleConfirm} />

        </div>
    );
}

export default FileUpload;
