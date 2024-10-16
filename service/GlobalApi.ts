import axios from "axios";
import { PutResumeInfo } from "..";

const API_KEY = process.env.NEXT_PUBLIC_STRAPI_API_KEY;
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const createNewResume = async (data: any) => {
  try {
    const result = await axiosClient.post("/user-resumes", { data });
    return result.data;
  } catch (error: any) {
    console.log("Error Response:", error.response?.data || error.message);
  }
};

export const GetUserResume = async (userEmail: string) => {
  try {
    const resumes = await axiosClient.get(
      "/user-resumes?filters[userEmail][$eq]=" + userEmail
    );
    return resumes.data;
  } catch (error) {
    console.log("error geting user resumes", error);
  }
};

export const UpdateResumeDetails = async ({ id, data }: PutResumeInfo) => {
  try {
    const result = await axiosClient.put(`/user-resumes/${id}`, { data });
    return result.data;
  } catch (error: any) {
    console.log("Error Response:", error.response?.data || error.message);
  }
};

export const GetSpecificDoc = async (id: string) => {
  try {
    const result = await axiosClient.get(`/user-resumes/${id}?populate=*`);
    return result.data;
  } catch (error) {
    console.log("error fetching document", error);
  }
};

export const DeleteDoc = async (id: string) => {
  try {
    const result = await axiosClient.delete(`/user-resumes/${id}`);
    return;
    result.data;
  } catch (error) {
    console.log("Could not delete document", error);
  }
};
