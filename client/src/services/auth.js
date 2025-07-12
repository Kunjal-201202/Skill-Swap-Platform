import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const registerUser = async (data) => {
  const res = await API.post('/auth/register', data);
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post('/auth/login', data);
  localStorage.setItem('token', res.data.token);
  return res.data;
};
