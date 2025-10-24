import axios from "axios";
import { handleApiError } from "./handleApiError.js";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const apiRequest = async (method, endpoint, data = {}, options = {}) => {
  try {
    let response;
    if (["get", "delete"].includes(method.toLowerCase())) {
      response = await api[method](endpoint, { params: data, ...options });
    } else {
      response = await api[method](endpoint, data, options);
    }
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};



