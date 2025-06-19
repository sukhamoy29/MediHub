import { useState, useEffect, useContext, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import AppointmentNavbar from "./appointment_section/AppointmentNavbar";
import AppointmentSection from "./appointment_section/AppointmentSection";
import AppointmentDetailsPage from "./appointment_section/AppointmentDetailsPage";
import appointmentsData from "./appointment_section/AppointmentsData";
import { getClinicAppointments } from "../api/clinicAppointmentsApi";
import { AuthContext } from "../../user-app/context/AuthContext";

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [view, setView] = useState("List");
  const [searchQuery, setSearchQuery] = useState("");
  const [clinicName, setClinicName] = useState(user?.clinicName || "");
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem("appointments");
    if (savedAppointments) {
      try {
        const parsed = JSON.parse(savedAppointments);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return appointmentsData;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAppointments = useCallback(async () => {
    if (!clinicName) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getClinicAppointments(clinicName);
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  }, [clinicName]);

  useEffect(() => {
    setClinicName(user?.clinicName || "");
  }, [user?.clinicName]);

  useEffect(() => {
    if (clinicName) {
      fetchAppointments();
    }
  }, [clinicName, fetchAppointments]);

  const handleAppointmentUpdate = (updatedAppointments) => {
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  };

  const handleSearch = (query) => {
    if (view === "List") {
      setSearchQuery(query);
    }
  };

  console.log("Fetched clinic appointments:", appointments);

  return (
    <div className="space-y-4 p-4 sm:p-6 md:p-8 lg:p-10">
      <Routes>
        <Route
          index
          element={
            <>
              <AppointmentNavbar
                view={view}
                setView={setView}
                onSearch={handleSearch}
              />

              {loading && <p>Loading appointments...</p>}
              {error && <p className="text-red-600">{error}</p>}

              {view === "List" && !loading && !error && (
                <div className="overflow-x-auto">
                  <AppointmentSection
                    searchQuery={searchQuery}
                    clinicName={clinicName}
                    appointments={appointments}
                    onAppointmentUpdate={handleAppointmentUpdate}
                  />
                </div>
              )}
              {view === "Calendar" && !loading && !error && (
                <div className="p-4 text-center text-lg font-semibold text-gray-700">
                  Calendar view is currently unavailable. Please switch to the
                  List view to manage appointments.
                </div>
              )}
            </>
          }
        />
        <Route
          path=":appointmentId"
          element={<AppointmentDetailsPage appointments={appointments} />}
        />
      </Routes>
    </div>
  );
};

export default Appointments;
