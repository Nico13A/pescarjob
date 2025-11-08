import axios from "axios";
import { handleApiError } from "./handleApiError.js";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiRequest = async (method, endpoint, data = {}, options = {}) => {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data: ["post", "put", "patch"].includes(method.toLowerCase()) ? data : undefined,
      params: ["get", "delete"].includes(method.toLowerCase()) ? data : undefined,
      ...options,
    });
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};



