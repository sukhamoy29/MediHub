import { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const groupAppointmentsByDate = (appointments = []) => {
  if (!Array.isArray(appointments)) return {};
  return appointments.reduce((acc, app) => {
    const dateKey = new Date(app.date).toISOString().split("T")[0];
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(app);
    return acc;
  }, {});
};

const AppointmentCalendar = ({ appointments = [] }) => {
  useEffect(() => {
    console.log("Calendar received appointments:", appointments);
  }, [appointments]);

  const groupedAppointments = groupAppointmentsByDate(appointments);
  const sortedDates = Object.keys(groupedAppointments).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  if (!appointments.length) {
    return (
      <motion.div
        className="p-4 bg-white rounded-lg shadow text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold">Appointment Calendar</h1>
        <p className="text-gray-500">No appointments scheduled</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="p-4 bg-white rounded-lg shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">Appointment Calendar</h1>
      <p className="text-gray-500">View appointments by date</p>

      {sortedDates.map((date) => (
        <motion.div
          key={date}
          className="mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-lg font-semibold flex items-center">
            📅 {new Date(date).toDateString()}
            <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-md">
              {groupedAppointments[date].length} Appointments
            </span>
          </h2>
          <ul className="mt-2 space-y-2">
            {groupedAppointments[date].map((app) => (
              <motion.li
                key={app.id}
                className="p-3 bg-gray-50 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full sm:w-auto">
                  <p className="text-gray-800 font-medium">
                    {app.patient} - {app.time}
                    <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-500 rounded-lg">
                      {app.type}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    {app.doctor} - {app.room}
                  </p>
                </div>
                <span
                  className={`mt-2 sm:mt-0 px-2 py-1 text-xs rounded-md self-start sm:self-center ${
                    app.status === "Confirmed"
                      ? "bg-green-200 text-green-900"
                      : app.status === "Pending"
                      ? "bg-yellow-200 text-yellow-900"
                      : app.status === "Completed"
                      ? "bg-blue-200 text-blue-900"
                      : "bg-red-200 text-red-900"
                  }`}
                >
                  {app.status}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

AppointmentCalendar.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      patient: PropTypes.string.isRequired,
      doctor: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      room: PropTypes.string,
    })
  ),
};

AppointmentCalendar.defaultProps = {
  appointments: [],
};

export default AppointmentCalendar;
