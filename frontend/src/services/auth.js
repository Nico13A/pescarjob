import { apiRequest } from "../utils/api";

export const register = userData => apiRequest("post", "/register", userData);

export const login = credenciales => apiRequest("post", "/login", credenciales);

export const logout = () => apiRequest("post", "/logout");

export const getPerfil = () => apiRequest("get", "/perfil");