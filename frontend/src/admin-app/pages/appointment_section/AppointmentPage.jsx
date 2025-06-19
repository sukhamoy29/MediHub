import { useState, useEffect } from "react";
import AppointmentSection from "./AppointmentSection";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAppointments = async () => {
    try {
      // Assuming admin can fetch all appointments without user filter
      const token = localStorage.getItem("access_token");
      const response = await api.get("/appointments/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAppointmentUpdate = (updatedAppointments) => {
    setAppointments(updatedAppointments);
  };

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("access_token");
      const appointmentToUpdate = appointments.find((app) => app.id === id);
      if (!appointmentToUpdate) throw new Error("Appointment not found");

      const updatedAppointment = { ...appointmentToUpdate, status };

      const response = await api.put(
        `/appointments/appointments/${id}`,
        updatedAppointment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state with updated appointment
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? response.data : app))
      );
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      throw error;
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search appointments"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <AppointmentSection
        appointments={appointments}
        searchQuery={searchQuery}
        onAppointmentUpdate={handleAppointmentUpdate}
        onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
      />
    </div>
  );
};

export default AppointmentPage;
