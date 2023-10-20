import axios from "axios";
import { getLocalToken } from "../util/localstorage";

const baseAxios = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

baseAxios.interceptors.request.use(async (config: any) => {
  let headerAuth: any = "";
  if (getLocalToken() !== null) {
    const token = getLocalToken();
    headerAuth = token;
  }
  config.headers.Authorization = `Bearer ${headerAuth}`;

  return config;
});

export default baseAxios;