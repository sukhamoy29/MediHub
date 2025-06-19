import apiClient from "./apiClient";

const API_BASE_URL = "/api/doctors";

export const getDoctors = async () => {
  try {
    const response = await apiClient.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};
