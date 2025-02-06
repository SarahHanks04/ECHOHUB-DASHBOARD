// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { signUp, signIn, getUser } from "./api";

// // Hook for login
// export const useLogin = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (credentials) => {
//       const response = await signIn(credentials);
//       localStorage.setItem("token", response.data.token);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["user"]);
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
// };

// // Hook for registration
// export const useRegister = () => {
//   return useMutation({
//     mutationFn: async (userData) => {
//       const response = await signUp(userData);
//       return response.data;
//     },
//     onError: (error) => {
//       console.error("Registration failed:", error);
//     },
//   });
// };

// // Hook for checking authentication status
// export const useAuth = () => {
//   return useQuery({
//     queryKey: ["user"],
//     queryFn: getUser,
//     enabled: !!localStorage.getItem("token"), // Only fetch if token exists
//     retry: false,
//   });
// };

// // Logout function
// export const logout = () => {
//   localStorage.removeItem("token");
//   window.location.reload(); // Redirect to login
// };

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

// API Utility File for Reusability
export const api = {
  fetch: async (endpoint) => {
    const response = await axios.get(`${BASE_URL}/${endpoint}`);
    return response.data;
  },
  post: async (endpoint, data) => {
    return axios.post(`${BASE_URL}/${endpoint}`, data);
  },
  put: async (endpoint, data) => {
    return axios.put(`${BASE_URL}/${endpoint}`, data);
  },
  patch: async (endpoint, data) => {
    return axios.patch(`${BASE_URL}/${endpoint}`, data);
  },
};

// Admin Authentication Hook
export const useAdminAuth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await api.post("logIn", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("adminToken", JSON.stringify(data.token));
      queryClient.invalidateQueries(["admin"]);
      window.location.href = "/dashboard"; // Redirect admin to dashboard
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Hook for registration
export const useRegister = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await signUp(userData);
      return response.data;
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// Hook for login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await signIn(credentials);
      localStorage.setItem("token", response.data.token);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

// Admin Registration Hook
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("signUp", userData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("adminToken", JSON.stringify(data.token));
      window.location.href = "/dashboard"; // Redirect admin to dashboard
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

// Hook for checking authentication status
export const useAuth = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: () => api.fetch("admin"),
    enabled: !!localStorage.getItem("adminToken"), // Only fetch if token exists
    retry: false,
  });
};

// Logout function
export const logout = () => {
  localStorage.removeItem("adminToken");
  window.location.href = "/"; // Redirect to login
};
