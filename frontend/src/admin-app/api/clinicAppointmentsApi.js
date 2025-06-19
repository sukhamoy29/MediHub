import apiClient from "./apiClient";

const API_BASE_URL = "/api/clinic_appointments";

export const getClinicAppointments = async (clinicName) => {
  try {
    const encodedClinicName = encodeURIComponent(clinicName);
    const response = await apiClient.get(`${API_BASE_URL}/${encodedClinicName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching clinic appointments:", error);
    throw error;
  }
};

export const createClinicAppointment = async (appointmentData) => {
  try {
    const response = await apiClient.post(API_BASE_URL, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error creating clinic appointment:", error);
    throw error;
  }
};

export const getUserBookedAppointments = async (clinicName) => {
  try {
    const encodedClinicName = encodeURIComponent(clinicName);
    const response = await apiClient.get(`/api/appointments/clinic/${encodedClinicName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user booked appointments:", error);
    throw error;
  }
};

// New function to update appointment status
export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await apiClient.patch(`${API_BASE_URL}/status/${appointmentId}`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw error;
  }
};
