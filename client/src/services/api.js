import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('bl_token', token);
    return;
  }

  delete api.defaults.headers.common.Authorization;
  localStorage.removeItem('bl_token');
};

const savedToken = localStorage.getItem('bl_token');
if (savedToken) {
  api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
}

export default api;
