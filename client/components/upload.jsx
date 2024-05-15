import React, { useState, useRef, useEffect, useCallback } from 'react';
import FilesApi from "@/Api/FilesApi";
import StylizerApi from '@/Api/StylizerApi';
import { useDropzone } from "react-dropzone";
import ConfirmationModal from './ResponsePop';
import CustomImageUpload from './custom';
import ImageDropzone from './imagedrop';
import NextCheckbox from './checkbox';


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
    const [isCustomSelected, setIsCustomSelected] = useState(false);
    const [isDropzone, setIsDropzone] = useState(false);

    

    const [custom, setCustom] = useState(null);
    const fileInputRef = useRef(null);

    
    
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCustom(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    
    const handleConfirm = () => {
      console.log("added!");
      setModalOpen(false);
      window.location.reload(); 
    };
  
    const handleClose = () => {
      setModalOpen(false);
      window.location.reload(); 
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
  
    const handleCustomChange = (newImage)=>{

        setCustom(newImage);
    }

    // const handleModelChange = (event) => {
    //   setSelectedModel(event.target.value);
    // };
    const handleStyleChange = (event) => {
      const selectedValue = event.target.value;
      setSelectedStyle(selectedValue);
      if (selectedValue === 'custom') {
        setIsCustomSelected(true);
        setTimeout(function() {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);
    }
     else {
        setIsCustomSelected(false);
      }
    };
    
    const handleCheckboxChange = () => {
        setIsCustomSelected(prevState => !prevState);
      setTimeout(function() {
            window.scrollTo(0, document.body.scrollHeight);
        }, 100);  
        
        
            setSelectedStyle('custom');
        
    
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
        setCustom(null);
    };
    const handleImageRemoveCustom = (index) => {
      // const updatedImages = [...displayedImages];
      // updatedImages.splice(index, 1);
      // setDisplayedImages(updatedImages);
      // setSelectedImage(null);
      // setSelectedStyle(null);
      setCustom(null);
  };
    return (
      <div className="flex flex-col items-center justify-center p-6 min-h-screen pt-40">

      <NextCheckbox onChange={handleCheckboxChange} /><div className="flex">
    <div className="flex-1 w-100">

        <ImageDropzone
            getRootProps={getRootProps}
            getInputProps={getInputProps}
            selectedImage={selectedImage}
            handleSwitchImage={handleSwitchImage}
            handleClearImage={handleClearImage}
        />
    </div>
    {isCustomSelected && (
        <div className="flex-1 w-64">
            <CustomImageUpload
                handleFileSelect={handleFileSelect}
                handleImageRemove={handleImageRemoveCustom}
                handleSwitchImage={handleCustomChange}
                Custom={custom}
            />
        </div>
    )}
</div>

{!isCustomSelected && (
        <div className="w-full max-w-4xl mt-4">
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
                    {/* <option value="custom">Custom</option> */}
                </select>
                </div>

           </div>
)}
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

                        // Generate Pretrain Style
                        if (!isCustomSelected) {
                            // Convert data URL to blob
                            const response = await fetch(selectedImage);
                            const blob = await response.blob();
                            formData.append('image', blob, 'image.jpg'); // Attach image to payload 
                            formData.append('style', selectedStyle); // Attach selected style to payload
                            
                            // Send formData w/ request
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
                                setModalOpen(true);
                            }
                        } 
                        // Generate Custom Style
                        else {
                            // Convert data URL to blob
                            const response = await fetch(selectedImage);
                            const blob = await response.blob();

                            const customResponse = await fetch(custom);
                            const customBlob = await customResponse.blob();

                            formData.append('image', blob, 'image.jpg'); // Attach image to payload 
                            formData.append('custom', customBlob, "custom.jpg"); // Attach custom image to payload
                            formData.append('style', 'custom'); // Attach style to payload
                            
                            // Send formData w/ request
                            try {
                                console.log(`Sending request to ${process.env.NEXT_PUBLIC_IP}`)
                                const response = await StylizerApi.post("generateCustomStyle", formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data'
                                    }
                                });
                                console.log('Success response', response.data);
                                setStylizedImage(URL.createObjectURL(response.data));

                            } catch (error) {
                                console.error('Error Message:', await error.response.data.text())
                                setModalOpen(true);
                            }
                        }




                    }}
                    disabled={!selectedImage || !selectedStyle} // Button is disabled if no image is selected or no style is chosen
                >
                    Submit
                </button>
                {modalOpen && (
        <ConfirmationModal
          isOpen={modalOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
        />
      )}
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
                        const url = 'upload/' + sessionStorage.getItem('uid');
                        console.log(url);

                        console.log(process.env.NODE_ENV);       
                        let formData = new FormData();
                        if (stylizedImage) {
                            // Convert data URL to blob
                            const response = await fetch(stylizedImage);
                            const blob = await response.blob();
                            formData.append('image', blob, 'image.jpg'); // Assuming image is a JPEG
                            formData.append('style', selectedStyle); // Attach selected style to payload
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

        </div>
    );
}

export default FileUpload;
