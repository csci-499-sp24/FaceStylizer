import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

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

  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, );

  return (
    <div>
      <h1>Welcome, {username || "Guest"}!</h1>
    </div>
  );
}

export default Index;
