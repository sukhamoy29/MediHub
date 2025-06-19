import PropTypes from "prop-types";

const CancelAppointmentModal = ({ appointment, onClose, onCancel }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h2 className="text-xl font-semibold mb-2">Cancel Appointment?</h2>
        <p className="text-gray-600 mb-4">
          This will cancel the appointment for{" "}
          <span className="font-medium">{appointment.patient}</span> with{" "}
          <span className="font-medium">{appointment.doctor}</span> on{" "}
          <span className="font-medium">{appointment.date}</span> at{" "}
          <span className="font-medium">{appointment.time}</span>.
          <span className="text-red-400">This action cannot be undone.</span>
        </p>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Keep Appointment
          </button>
          <button
            onClick={() => onCancel(appointment.id)} // Cancels the appointment directly
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Cancel Appointment
          </button>
        </div>
      </div>
    </div>
  );
};
CancelAppointmentModal.propTypes = {
  appointment: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    patient: PropTypes.string,
    doctor: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CancelAppointmentModal;
