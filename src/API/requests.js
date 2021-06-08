import axios from 'axios';
export const project = {
  getAll: () => axios.get('http://localhost:5000/api/v1/projects/').then((res) => res.data),
  getOne: (id) => axios.get(`http://localhost:5000/api/v1/projects/${id}`).then((res) => res.data),
  delete: (id) => axios.delete(`http://localhost:5000/api/v1/projects/${id}`).then((res) => res.data),
  put: ({ id, data }) => axios.put(`http://localhost:5000/api/v1/projects/${id}`, data).then((res) => res.data),
  post: ({ data }) => axios.post('http://localhost:5000/api/v1/projects/', data).then((res) => res.data),
};
