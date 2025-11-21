import { apiRequest } from "../utils/api";

export const obtenerSkills = () => apiRequest('get', '/skills')