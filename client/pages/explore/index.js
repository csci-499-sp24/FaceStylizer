import React, { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import RHeader from "@/components/header";
import { Text, Button, Modal, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import FilesApi from "@/Api/FilesApi";
import UsersApi from "@/Api/UsersApi";

const Explore = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState('All');
  const [users, setUsers] = useState({}); 

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => Math.min(prevIndex + 5, images.length - 1));
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => Math.max(prevIndex - 5, 0));
  };

  const handleStyleChange = (event) => {
    setSelectedStyle(event.target.value);
    // Reset currentIndex when changing style to ensure consistency
    setCurrentIndex(0);
  };

  useEffect(() => {
    const fetchImages = async () => {
        const response = await FilesApi.get(`/mostrecent`);
        setImages(response.data);
        setLoading(false);
    };

    fetchImages();
  }, []);

  const filteredImages = selectedStyle === 'All' ? images : images.filter(image => image.style === selectedStyle);

  useEffect(() => {
    fetchUserData();
  }, [filteredImages]);

  const fetchUserData = async () => {
    try {
        const updatedImages = await Promise.all(filteredImages.map(async (image) => {
            const response = await UsersApi.get(`/readUser/${image.userId}`);
            const user = response.data.message;
            return { ...image, username: user.username };
          }));
          setNewImages(updatedImages);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div>
        <RHeader/>
        
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 to-orange-500 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white">Explore Facestylizer</h1>
        <div className="text-2xl mb-8 text-white">See what other users are uploading!</div>
          <div className="mt-4">
            <label htmlFor="style" className="text-2xl font-bold block text-white">Select Style:</label>
            <select id="style" value={selectedStyle} onChange={handleStyleChange} 
                className="text-center cursor-pointer hover:opacity-80 inline-flex items-center shadow-md my-2 px-4 py-2 bg-gray-900 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150">
              <option value="All">All</option>
              <option value="disney">Disney</option>
              <option value="jojo">JoJo</option>
              <option value="jojo_yasuho">JoJo Yasuho</option>
              <option value="arcane_jinx">Arcane Jinx</option>
            </select>
          </div>

        {newImages.slice().reverse().slice(currentIndex, currentIndex + 5).map(image => (
            <div key={image._id} className="bg-white p-4 mb-4 rounded">
              <img src={image.fileURL} alt="Uploaded face" className="w-full rounded" />
              {image && image.username && (
                <p><span className="font-bold">Uploaded by:</span> {image.username}</p>
              )}
                {image && !image.username && (
                <p><span className="font-bold">Uploaded by:</span> John Doe #{image.userId}</p>
              )}
              <p><span className="font-bold">Upload Date:</span> {formatDate(image.uploadDate)}</p>
              <p><span className="font-bold">Style:</span> {image.style}</p>
            </div>
          ))}

        <div className="flex justify-between mt-4">
            <button onClick={handlePrevClick} 
            className="bg-neutral-700 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded">
              Previous
            </button>
            <button onClick={handleNextClick} className="bg-neutral-700 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded">
              Next
            </button>
        </div>
          
      </div>
    </div>
    </div>
  );
};

export default Explore;