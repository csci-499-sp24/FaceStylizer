import React, { useState } from 'react';

const scrollToBottom = () => {
  window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'auto'
  });
};

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F9CB40] to-[#EDC7CF] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
      </div>
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
      
      <div className="relative rounded-full px-3 py-1 text-sm mb-5 leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
          Interested in how JoJoGAN architecture works?{' '}
          <a href="#" className="font-semibold text-gray-600">
            <span className="absolute inset-0" aria-hidden="true" />
            Read more <span aria-hidden="true">&rarr;</span>
          </a>
        </div>


      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold text-yellow-500">Welcome to FACESTYLIZER</h1>
        <p className="text-lg text-gray-800">Your one-stop destination for stylized face designs</p>
      </div>

      <button
        className="inline-flex items-center shadow-md px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-500 text-gray-50 border border-transparent rounded-md font-semibold text-sm uppercase tracking-widest hover:bg-yellow-600 active:bg-yellow-700 focus:outline-none focus:border-yellow-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
        onClick={scrollToBottom}
        >
          Get Started
      </button>

      <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#EDC7CF] to-[#F9CB40] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

    </div>
  );
};

export default Hero;
