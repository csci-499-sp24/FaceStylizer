import React from "react";
import "tailwindcss/tailwind.css";
import { useState } from "react";
import { Table } from "reactstrap";



const Gallery = () => {


  const [searchResults, setSearchResults] = useState([
    {
      id: 1,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://i.postimg.cc/L4wCNCX1/Screen-Shot-2024-05-01-at-5-08-21-PM.png",
      image1: "https://i.postimg.cc/Gmrj5Z1H/Screen-Shot-2024-05-01-at-5-09-56-PM.png",
      image2: "https://i.postimg.cc/Hxfw4N2W/Screen-Shot-2024-05-01-at-5-10-34-PM.png",
      time: "Jan 1, 2023",
    },
    {
      id: 2,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://i.postimg.cc/fbVS2KkV/Screen-Shot-2024-05-01-at-5-14-09-PM.png",
      image1: "https://i.postimg.cc/CLwBTYzT/Screen-Shot-2024-05-01-at-5-14-58-PM.png",
      image2: "https://i.postimg.cc/cLbrnnT0/Screen-Shot-2024-05-01-at-5-15-43-PM.png",
      time: "Jan 2, 2023",
    },
    {
      id: 3,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://i.postimg.cc/B6x6kw3n/Screen-Shot-2024-05-01-at-5-16-50-PM.png",
      image1: "https://i.postimg.cc/8cp13pwZ/Screen-Shot-2024-05-01-at-5-18-22-PM.png",
      image2: "https://i.postimg.cc/7YP6tVWq/Screen-Shot-2024-05-01-at-5-17-38-PM.png",
      time: "Jan 3, 2023",
    },
    {
      id: 4,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://i.postimg.cc/L4wCNCX1/Screen-Shot-2024-05-01-at-5-08-21-PM.png",
      image1: "https://i.postimg.cc/CLwBTYzT/Screen-Shot-2024-05-01-at-5-14-58-PM.png",
      image2: "https://i.postimg.cc/5Nkx7Mzm/Screen-Shot-2024-05-01-at-5-20-57-PM.png",
      time: "Jan 4, 2023",
    },
    {
      id: 5,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://i.postimg.cc/fbVS2KkV/Screen-Shot-2024-05-01-at-5-14-09-PM.png",
      image1: "https://i.postimg.cc/Gmrj5Z1H/Screen-Shot-2024-05-01-at-5-09-56-PM.png",
      image2: "https://i.postimg.cc/KYhhwc8t/Screen-Shot-2024-05-01-at-5-22-11-PM.png",
      time: "Jan 4, 2023",
    },

    // Add more entries as needed
  ]);
  return (

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-yellow-500 mb-4 animate-bounce text-center">Gallery 📸</h1>
      <p className="text-lg text-gray-800 text-center">View your stylized images all in one place</p>
       <br></br>
      <div className="flex justify-between text-center mb-2">
        <h2 className="w-1/3 text-lg font-semibold">Filter</h2>
        <h2 className="w-1/3 text-lg font-semibold">Uploaded Image</h2>
        <h2 className="w-1/3 text-lg font-semibold">Output Image</h2>
      </div>
      {searchResults.map((result) => (
        <div key={result.id} className="mb-6">
          <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="pb-4"></div>
            <div className="absolute top-0 left-0 bg-white bg-opacity-90 px-3 py-2 rounded-br-lg text-sm">
              <p>{result.time}</p>
            </div>
            <div className="flex space-x-4 p-4 justify-center">
              <img
                className="w-1/3 object-cover rounded-lg"
                src={result.image0}
                alt="Stylized Image"
                style={{ width: '450px' }}
              />
              <img
                className="w-1/3 object-cover rounded-lg"
                src={result.image1}
                alt="Reference Image"
                style={{ width: '450px' }}
              />
              <img
                className="w-1/3 object-cover rounded-lg"
                src={result.image2}
                alt="Something else?"
                style={{ width: '450px' }} 
              />
              <div className="pb-4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Gallery;
