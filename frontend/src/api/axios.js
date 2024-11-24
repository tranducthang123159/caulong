// src/api/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api', // Đảm bảo rằng URL này trỏ đến backend đúng
});

export default instance;
