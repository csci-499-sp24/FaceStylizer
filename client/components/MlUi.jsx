import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

function MlUi({ onBack }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedModel, setSelectedModel] = useState("");

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

  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setImageFile(null);
    setSelectedModel("");
  };

  const handleSwitchImage = () => {
    open();
  };

  const handleSubmit = async () => {
    if (!imageFile || !selectedModel) {
      alert("Please select an image and a model before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("model", selectedModel);

    try {
      const response = await FilesApi.uploadFile("YOUR_API_ENDPOINT", formData);
      const result = await response.json();
      alert(`Upload successful: ${result.message}`);
      handleClearImage();
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white min-h-screen">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="w-full max-w-4xl"
      >
        <input {...getInputProps()} />
        <div
          className={`border-2 border-dashed rounded-lg p-4 ${
            selectedImage ? "" : "border-gray-300"
          }`}
        >
          {!selectedImage ? (
            <p className="text-gray-500 text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
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
                ✏️
              </button>
              <button
                onClick={handleClearImage}
                className="absolute top-0 right-10 m-2 bg-white rounded-full p-1 shadow-lg"
              >
                ❌
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 w-full max-w-4xl">
        <label className="block text-sm font-medium text-gray-700">
          Select Model
        </label>
        <select
          value={selectedModel}
          onChange={handleModelChange}
          className="form-select block w-full mt-1"
        >
          <option value="">Select Model</option>
          <option value="model1">Model 1</option>
          <option value="model2">Model 2</option>
        </select>
      </div>
      <div className="mt-4 space-x-2 flex justify-center w-full max-w-4xl">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:outline-none"
        >
          Back
        </button>
        <button
          onClick={handleClearImage}
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={!selectedImage || !selectedModel}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default MlUi;
