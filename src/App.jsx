import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import AdminForm from './components/Admin/AdminForm';
import UserForm from './components/User/UserForm';
import CourierForm from './components/Courier/CourierForm';
import AdminDashboard from './components/Admin/AdminDashboard';
import './index.css';
import { useNavigate } from 'react-router-dom';



const queryClient = new QueryClient();

const App = () => {
  const [selectedRole, setSelectedRole] = useState("");

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="p-6 bg-emerald-200 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
                User Registration
              </h1>
              <label htmlFor="roleSelect" className="block mb-2 text-gray-600">
                Select Role:
              </label>
              <select
                id="roleSelect"
                value={selectedRole}
                onChange={handleRoleChange}
                className="border border-gray-300 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-500 w-full"
              >
                <option value="">--Select Role--</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="courier">Courier</option>
              </select>
              {selectedRole === "admin" && <AdminForm />}
              {selectedRole === "user" && <UserForm />}
              {selectedRole === "courier" && <CourierForm />}
            </div>
          </div>

          <Routes>
            <Route path="/" element={<h2>Home Page</h2>} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
