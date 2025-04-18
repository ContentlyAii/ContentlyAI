// src/ContentHistory.js
import React from 'react';

const mockHistory = [
  {
    id: 1,
    title: 'Blog: AI in Marketing',
    date: '2025-04-15',
    content: 'AI is revolutionizing marketing by...'
  },
  {
    id: 2,
    title: 'Product Description: Smart Watch',
    date: '2025-04-14',
    content: 'This smartwatch features a sleek design...'
  }
];

const ContentHistory = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Your Content History</h1>
      {mockHistory.map(item => (
        <div key={item.id} className="mb-4 p-4 border border-gray-200 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-sm text-gray-500 mb-2">Generated on: {item.date}</p>
          <p>{item.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ContentHistory;
