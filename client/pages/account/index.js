import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

function Index() {
  const [username, setUsername] = useState("");

  var loadingTime = 1000;

  setInterval(function () {
    loadingTime -= 1000;
  },  1000);

  useEffect(() => {
    const fetchUsername = () => {
      try {
        // Retrieve the username from session storage
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error("Error fetching username:", error);
      }
    };

    fetchUsername();
  }, []);

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('../');
    }, 1000);
    return () => clearTimeout(timer);
  }, );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Centered Image */}
      <div className="mb-4" style={{ marginTop: "-50px" }}>
        <img src="https://pics.craiyon.com/2023-06-07/b3be1cc88995470ba8a39f6aa9b20dd0.webp" alt="Centered Image" className="w-24 h-24 m-0" />
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-yellow-500 animate-bounce">Welcome to FACESTYLIZER, {username || "Guest"}</h1>
        <p className="text-lg text-gray-800">You will be redirected to the homepage in a few seconds</p>
      </div>
    </div>
  );
}

export default Index;
