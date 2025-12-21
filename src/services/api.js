import axios from 'axios';

export default axios.create({
  baseURL: import.meta.env.PROD ? 'https://qr-code-backend-and-bot-3.onrender.com' : '',
  withCredentials: true
});
