import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const user = {
  getAll: (): Promise<User[]> => axios.get(`${API_URL}/users`).then((res) => res.data),

  getOne: (id: string): Promise<User> => axios.get(`${API_URL}/users/${id}`).then((res) => res.data),

  delete: ({ id }: { id: string }): Promise<null> => axios.delete(`${API_URL}/users/${id}`).then((res) => res.data),

  create: ({ user }: { user: User }): Promise<User> => {
    return axios.post(`${API_URL}/users`, user).then((res) => res.data);
  },

  update: ({ user, id }: { user: User; id?: string }): Promise<User> => {
    if (!id) throw new Error("Id can't be undefined");
    return axios.put(`${API_URL}/users/${id}`, user).then((res) => res.data);
  },
};

export const jobs = {
  getAll: (): Promise<Job[]> => axios.get(`${API_URL}/jobs`).then((res) => res.data),

  getOne: (id: string): Promise<Job> => axios.get(`${API_URL}/jobs/${id}`).then((res) => res.data),

  delete: ({ id }: { id: string }): Promise<null> => axios.delete(`${API_URL}/jobs/${id}`).then((res) => res.data),

  create: (job: Job): Promise<Job> => axios.post(`${API_URL}/jobs`, job).then((res) => res.data),

  update: ({ job, id }: { job: Job; id?: string }): Promise<null> =>
    axios.put(`${API_URL}/jobs/${id}`, job).then((res) => res.data),
};

export const project = {
  getAll: (): Promise<Project[]> => axios.get(`${API_URL}/projects/`).then((res) => res.data),

  getOne: (id: string): Promise<Project> => axios.get(`${API_URL}/projects/${id}`).then((res) => res.data),

  delete: (id: string): Promise<null> => axios.delete(`${API_URL}/projects/${id}`).then((res) => res.data),

  update: ({ id, data }: { id: string; data: Project }): Promise<null> =>
    axios.put(`${API_URL}/projects/${id}`, data).then((res) => res.data),

  // TODO: create a real interface here
  create: ({ data }: { data: Project }): Promise<Project> =>
    axios.post(`${API_URL}/projects/`, data).then((res) => res.data),

  getUsers: (projectId: string): Promise<IResultUser[]> =>
    axios.get(`${API_URL}/projects/${projectId}/users`).then((res) => res.data),

  getRecords: (projectId: string, userId: string, start: string, end: string): Promise<IRecord[]> =>
    axios
      .get(`${API_URL}/projects/${projectId}/users/${userId}/records?start=${start}&end=${end}`)
      .then((res) => res.data),
};

export const companies = {
  getAll: (limit?: number): Promise<Company[]> =>
    axios.get(`${API_URL}/companies/${limit ? `?limit=${limit}` : ''}`).then((res) => res.data),

  getAllProjects: (id: string): Promise<Project[]> =>
    axios.get(`${API_URL}/companies/${id}/projects`).then((res) => res.data),

  getOne: (id: string): Promise<Company> => axios.get(`${API_URL}/companies/${id}`).then((res) => res.data),

  post: (data: Company): Promise<Company> => axios.post(`${API_URL}/companies`, data).then((res) => res.data),

  put: ({ id, data }: { id: string; data: Company }): Promise<Company> =>
    axios.put(`${API_URL}/companies/${id}`, data).then((res) => res.data),

  delete: (id: string): Promise<null> => axios.delete(`${API_URL}/companies/${id}`).then((res) => res.data),
};

export const records = {
  getAll: (limit?: number): Promise<IRecord[]> =>
    axios.get(`${API_URL}/records${limit ? `?limit=${limit}` : ''}`).then((res) => res.data),

  getOne: (id: string): Promise<IRecord> => axios.get(`${API_URL}/records/${id}`).then((res) => res.data),

  post: (data: IRecord): Promise<IRecord> => axios.post(`${API_URL}/records`, data).then((res) => res.data),

  put: ({ id, data }: { id: string; data: IRecord }): Promise<null> =>
    axios.put(`${API_URL}/records/${id}`, data).then((res) => res.data),

  delete: (id: string): Promise<null> => axios.delete(`${API_URL}/records/${id}`).then((res) => res.data),
};

export const auth = {
  login: (user: { email: string }): Promise<{ message: string }> =>
    axios.post(`${API_URL}/auth/login`, user).then((res) => res.data),
};
