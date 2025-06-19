import { useState, useEffect } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const getFormattedDate = (date) => {
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const dates = ["Today", "Tomorrow"];
const slots = ["9:00 AM", "11:30 AM", "2:15 PM"];

const BookAppointment = () => {
  const location = useLocation();
  const clinic = location.state || {};
  const rawDoctors = clinic?.doctors || [];
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log("Clinic data received in BookAppointment:", clinic);
  }, [clinic]);

  useEffect(() => {
    // Add unique ids to doctors if missing
    if (rawDoctors.length > 0) {
      const doctorsWithIds = rawDoctors.map((doc, index) => ({
        id: doc.id || index + 1,
        ...doc,
      }));
      setDoctors(doctorsWithIds);
    }
  }, [rawDoctors]);

  const handleConfirmBooking = async () => {
    if (
      !selectedDoctor ||
      !selectedDate ||
      !selectedSlot ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !email
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("You must be logged in to book an appointment.");
      return;
    }
    console.log("Access token:", token);

    console.log("Selected doctor:", selectedDoctor);
    console.log("Selected doctor id:", selectedDoctor?.id);

    const appointmentDate = (() => {
      if (selectedDate === "Today")
        return new Date().toISOString().split("T")[0];
      if (selectedDate === "Tomorrow") {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
      }
      // If selectedDate is a string from calendar input, return as is
      return selectedDate;
    })();

    const appointmentDetails = {
      doctor_id: selectedDoctor.id,
      date: appointmentDate,
      time: selectedSlot,
      status: "Pending",
      clinic_name: clinic.name || "",
      location: clinic.name || "",
      doctor_name: selectedDoctor.name,
      patient_name: firstName + " " + lastName,
      phone_number: phoneNumber,
      email: email,
      radio_button_value: isFirstVisit,
      feedback_rating: null,
      feedback_comment: null,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/api/clinic_appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(appointmentDetails),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Booking error data:", errorData);
        let errorMessage = "Failed to book appointment:\n";
        if (Array.isArray(errorData.detail)) {
          errorMessage += errorData.detail
            .map((err) => `${err.loc?.join(" > ")}: ${err.msg}`)
            .join("\n");
        } else if (typeof errorData.detail === "string") {
          errorMessage += errorData.detail;
        } else {
          errorMessage += JSON.stringify(errorData.detail);
        }
        if (errorData.detail === "Could not validate credentials") {
          alert(
            "Booking failed: Your login session may have expired. Please log in again."
          );
        } else {
          alert(errorMessage);
        }
        return;
      }

      const savedAppointment = await response.json();
      navigate("/payment", {
        state: {
          selectedDate,
          selectedSlot,
          selectedDoctor,
          isFirstVisit,
          firstName,
          lastName,
          phoneNumber,
          email,
          clinic,
          savedAppointment,
        },
      });
    } catch (error) {
      alert("Error booking appointment: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white shadow-lg rounded-lg p-6"
      >
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-teal-600 hover:text-teal-800 text-sm font-semibold"
        >
          ← Back
        </button>

        <h2 className="text-2xl font-bold text-center text-teal-700 mb-6">
          Book an Appointment
        </h2>
        {/* Date Selector */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Choose Date
          </h3>
          <div className="flex gap-2 mb-4">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition ${
                  selectedDate === date
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {date}
              </button>
            ))}
            {/* Calendar input for dates beyond tomorrow */}
            <input
              type="date"
              min={
                new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000)
                  .toISOString()
                  .split("T")[0]
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate}
            />
          </div>
        </div>
        {/* Slot Selector */}
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Available Slots
          </h3>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {slots.map((slot) => (
              <button
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`flex items-center justify-center border rounded-md py-2 text-sm transition ${
                  selectedSlot === slot
                    ? "bg-teal-500 text-white"
                    : "border-gray-300 text-gray-700 hover:border-teal-500"
                }`}
              >
                <Clock className="w-4 h-4 mr-1" />
                {slot}
              </button>
            ))}
          </div>
        </div>
        {/* Doctor Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Select Doctor
          </label>
          <div className="relative">
            <select
              value={selectedDoctor?.name || ""}
              onChange={(e) => {
                const doc = doctors.find((d) => d.name === e.target.value);
                setSelectedDoctor(doc);
              }}
              className="w-full appearance-none border border-gray-300 rounded px-3 py-2 text-sm bg-white cursor-pointer focus:outline-teal-500"
            >
              <option value="">-- Choose Doctor --</option>
              {doctors.map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name} ({doc.specialty})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute top-2.5 right-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>
        {/* Patient Information */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Patient Info
          </h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Phone Number"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {/* First Visit Question */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            First Visit?
          </h3>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="firstVisit"
                value="yes"
                checked={isFirstVisit === "yes"}
                onChange={(e) => setIsFirstVisit(e.target.value)}
              />
              Yes
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="radio"
                name="firstVisit"
                value="no"
                checked={isFirstVisit === "no"}
                onChange={(e) => setIsFirstVisit(e.target.value)}
              />
              No
            </label>
          </div>
        </div>
        {/* Confirm Button */}
        <button
          onClick={handleConfirmBooking}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-sm py-2 rounded-md transition"
        >
          Confirm Booking
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">
          By booking an appointment, you agree to our{" "}
          <span className="text-gray-900 font-semibold">Terms of Service</span>{" "}
          and{" "}
          <span className="text-gray-900 font-semibold">Privacy Policy</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default BookAppointment;
