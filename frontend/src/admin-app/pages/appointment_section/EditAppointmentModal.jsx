import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const EditAppointmentModal = ({ appointment, onClose, onSave }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30 min");
  const [appointmentType, setAppointmentType] = useState("New Patient");
  const [status, setStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Cash");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (appointment) {
      setDate(appointment.date || "");
      const [timePart, durationPart] = appointment.time.split(" (");
      setTime(timePart || "");
      setDuration(durationPart ? durationPart.replace(")", "") : "30 min");
      setAppointmentType(appointment.type || "New Patient");
      setStatus(appointment.status || "Pending");
      setPaymentStatus(appointment.paymentStatus || "Cash");
      setNotes(appointment.notes || "");
    }
  }, [appointment]);

  const handleSave = () => {
    const updatedAppointment = {
      ...appointment,
      date,
      time: `${time} (${duration})`,
      type: appointmentType,
      status,
      paymentStatus,
      notes,
    };
    onSave(updatedAppointment);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl w-full max-w-lg md:max-w-xl h-auto transition-transform transform scale-95 md:scale-100 animate-slideUp">
        <h2 className="text-2xl font-semibold mb-2">Edit Appointment</h2>
        <p className="text-gray-500 text-sm mb-4">
          Update the appointment details.
        </p>

        {/* Patient and Doctor */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Patient</label>
          <input
            type="text"
            value={appointment?.patient || ""}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Doctor</label>
          <input
            type="text"
            value={appointment?.doctor || ""}
            disabled
            className="w-full p-2 border rounded-lg bg-gray-100"
          />
        </div>

        {/* Date and Time */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 font-medium">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-lg cursor-pointer"
            />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 font-medium">Time</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded-lg cursor-pointer"
            >
              {[
                "8:00 AM",
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM",
                "6:00 PM",
                "7:00 PM",
              ].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status and Payment */}
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border rounded-lg cursor-pointer"
            >
              {["Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-gray-700 font-medium">Payment</label>
            <select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="w-full p-2 border rounded-lg cursor-pointer"
            >
              {["Cash", "Offline", "Bank Transfer", "Card", "UPI"].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded-lg h-20 cursor-pointer"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

EditAppointmentModal.propTypes = {
  appointment: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAppointmentModal;
