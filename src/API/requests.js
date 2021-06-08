import axios from "axios";

export const companies = {
  getAll: () =>
    axios.get("http://localhost:5000/api/v1/companies").then((res) => res.data),
  getOne: (data) =>
    axios
      .post("http://localhost:5000/api/v1/companies", data)
      .then((res) => res.data),
  put: (data) =>
    axios
      .put("http://localhost:5000/api/v1/companies", data)
      .then((res) => res.data),
};
