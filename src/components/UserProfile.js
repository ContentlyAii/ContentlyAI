import React, { useState } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Content Creator at Content AI',
    profilePic: 'https://via.placeholder.com/150',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-2xl mt-6">
      <div className="flex items-center space-x-4">
        <img src={user.profilePic} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        <div>
          <input
            type="text"
            name="name"
            className="text-xl font-semibold border-b focus:outline-none"
            value={user.name}
            onChange={handleChange}
          />
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mt-4">
        <textarea
          name="bio"
          className="w-full border rounded-lg p-2"
          rows={4}
          value={user.bio}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default UserProfile;
