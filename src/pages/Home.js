import React from 'react';

const Home = () => {
  return (
    <div className="text-center py-20 px-6 bg-gradient-to-b from-white to-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Content AI</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Your AI-powered assistant to generate high-quality content in seconds.
        Log in to your dashboard and start creating articles, blog posts, marketing copy, and more.
      </p>
      <div className="mt-10">
        <a
          href="/signup"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-300"
        >
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Home;
