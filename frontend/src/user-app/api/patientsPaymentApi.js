import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + '/user_payments';

export const createPatientsPayment = async (paymentData, token) => {
    try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await axios.post(API_BASE_URL, paymentData, config);
        return response.data;
    } catch (error) {
        console.error("Error creating patient payment:", error.response?.data || error.message);
        throw error;
    }
};

export const getPatientsPayments = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching patient payments:", error.response?.data || error.message);
        return [];
    }
};

export const updatePaymentStatus = async (paymentId, newStatus) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${paymentId}`, null, {
            params: { status: newStatus }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating payment status:", error.response?.data || error.message);
        throw error;
    }
};
