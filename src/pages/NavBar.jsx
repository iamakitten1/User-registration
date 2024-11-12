import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profileImage');
    navigate('/');
  };

  const getDashboardTitle = () => {
    if (role === 'admin') return 'Admin Dashboard';
    if (role === 'user') return 'User Profile';
    return 'Courier Dashboard';
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between">
        <h1>{getDashboardTitle()}</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
