import React, { useState, useEffect } from 'react';
import axios from 'axios';

// API URL და KEY
const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = import.meta.env.VITE_API_KEY;

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [couriers, setCouriers] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // მონაცემების მიღება
  useEffect(() => {
    fetchUsers();
    fetchCouriers();
  }, []);

  // Users fetching from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setUsers(response.data);
      setTotalPages(Math.ceil(response.data.length / 10)); // Pagination
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Couriers fetching from API
  const fetchCouriers = async () => {
    try {
      const response = await axios.get(`${API_URL}/couriers`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setCouriers(response.data);
    } catch (error) {
      console.error('Error fetching couriers:', error);
    }
  };

  // Filter users by status
  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Filter users based on status
  const filteredUsers = users.filter(user => {
    if (!statusFilter) return true;
    return user.status === statusFilter;
  });

  // Paginate users
  const paginate = (page) => {
    setCurrentPage(page);
  };

  // Function to create a user
  const createUser = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      fetchUsers(); // Re-fetch users after creating one
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  // Function to create an admin
  const createAdmin = async (adminData) => {
    try {
      const response = await axios.post(`${API_URL}/admins`, adminData, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
    }
  };

  // Function to create a courier
  const createCourier = async (courierData) => {
    try {
      const response = await axios.post(`${API_URL}/couriers`, courierData, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating courier:', error);
    }
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        <label htmlFor="statusFilter">Filter by Status: </label>
        <select id="statusFilter" onChange={handleFilterChange} value={statusFilter}>
          <option value="">All</option>
          <option value="user">User</option>
          <option value="courier">Courier</option>
        </select>
      </div>

      <h3>Users</h3>
      <ul>
        {filteredUsers.slice((currentPage - 1) * 10, currentPage * 10).map((user, index) => (
          <li key={index}>
            {user.name} - {user.phoneNumber}
          </li>
        ))}
      </ul>

      <h3>Couriers</h3>
      <ul>
        {couriers.map((courier, index) => (
          <li key={index}>
            {courier.name} - {courier.phoneNumber}
          </li>
        ))}
      </ul>

      {users.length > 10 && (
        <div>
          <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</button>
          <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
