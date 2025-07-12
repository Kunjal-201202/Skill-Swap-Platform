import axios from 'axios';

const API_URL = 'http://localhost:5000/api/profile';

export const getProfile = (userId) => axios.get(`${API_URL}/${userId}`);

export const updateProfile = (userId, formData) =>
  axios.put(`${API_URL}/${userId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
