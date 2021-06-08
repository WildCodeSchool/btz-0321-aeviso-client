import axios from "axios";

export const companies = {
  getAll: () =>
    axios.get("http://localhost:5000/api/v1/companies").then((res) => res.data),
  getOne: (id) =>
    axios
      .get(`http://localhost:5000/api/v1/companies/${id}`)
      .then((res) => res.data),
  post: (data) =>
    axios
      .post("http://localhost:5000/api/v1/companies", data)
      .then((res) => res.data),
  put: ({ id, data }) =>
    axios
      .put(`http://localhost:5000/api/v1/companies/${id}`, data)
      .then((res) => res.data),
  delete: (id) =>
    axios
      .delete(`http://localhost:5000/api/v1/companies/${id}`)
      .then((res) => res.data),
};
