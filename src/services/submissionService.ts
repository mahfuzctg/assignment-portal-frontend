
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

  return {
    Authorization: `Bearer ${token}`,
  };
}

// Submit a student assignment
const submitAssignment = async (payload: {
  assignmentId: string;
  submissionText: string;
}) => {
  const headers = await getAuthHeaders();
  const res = await api.post("/submission", payload, { headers });
  return res.data.data;
};

export default {
  submitAssignment,
};
