
import { useMutation } from 'react-query';
import axios from 'axios';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = import.meta.env.VITE_CRUD_API_KEY;

export const useCreateAdmin = () => {
  return useMutation((data) => axios.post(`${API_URL}/admins`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  }));
};

export const useCreateUser = () => {
  return useMutation((data) => axios.post(`${API_URL}/users`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  }));
};

export const useCreateCourier = () => {
  return useMutation((data) => axios.post(`${API_URL}/couriers`, data, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
  }));
};
