import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://qr-code-backend-and-bot-3.onrender.com' 
    : '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
