import axios from 'axios';
export const project = {
  getAll: () => axios.get(`${import.meta.env.VITE_API_URL}/projects/`).then((res) => res.data),
  getOne: (id) => axios.get(`${import.meta.env.VITE_API_URL}/projects/${id}`).then((res) => res.data),
  delete: (id) => axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`).then((res) => res.data),
  put: ({ id, data }) => axios.put(`${import.meta.env.VITE_API_URL}/projects/${id}`, data).then((res) => res.data),
  post: ({ data }) => axios.post(`${import.meta.env.VITE_API_URL}/projects/`, data).then((res) => res.data),
};
