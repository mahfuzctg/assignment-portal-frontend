import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const getAssignments = async () => {
  const res = await axios.get(`${API_URL}/assignments`);
  return res.data.data;
};

const createAssignment = async (assignment: { title: string; description: string; deadline: string }) => {
  const res = await axios.post(`${API_URL}/assignments`, assignment, { withCredentials: true });
  return res.data.data;
};

export default {
  getAssignments,
  createAssignment,
};
