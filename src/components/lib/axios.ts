// lib/axios.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://assignment-portal-backend-rho.vercel.app/api/v1",
  withCredentials: true,
});

instance.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user?.accessToken) {
    config.headers.Authorization = `Bearer ${session.user.accessToken}`;
  }

  return config;
});

export default instance;
