import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-5">
        Welcome to Expensify
      </h1>
      <div>
        <a
          href="/plaid"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-200"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HomePage;
