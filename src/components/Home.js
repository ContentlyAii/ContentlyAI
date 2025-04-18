// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Content AI</h1>
      <p className="text-lg max-w-2xl mb-6 text-gray-700">
        Your personal AI-powered content creation assistant. Effortlessly generate blog posts, marketing content, emails, and more using artificial intelligence.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
          Get Started
        </Link>
        <Link to="/contact" className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default Home;
