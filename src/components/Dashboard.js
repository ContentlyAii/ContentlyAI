import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="mb-6 text-gray-600">Manage your content, view your projects, and start creating.</p>

      <div className="space-x-4">
        <button
          onClick={() => navigate('/generate')}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Generate Content
        </button>
        <button
          onClick={() => navigate('/projects')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg"
        >
          My Projects
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
