import React, { useState, useEffect } from "react";

function Index() {
  const [username, setUsername] = useState("");

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

  return (
    <div>
      <h1>Welcome, {username || "Guest"}!</h1>
    </div>
  );
}

export default Index;
