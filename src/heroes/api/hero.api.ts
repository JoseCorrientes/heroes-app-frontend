import axios from "axios";

const BaseURL = import.meta.env.VITE_API_URL;

export const heroApi = axios.create({
  baseURL: `${BaseURL}/api/heroes`,
});
