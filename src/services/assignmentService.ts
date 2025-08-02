// src/services/assignmentService.ts
import axios from "axios";
import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function getAuthHeaders() {
  const session = await getSession();
  // Adjust this based on how you store token in session
  // Common keys: session.accessToken or session.user.token etc.
  const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;

  if (!token) throw new Error("No auth token found");

  return {
    Authorization: `Bearer ${token}`,
  };
}

const getAssignments = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get("/assignments", { headers, withCredentials: true });
  return res.data.data;
};

const createAssignment = async (assignment: { title: string; description: string; deadline: string }) => {
  const headers = await getAuthHeaders();
  const res = await api.post("/assignments", assignment, { headers, withCredentials: true });
  return res.data.data;
};

export default {
  getAssignments,
  createAssignment,
};
