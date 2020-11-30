import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://node-express-temp.herokuapp.com/api'
    : 'http://localhost:5000/api';

const authToken = localStorage.getItem('auth-token');

export default axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  headers: {
    'x-auth-token': authToken,
  },
});
