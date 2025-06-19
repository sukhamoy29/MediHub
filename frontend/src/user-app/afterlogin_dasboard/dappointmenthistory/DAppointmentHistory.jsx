import { useState, useEffect } from "react";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import FeedbackForm from "./DAppointmentFeedbackForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Create axios instance with baseURL for backend API
const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

const DAppointmentHistory = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showFeedbackFor, setShowFeedbackFor] = useState(null);
  const [feedbackData, setFeedbackData] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointments from backend API
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("access_token"); // fixed token key to match AuthProvider
        const response = await api.get("/appointments", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Appointments API response data:", response.data);

        // Ensure the response is an array
        const appointments = Array.isArray(response.data) ? response.data : [];

        const normalizedAppointments = appointments.map((appt) => ({
          ...appt,
          status: appt.status || "Pending",
          doctorName: appt.doctor_name,
          patientName: appt.patient_name,
          phoneNumber: appt.phone_number,
          email: appt.email,
          radioButtonValue: appt.radio_button_value,
          clinic: {
            ...appt.clinic,
          },
        }));

        const pendingAppointments = normalizedAppointments.filter(
          (appt) => appt.status === "Pending"
        );
        setUpcomingAppointments(pendingAppointments);

        const pastAppointments = normalizedAppointments.filter(
          (appt) => appt.status !== "Pending"
        );
        setPastAppointments(pastAppointments);

        // Initialize feedbackData from appointments with feedback
        const feedbacks = {};
        appointments.forEach((appt) => {
          if (appt.feedback_rating || appt.feedback_comment) {
            feedbacks[appt.id] = {
              rating: appt.feedback_rating,
              comment: appt.feedback_comment,
            };
          }
        });
        setFeedbackData(feedbacks);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const appointmentToUpdate = upcomingAppointments.find(
        (appt) => appt.id === appointmentId
      );
      if (!appointmentToUpdate) return;

      const updatedAppointment = {
        ...appointmentToUpdate,
        status: newStatus,
        doctor_name: appointmentToUpdate.doctorName,
        patient_name: appointmentToUpdate.patientName,
        phone_number: appointmentToUpdate.phoneNumber,
        email: appointmentToUpdate.email,
        radio_button_value: appointmentToUpdate.radioButtonValue,
      };

      const token = localStorage.getItem("access_token");

      // Use api instance with baseURL for consistency and include Authorization header
      await api.put(`/appointments/${appointmentId}`, updatedAppointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local state
      setUpcomingAppointments((prev) =>
        prev.filter((appt) => appt.id !== appointmentId)
      );
      setPastAppointments((prev) => [...prev, updatedAppointment]);
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const appointment = upcomingAppointments[index];
    if (!appointment) return;
    updateAppointmentStatus(appointment.id, newStatus);
  };

  const handleFeedbackSubmit = async (appointmentId, rating, comment) => {
    try {
      const appointmentToUpdate =
        pastAppointments.find((appt) => appt.id === appointmentId) ||
        upcomingAppointments.find((appt) => appt.id === appointmentId);

      if (!appointmentToUpdate) return;

      const updatedAppointment = {
        ...appointmentToUpdate,
        feedback_rating: rating,
        feedback_comment: comment,
      };

      const token = localStorage.getItem("access_token");

      await api.put(`/appointments/${appointmentId}`, updatedAppointment, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFeedbackData((prev) => ({
        ...prev,
        [appointmentId]: { rating, comment },
      }));
      setShowFeedbackFor(null);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto ml-0 p-3 md:p-8 bg-white rounded-xl shadow-lg w-full sm:w-full sm:p-0">
      {showFeedbackFor ? (
        <div>
          <h1 className="text-3xl font-extrabold mb-6 text-teal-500">
            Give Feedback
          </h1>
          <FeedbackForm
            appointmentId={showFeedbackFor?.id || "Unknown Appointment ID"}
            doctorName={showFeedbackFor?.doctor || "Unknown Doctor"}
            clinicName={showFeedbackFor?.location || "Unknown Clinic"}
            onSubmit={handleFeedbackSubmit}
          />
          <div className="text-right mt-4">
            <button
              onClick={() => setShowFeedbackFor(null)}
              className="text-sm text-red-500 hover:underline cursor-pointer"
            >
              Cancel Feedback
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
            Appointment History
          </h1>

          <div className="flex space-x-6 mb-8 border-b border-gray-300">
            <button
              className={`relative pb-3 font-semibold text-lg transition-colors duration-300 ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`relative pb-3 font-semibold text-lg transition-colors duration-300 ${
                activeTab === "past"
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("past")}
            >
              Past
            </button>
          </div>

          {activeTab === "upcoming" && (
            <ul className="space-y-6">
              {upcomingAppointments.map((appt, index) => (
                <li
                  key={`${appt.id || index}-${index}`}
                  className="bg-gradient-to-r from-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow-md"
                >
                  <p className="flex items-center text-xl font-semibold text-blue-900 mb-2">
                    <FaUserMd className="mr-2 text-blue-600" />
                    {appt.selectedDoctor?.name ||
                      appt.doctorName ||
                      "Doctor Name Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <FaCalendarAlt className="mr-2 text-blue-500" />
                    {appt.selectedDate || appt.date || "Date Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <FaClock className="mr-2 text-blue-500" />
                    {appt.selectedSlot || appt.time || "Time Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    {appt.clinic?.name ||
                      appt.location ||
                      "Clinic Name Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <strong>Address: </strong>
                    {appt.address || "Address Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <strong>Fee: </strong> ₹{appt.fees || 0}
                  </p>

                  <p className="flex items-center font-medium">
                    Status:
                    {appt.status === "Completed" ? (
                      <span className="ml-2 flex items-center text-green-600">
                        <FaCheckCircle className="mr-1" /> Completed
                      </span>
                    ) : appt.status === "Cancelled" ? (
                      <span className="ml-2 flex items-center text-red-600">
                        <FaTimesCircle className="mr-1" /> Cancelled
                      </span>
                    ) : (
                      <span className="ml-2 text-yellow-600">Pending</span>
                    )}
                  </p>

                  {appt.status === "Pending" && (
                    <div className="mt-4 flex flex-col gap-4 sm:flex-row">
                      <button
                        onClick={() => handleStatusChange(index, "Completed")}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Mark as Complete
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, "Cancelled")}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      >
                        Cancel
                      </button>
                    </div>
                  )}

                  {appt.status === "Completed" && !feedbackData[appt.id] && (
                    <button
                      onClick={() => setShowFeedbackFor(appt)}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      Give Feedback
                    </button>
                  )}

                  {appt.status === "Completed" && feedbackData[appt.id] && (
                    <div className="mt-4 text-green-700 font-medium">
                      ✅ Feedback submitted — {feedbackData[appt.id].rating}★
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap lg:flex-nowrap gap-4">
                    <button
                      onClick={() =>
                        navigate("/appointment-confirmed", {
                          state: {
                            appointmentSummary: {
                              ...appt,
                              appointmentType:
                                appt.appointmentType || "Procedure",
                              firstName:
                                appt.patientName?.split(" ")[0] || "Name",
                              lastName:
                                appt.patientName?.split(" ")[1] ||
                                "Not Available",
                              phoneNumber:
                                appt.phoneNumber ||
                                appt.phone ||
                                "Phone Not Available",
                              email: appt.email || "Email Not Available",
                            },
                            paymentSummary: appt.paymentSummary || {}, // Pass actual paymentSummary if available
                            clinic: {
                              name:
                                appt.clinic?.name ||
                                "Clinic Name Not Available",
                              address:
                                appt.clinic?.address || "Address Not Available",
                              fees: appt.clinic?.fees || 0,
                            },
                          },
                        })
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
              {upcomingAppointments.length === 0 && (
                <p className="text-center text-gray-500">
                  No upcoming appointments found.
                </p>
              )}
            </ul>
          )}

          {activeTab === "past" && (
            <ul className="space-y-6">
              {pastAppointments.map((appt, index) => (
                <li
                  key={`${appt.id || index}-${index}`}
                  className="bg-white border border-gray-300 rounded-xl p-6 shadow-md"
                >
                  <p className="flex items-center text-xl font-semibold text-gray-900 mb-2">
                    <FaUserMd className="mr-2 text-gray-600" />
                    {appt.selectedDoctor?.name ||
                      appt.doctorName ||
                      "Doctor Name Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <FaCalendarAlt className="mr-2 text-gray-500" />
                    {appt.selectedDate || appt.date || "Date Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <FaClock className="mr-2 text-gray-500" />
                    {appt.selectedSlot || appt.time || "Time Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-2">
                    <FaMapMarkerAlt className="mr-2 text-gray-500" />
                    {appt.clinic?.name ||
                      appt.location ||
                      "Clinic Name Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <strong>Address: </strong>
                    {appt.address || "Address Not Available"}
                  </p>
                  <p className="flex items-center text-gray-700 mb-1">
                    <strong>Fee: </strong> ₹{appt.fees || 0}
                  </p>
                  <p className="flex items-center font-medium">
                    Status:
                    {appt.status === "Completed" ? (
                      <span className="ml-2 flex items-center text-green-600">
                        <FaCheckCircle className="mr-1" />
                        {appt.status}
                      </span>
                    ) : (
                      <span className="ml-2 flex items-center text-red-600">
                        <FaTimesCircle className="mr-1" />
                        {appt.status}
                      </span>
                    )}
                  </p>

                  {appt.status === "Completed" && !feedbackData[appt.id] && (
                    <button
                      onClick={() => setShowFeedbackFor(appt)}
                      className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
                    >
                      Give Feedback
                    </button>
                  )}

                  {feedbackData[appt.id] && (
                    <div className="mt-4 text-green-700 font-medium">
                      ✅ Feedback submitted — {feedbackData[appt.id].rating}★
                    </div>
                  )}

                  <div className=" mt-4 ">
                    <button
                      onClick={() =>
                        navigate("/appointment-confirmed", {
                          state: {
                            appointmentSummary: {
                              ...appt,
                              appointmentType:
                                appt.appointmentType || "Procedure",
                              firstName:
                                appt.patientName?.split(" ")[0] || "Name",
                              lastName:
                                appt.patientName?.split(" ")[1] ||
                                "Not Available",
                              phoneNumber:
                                appt.phoneNumber ||
                                appt.phone ||
                                "Phone Not Available",
                              email: appt.email || "Email Not Available",
                            },
                            paymentSummary: appt.paymentSummary || {}, // Pass actual paymentSummary if available
                            clinic: {
                              ...appt.clinic,
                              address:
                                appt.clinic?.address || "Address Not Available",
                              fees: appt.clinic?.fees || 0,
                            },
                          },
                        })
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Details
                    </button>
                  </div>
                </li>
              ))}
              {pastAppointments.length === 0 && (
                <p className="text-center text-gray-500">
                  No past appointments found.
                </p>
              )}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default DAppointmentHistory;
