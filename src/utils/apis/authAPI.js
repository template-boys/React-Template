import api from '../api';

/* REGISTER USER*/
export const registerUser = async (user) => {
  return await api.post('/users/register', user);
};

/* LOGIN USER*/
export const loginUser = async (credentials) => {
  return await api.post('/users/login', credentials);
};
