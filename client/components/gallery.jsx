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
      image0: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      image1: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image3: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      time: "Jan 1, 2023",
    },
    {
      id: 2,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      image1: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image3: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      time: "Jan 2, 2023",
    },
    {
      id: 3,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      image1: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image3: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      time: "Jan 3, 2023",
    },
    {
      id: 4,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      image1: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image3: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      time: "Jan 4, 2023",
    },
    {
      id: 5,
      title: "Spaghetti Carbonara",
      description: "A classic Italian pasta dish with a creamy egg sauce, pancetta, and Parmesan.",
      image0: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      image1: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      image3: "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      time: "Jan 4, 2023",
    },

    // Add more entries as needed
  ]);
  return (

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Gallery</h1>

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
                style={{ height: '300px' }}
              />
              <img
                className="w-1/3 object-cover rounded-lg"
                src={result.image1}
                alt="Reference Image"
                style={{ height: '300px' }}
              />
              <img
                className="w-1/3 object-cover rounded-lg"
                src={result.image3}
                alt="Something else?"
                style={{ height: '300px' }} 
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
