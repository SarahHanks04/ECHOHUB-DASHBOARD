// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

// const BASE_URL = "http://localhost:5000";

// // API Utility File for Reusability
// export const api = {
//   fetch: async (endpoint) => {
//     const response = await axios.get(`${BASE_URL}/${endpoint}`);
//     return response.data;
//   },
//   post: async (endpoint, data) => {
//     return axios.post(`${BASE_URL}/${endpoint}`, data);
//   },
//   put: async (endpoint, data) => {
//     return axios.put(`${BASE_URL}/${endpoint}`, data);
//   },
//   patch: async (endpoint, data) => {
//     return axios.patch(`${BASE_URL}/${endpoint}`, data);
//   },
// };

// // Authentication Hook
// export const useAdminAuth = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ email, password }) => {
//       const response = await api.post("logIn", { email, password });
//       return response.data;
//     },
//     onSuccess: (data) => {
//       localStorage.setItem("adminToken", JSON.stringify(data));
//       queryClient.invalidateQueries(["admin"]);
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
// };

// export const useFetchFormEvents = () => {
//   return useQuery({
//     queryKey: ["formEvents"],
//     queryFn: () => api.fetch("formEvents"),
//   });
// };

// export const useFetchFormById = (id) => {
//   return useQuery({
//     queryKey: ["form", id],
//     queryFn: () => api.fetch(`formEvents/${id}`),
//     enabled: !!id,
//     retry: 2,
//   });
// };

// export const useMutateFormEvent = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ id, data }) => {
//       return id
//         ? api.put(`formEvents/${id}`, data)
//         : api.post("formEvents", data);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["formEvents"]);
//     },
//     onError: (error) => {
//       console.error("Error saving form:", error);
//     },
//   });
// };

// export const useSubmitResponse = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ formId, formData, formDetails }) => {
//       if (!formData || typeof formData !== "object") {
//         throw new Error("Invalid form data.");
//       }

//       const formattedData = Object.entries(formData).map(([key, value]) => {
//         let field = formDetails.fields.find((f) => f.id === key) || {
//           id: key,
//           label: key.charAt(0).toUpperCase() + key.slice(1),
//           type: "text",
//         };
//         return { id: key, label: field.label, type: field.type, value };
//       });

//       const newResponse = {
//         id: uuidv4().substr(0, 5),
//         formId,
//         formType: formDetails.formType,
//         submissionDate: new Date().toISOString(),
//         status: "unresolved",
//         data: formattedData,
//       };

//       return api.post("responses", newResponse);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["responses"]);
//     },
//     onError: (error) => {
//       console.error("Form submission failed:", error);
//     },
//   });
// };

// export const useFetchResponses = () => {
//   return useQuery(["responses"], () => api.fetch("responses"));
// };

// export const useFetchResponsesById = (id) => {
//   return useQuery({
//     queryKey: ["responses", id],
//     queryFn: () => api.fetch(`responses?id=${id}`),
//     enabled: !!id,
//   });
// };

// export const useUpdateResponseStatus = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ responseId, status }) => {
//       return api.patch(`responses/${responseId}`, { status });
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries(["responses"]);
//     },
//     onError: (error) => {
//       console.error("Error updating response status:", error);
//     },
//   });
// };


import { api } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// Single endpoint for all auth operations
const AUTH_ENDPOINT = "signIn";

// Hook for both login and registration
export const useAuth = (isSignUp = false) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post(AUTH_ENDPOINT, { ...credentials, isSignUp });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", JSON.stringify(data.token));
      queryClient.invalidateQueries(["user"]);
      // Assume dashboard is the post-sign-in/up page
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      console.error(isSignUp ? "Registration failed:" : "Login failed:", error);
    },
  });
};

// Hook for checking authentication status (assuming token-based auth)
export const useCheckAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => api.fetch(AUTH_ENDPOINT, { checkAuth: true }),
    enabled: !!localStorage.getItem("token"), // Only fetch if token exists
    retry: false,
  });
};

// Logout function remains the same
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/"; // Redirect to login/home
};