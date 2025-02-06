import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const api = {
  fetch: async (endpoint, params = {}) => {
    const response = await axios.get(`${BASE_URL}/${endpoint}`, { params });
    return response.data;
  },
  post: async (endpoint, data) => {
    return axios.post(`${BASE_URL}/${endpoint}`, data);
  }
};






// import axios from "axios";

// const BASE_URL = "http://localhost:5000";

// // Create an Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Add authentication token automatically to requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Auth API functions
// export const signIn = (data) => api.post("/logIn", data);
// export const signUp = (data) => api.post("/usersInformation", data);
// export const getUser = () => api.get("/usersInformation");

// // Form API functions
// export const fetchFormEvents = () => api.get("/formEvents");
// export const fetchFormById = (id) => api.get(`/formEvents/${id}`);
// export const updateForm = (id, data) => api.put(`/formEvents/${id}`, data);
// export const submitResponse = (data) => api.post("/responses", data);

// export default api;
