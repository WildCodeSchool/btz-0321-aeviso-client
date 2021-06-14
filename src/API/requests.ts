import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const user = {
  getAll: () => axios.get(`${API_URL}/users`).then((res) => res.data),
  getOne: (id: string) => axios.get(`${API_URL}/users/${id}`).then((res) => res.data),

  delete: ({ id }: { id: string }) => axios.delete(`${API_URL}/users/${id}`).then((res) => res.data),
  create: ({ user }: { user: User }) => {
    return axios.post(`${API_URL}/users`, user).then((res) => res.data);
  },
  update: ({ user, id }: { user: User; id?: string }) => {
    if (!id) throw new Error("Id can't be undefined");
    return axios.put(`${API_URL}/users/${id}`, user).then((res) => res.data);
  },
};

export const project = {
  getAll: () => axios.get(`${API_URL}/projects/`).then((res) => res.data),
  getOne: (id: string) => axios.get(`${API_URL}/projects/${id}`).then((res) => res.data),
  delete: (id: string) => axios.delete(`${API_URL}/projects/${id}`).then((res) => res.data),
  // TODO: create a real interface here
  update: ({ id, data }: { id: string; data: any }) =>
    axios.put(`${API_URL}/projects/${id}`, data).then((res) => res.data),
  // TODO: create a real interface here
  create: ({ data }: { data: any }) => axios.post(`${API_URL}/projects/`, data).then((res) => res.data),
};
