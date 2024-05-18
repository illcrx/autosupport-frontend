import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000',  // Adjust this to match your backend URL if necessary
});

export default instance;
