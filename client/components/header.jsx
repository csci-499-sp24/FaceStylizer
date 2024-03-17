import React, { useState } from 'react';
import Login from "/components/login"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

function RHeader() {
  const [open, setOpen] = useState(true);

  return (
    <div className="antialiased bg-white dark-mode:bg-gray-800">
      <div className="w-full text-gray-700 dark-mode:text-gray-200">
        <div className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
          <div className="flex flex-row items-center justify-between p-4">
            <a href="#" className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline">FACESTYLIZER</a>
          </div>
          <nav className={`flex-col flex-grow ${open ? '' : 'hidden'} pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}>
            {/* <a className="px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-black dark-mode:hover:text-black dark-mode:text-black md:mt-0 md:ml-4 hover:text-black focus:text-black hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline"> */}
              <Login/>
            {/* Add more navigation links as needed */}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default RHeader;
