import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CancelAppointmentModal from "./CancelAppointmentModal";

const AppointmentSection = ({
  searchQuery,
  appointments,
  onAppointmentUpdate,
  onUpdateAppointmentStatus, // new prop for backend update
}) => {
  const [filter, setFilter] = useState("All");
  const [actionMenu, setActionMenu] = useState(null);
  const [dropdownDirection, setDropdownDirection] = useState("down");
  const [cancelingAppointment, setCancelingAppointment] = useState(null);
  const buttonRefs = useRef({}); // Per-row refs
  const navigate = useNavigate();

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const handleActionClick = (id) => {
    const button = buttonRefs.current[id];
    if (button) {
      const rect = button.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setDropdownDirection(
        spaceBelow < 150 && spaceAbove > 150 ? "up" : "down"
      );
    }

    setActionMenu(actionMenu === id ? null : id);
  };

  const confirmCancel = async (id) => {
    try {
      await onUpdateAppointmentStatus(id, "Cancelled");
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
    setCancelingAppointment(null);
  };

  const handleSaveEdit = async (updatedAppointment) => {
    try {
      await onUpdateAppointmentStatus(
        updatedAppointment.id,
        updatedAppointment.status
      );
      onAppointmentUpdate(
        appointments.map((app) =>
          app.id === updatedAppointment.id ? updatedAppointment : app
        )
      );
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  const handleClickOutside = (event) => {
    if (
      !Object.values(buttonRefs.current).some(
        (ref) => ref && ref.contains && ref.contains(event.target)
      )
    ) {
      setActionMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.patient_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      app.doctor_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      app.date?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      false;
    if (filter === "All") {
      return matchesSearch;
    }
    return matchesSearch && app.status === filter;
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Appointments</h1>
      <p className="text-gray-500">Manage and schedule patient appointments</p>
      <div className="bg-white p-6 mt-4 shadow-lg rounded-xl">
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <h2 className="text-lg font-semibold">Appointment Schedule</h2>
          <p className="text-sm text-gray-500">
            {filteredAppointments.length} appointments found
          </p>
          <div className="flex flex-wrap gap-2">
            {["All", "Confirmed", "Pending", "Cancelled", "Completed"].map(
              (status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-md text-sm font-medium border transition-all duration-300 transform hover:scale-105 ${
                    filter === status
                      ? "bg-gray-800 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                  onClick={() => handleFilterChange(status)}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-500">No appointments found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="p-2">Patient</th>
                  <th className="p-2">Doctor</th>
                  <th className="p-2">Date & Time</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Payment Status</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b hover:bg-gray-50"
                    id={`appointment-${app.id}`}
                  >
                    <td className="p-2">{app.patient_name}</td>
                    <td className="p-2">{app.doctor_name}</td>
                    <td className="p-2">
                      {app.date} <br />
                      <span className="text-sm text-gray-500">{app.time}</span>
                    </td>
                    <td className="p-2">{app.type || "N/A"}</td>
                    <td className="p-2">{app.paymentStatus || "N/A"}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-md ${
                          app.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="p-2 relative">
                      <button
                        ref={(el) => (buttonRefs.current[app.id] = el)}
                        onClick={() => handleActionClick(app.id)}
                        className="text-gray-900 font-bold"
                      >
                        ...
                      </button>
                      <AnimatePresence>
                        {actionMenu === app.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            className={`absolute right-0 w-48 bg-white border shadow-lg rounded-md z-10 ${
                              dropdownDirection === "up"
                                ? "bottom-full mb-2"
                                : "top-full mt-2"
                            }`}
                          >
                            <ul className="py-2">
                              <li
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                  navigate(`/admin/appointments/${app.id}`);
                                  setActionMenu(null);
                                }}
                              >
                                View Details
                              </li>
                              {app.status !== "Cancelled" && (
                                <li
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 border-t-2 border-gray-200"
                                  onClick={() => setCancelingAppointment(app)}
                                >
                                  Cancel
                                </li>
                              )}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {cancelingAppointment && (
        <CancelAppointmentModal
          appointment={cancelingAppointment}
          onClose={() => setCancelingAppointment(null)}
          onCancel={confirmCancel}
        />
      )}
    </div>
  );
};

AppointmentSection.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  appointments: PropTypes.array.isRequired,
  onAppointmentUpdate: PropTypes.func.isRequired,
  onUpdateAppointmentStatus: PropTypes.func.isRequired,
};

export default AppointmentSection;
