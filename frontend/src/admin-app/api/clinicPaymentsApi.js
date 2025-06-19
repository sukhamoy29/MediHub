import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/user_payments";

export const fetchPayments = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return [];
  }
};

export const fetchPaymentsByClinic = async (clinicName) => {
  try {
    const encodedClinicName = encodeURIComponent(clinicName);
    const response = await axios.get(`${API_BASE_URL}/clinic/${encodedClinicName}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payments by clinic:", error);
    return [];
  }
};

export const deletePayment = async (paymentId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
};

export const updatePaymentStatus = async (paymentId, newStatus) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${paymentId}`, null, {
      params: { status: newStatus },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating payment status:", error);
    throw error;
  }
};
