import React, { useState } from "react";
import Login from "/components/login";
import SignUp from './signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';
import { useAuth } from '../context/authContext';

function RHeader() {
  const [open, setOpen] = useState(true);
  const { user, signOut } = useAuth(); // Using user and signOut from context

  const handleLoginSuccess = (tokens) => {
    // Assuming tokens contain user details and the access token
    setUser({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      profile: tokens.profile, // User profile information
    });

    // Optionally, you might want to store the access token in local storage for persistence
    localStorage.setItem('accessToken', tokens.access_token);
  };

  return (
    <div className="antialiased bg-white dark-mode:bg-gray-800">
      <div className="w-full text-gray-700 dark-mode:text-gray-200">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between p-4">
            <a
              href="#"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              FACESTYLIZER
            </a>
          </div>
            {
            user ? (
              <>
                <div>Welcome, {user.profile.name}</div>
                               <img src={user.profile.picture}></img>
 <button onClick={signOut}>Sign Out</button>
              </>
              
            ): (
              <nav className={`flex-col flex-grow ${open ? '' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
                <div className="flex items-center">
                  <Login />
                  <SignUp />
                </div>
              </nav>
            )}
         
        </div>
      </div>
    </div>
  );
}

export default RHeader;
