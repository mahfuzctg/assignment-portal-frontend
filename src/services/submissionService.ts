// submissionService.ts
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
  const token = (session as any)?.accessToken || (session as any)?.user?.accessToken;
  if (!token) throw new Error("No auth token found");
  return { Authorization: `Bearer ${token}` };
}

const submitAssignment = async (submission: { assignmentId: string; submissionText: string }) => {
  const headers = await getAuthHeaders();

  const res = await api.post("/submission", submission, {
    headers,
    withCredentials: true,
  });

  return res.data.data;
};

const getMySubmissions = async () => {
  const headers = await getAuthHeaders();

  const res = await api.get("/submission/mine", {
    headers,
    withCredentials: true,
  });

  return res.data.data;
};


const getAllSubmissions = async () => {
  const headers = await getAuthHeaders();
  const res = await api.get("/submission", { headers });
  return res.data.data;
};

const updateSubmission = async (id: string, update: { status?: string; feedback?: string }) => {
  const headers = await getAuthHeaders();
  const res = await api.patch(`/submission/${id}`, update, { headers });
  return res.data.data;
};


export default {
  submitAssignment,
  getMySubmissions,
  getAllSubmissions,
  updateSubmission
};
