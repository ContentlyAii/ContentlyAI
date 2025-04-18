// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <div className="font-bold text-xl">Content AI</div>
      <div className="space-x-4">
        <Link to="/">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/generate">Generate</Link>
        <Link to="/profile" className="text-white px-4 py-2">Profile</Link>
        <Link to="/calendar" className="text-white px-4 py-2">Calendar</Link>
        <Link to="/history" className="hover:text-blue-500">History</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
        </div>
    </nav>
  );
}

export default Navbar;
