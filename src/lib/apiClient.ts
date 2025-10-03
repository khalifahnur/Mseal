import axios from "axios";

const apiClient = axios.create({
  baseURL:process.env.NEXT_PUBLIC_MSEAL_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_auth="))
    ?.split("=")[1];

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;
