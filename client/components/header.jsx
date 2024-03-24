import React, { useState, useEffect } from 'react';
import Login from "./login";
import SignUp from './signup';
import Profile from './profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

function RHeader() {
  const [open, setOpen] = useState(true);
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

  if(username) {
    return (
      <div className="antialiased bg-white dark-mode:bg-gray-800">
        <div className="w-full text-gray-700 dark-mode:text-gray-200">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">FACESTYLIZER</a>
            </div>
            <nav className={`flex-col flex-grow ${open ? '' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
              <div className="flex items-center">
                  <Profile />
                </div>
            </nav>
      </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="antialiased bg-white dark-mode:bg-gray-800">
        <div className="w-full text-gray-700 dark-mode:text-gray-200">
          <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div className="flex flex-row items-center justify-between p-4">
              <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">FACESTYLIZER</a>
            </div>
            <nav className={`flex-col flex-grow ${open ? '' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
                <div className="flex items-center">
                  <Login />
                  <SignUp />
                </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
  
}

export default RHeader;
