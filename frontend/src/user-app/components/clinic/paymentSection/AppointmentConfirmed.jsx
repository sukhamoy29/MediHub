import { CalendarDays, FileText, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { clinicInfo } from "../../../data/clinicData";
import { doctors } from "../../../data/doctors";

const AppointmentConfirmed = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get passed state from navigation
  const paymentSummary = location.state?.paymentSummary;
  const appointmentSummary = location.state?.appointmentSummary;
  const clinic = location.state?.clinic || clinicInfo;

  // Extract patient info from location.state
  const firstName = appointmentSummary?.firstName || "";
  const lastName = appointmentSummary?.lastName || "";
  const phoneNumber = appointmentSummary?.phoneNumber || "";
  const email = appointmentSummary?.email || "";

  const selectedDoctor = appointmentSummary?.selectedDoctor || doctors[0];
  const appointmentDate =
    appointmentSummary?.selectedDate || "Friday, April 18, 2025";
  const appointmentTime = appointmentSummary?.selectedSlot || "11:00 AM";
  const appointmentType = appointmentSummary?.appointmentType || "Procedure";
  const fee = paymentSummary?.total || clinic.fees;

  const handleReturnHome = () => {
    navigate("/"); // Adjust this route if your home route is different
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg text-center">
      <div className="flex flex-col items-center">
        <CalendarDays className="w-12 h-12 text-teal-600 mb-4" />
        <h2 className="text-2xl font-semibold  mb-2 text-teal-600">
          Appointment Confirmed!
        </h2>
        <p className="text-sm text-gray-600 mb-8">
          Your appointment has been successfully scheduled
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 mb-10 text-left">
        <h3 className="text-md font-semibold text-teal-600 mb-4">
          Appointment Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div>
            <strong>Clinic & Doctor:</strong> {clinic.name} -{" "}
            {selectedDoctor.name}
          </div>
          <div>
            <strong>Date:</strong> {appointmentDate}
          </div>
          <div>
            <strong>Specialty:</strong> {selectedDoctor.specialty}
          </div>
          <div>
            <strong>Time:</strong> {appointmentTime}
          </div>
          <div>
            <strong>Location:</strong> {clinic.name}
          </div>
          <div>
            <strong>Appointment Type:</strong> {appointmentType}
          </div>
          <div>
            <strong>Address:</strong> {clinic.address}
          </div>
          <div>
            <strong>Fee:</strong> ₹{fee}
          </div>
          {paymentSummary?.total !==
            paymentSummary?.doctorFee +
              paymentSummary?.gst +
              paymentSummary?.platformFee && (
            <div className="text-sm text-green-600 font-semibold mt-1">
              10% First Visit Discount Applied
            </div>
          )}
          {/* Added patient details */}
          <div>
            <strong>Patient Name:</strong> {firstName} {lastName}
          </div>
          <div>
            <strong>Phone Number:</strong> {phoneNumber}
          </div>
          <div>
            <strong>Email:</strong> {email}
          </div>
        </div>
      </div>

      <h4 className="text-base font-semibold text-teal-700 gray-900 mb-3">
        What&apos;s Next?
      </h4>
      <p className="text-sm text-gray-600 mb-6">
        We&apos;ve sent a confirmation email with all the details to your
        registered email address.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm mb-8">
        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
          <CalendarDays className="w-5 h-5 mb-2 text-teal-700" />
          <strong className="text-teal-500">Appointment Reminder</strong>
          <p className="text-gray-600 mt-1">
            You’ll receive a reminder 24 hours before your appointment
          </p>
        </div>

        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
          <FileText className="w-5 h-5 mb-2 text-teal-700" />
          <strong className="text-teal-500">Medical Records</strong>
          <p className="text-gray-600 mt-1">
            Please bring any relevant medical records to your appointment
          </p>
        </div>

        <div className="border rounded-lg p-4 flex flex-col items-center text-center">
          <Clock className="w-5 h-5 mb-2 text-teal-700" />
          <strong className="text-teal-500">Arrive Early</strong>
          <p className="text-gray-600 mt-1">
            Please arrive 15 minutes before your scheduled appointment time
          </p>
        </div>
      </div>

      {/* <div className="flex flex-row sm:flex-row gap-4 justify-center mb-6">
        <button
          onClick={handleViewInvoice}
          className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium  text-white rounded bg-teal-600 hover:bg-teal-700"
        >
          <ReceiptText className="w-4 h-4 mr-2" />
          View Invoice
        </button>
        <button
          onClick={handleDownloadInvoice}
          className="cursor-pointer inline-flex items-center justify-center px-4 py-2 text-sm font-medium border border-black rounded text-teal-600 hover:bg-gray-100"
        >
          <Download className="w-4 h-4 mr-2 text-teal-600" />
          Download Invoice
        </button>
      </div> */}

      {/* Return to Home Button */}
      <button
        onClick={handleReturnHome}
        className="mt-4 px-6 py-2 text-sm font-medium bg-gray-100 text-teal-600 border border-gray-300 rounded hover:bg-gray-200 cursor-pointer"
      >
        Return to Home
      </button>
    </div>
  );
};

export default AppointmentConfirmed;
