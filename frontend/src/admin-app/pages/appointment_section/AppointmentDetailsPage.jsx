import { useParams, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AppointmentDetailsPage = ({ appointments }) => {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  if (!appointments || appointments.length === 0) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          Loading appointment details...
        </h2>
      </div>
    );
  }

  // Find the appointment by id
  const appointment = appointments.find(
    (app) => app.id.toString() === appointmentId.toString()
  );

  if (!appointment) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Appointment Not Found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>

      <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <h3 className="text-lg font-semibold">
            {appointment.date}, {appointment.time}
          </h3>
        </div>
        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${
            appointment.status === "Confirmed"
              ? "bg-green-100 text-green-800"
              : appointment.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : appointment.status === "Completed"
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-800"
          }`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold">Patient</h3>
          <p>{appointment.patient_name}</p>
          <p className="text-sm text-gray-500">
            {appointment.patientId || "N/A"}
          </p>
          <p className="text-sm">📞 {appointment.phone || "N/A"}</p>
          <p className="text-sm">✉ {appointment.email || "N/A"}</p>
        </div>
        <div>
          <h3 className="font-semibold">Doctor</h3>
          <p>{appointment.doctor_name}</p>
          <p className="text-sm text-gray-500">
            {appointment.specialty || "N/A"}
          </p>
          <p className="text-sm">📋 Type: {appointment.type || "N/A"}</p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold">Notes</h3>
        <div className="bg-gray-100 p-2 rounded-md text-gray-700 text-sm">
          {appointment.notes || "No additional notes"}
        </div>
      </div>

      <div className="flex justify-start gap-2">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Back to Appointments
        </button>
      </div>
    </div>
  );
};
AppointmentDetailsPage.propTypes = {
  appointments: PropTypes.array.isRequired,
};

export default AppointmentDetailsPage;
