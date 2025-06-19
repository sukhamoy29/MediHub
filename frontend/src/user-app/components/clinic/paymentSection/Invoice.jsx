import { useState, useEffect } from "react";
import { CheckCircle, Download } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { clinics } from "../../../data/clinicsData";
import { createPatientsPayment } from "../../../api/patientsPaymentApi";

const Invoice = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { paymentSummary, appointmentSummary, clinic } = location.state || {};

  const clinicData =
    clinic ||
    clinics.find((c) => c.name === "City Health Clinic") ||
    clinics[0];

  const [dateIssued, setDateIssued] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const now = new Date();

    // Format issued date
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString(undefined, options);
    setDateIssued(formattedDate);

    // Generate dynamic invoice number: INV-YYMMDD-XXXX
    const uniquePart = Math.floor(1000 + Math.random() * 9000); // random 4-digit number
    const datePart = now.toISOString().slice(2, 10).replace(/-/g, ""); // e.g., 250607 for June 7, 2025
    const generatedInvoiceNumber = `INV-${datePart}-${uniquePart}`;
    setInvoiceNumber(generatedInvoiceNumber);
  }, []);

  const handleDownload = () => {
    window.print(); // Open browser's print dialog
  };

  const handleClose = async () => {
    setError(null);
    const now = new Date();
    const paymentData = {
      invoice_number: invoiceNumber,
      patient_name:
        appointmentSummary?.firstName && appointmentSummary?.lastName
          ? `${appointmentSummary.firstName} ${appointmentSummary.lastName}`
          : "N/A",
      payment_type: paymentSummary?.selectedMethod || "N/A",
      payment_time: paymentSummary?.paymentTime || "",
      amount: paymentSummary?.total || 0,
      clinic_name: clinicData.name,
      payment_date: now.toISOString().split("T")[0], // YYYY-MM-DD
      status: "Successful",
    };

    try {
      await createPatientsPayment(paymentData);
      navigate("/appointment-confirmed", {
        state: { paymentSummary, appointmentSummary, clinic: clinicData },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to save payment data");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8 relative">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 print:shadow-none print:border print:border-gray-300 print:max-w-full">
        {/* Header */}
        <div className="flex items-center justify-center mb-6">
          <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">
            Payment Successful
          </h2>
        </div>

        {/* Invoice Container */}
        <div className="border rounded-lg p-6 space-y-6">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-teal-600">Invoice</h3>
              <p className="text-sm text-gray-500">Invoice #{invoiceNumber}</p>
            </div>

            {/* Download button - HIDDEN IN PRINT */}
            <button
              onClick={handleDownload}
              className="mt-4 sm:mt-0 px-4 py-2 text-sm border border-gray-300 rounded text-teal-600 hover:bg-gray-100 flex items-center justify-center print:hidden cursor-pointer"
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </button>
          </div>

          {/* Details Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm text-gray-700">
            <div>
              <span className="font-medium">Date Issued:</span> {dateIssued}
            </div>
            <div>
              <span className="font-medium">Invoice Number:</span>{" "}
              {invoiceNumber}
            </div>
            <div className="sm:col-span-2 mt-4">
              <span className="font-medium">Patient Name:</span>{" "}
              {appointmentSummary?.firstName && appointmentSummary?.lastName
                ? `${appointmentSummary.firstName} ${appointmentSummary.lastName}`
                : "N/A"}{" "}
              <br />
              <span className="font-medium">Payment Type:</span>{" "}
              {paymentSummary?.selectedMethod || "N/A"} <br />
              <span className="font-medium">Payment Time:</span>{" "}
              {paymentSummary?.paymentTime || "N/A"}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="border-t pt-4 text-sm text-gray-700">
            <p className="font-medium mb-2">Payment Summary</p>
            <div className="flex justify-between">
              <span>Consultation Fee</span>
              <span>₹{paymentSummary?.doctorFee?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (18%)</span>
              <span>₹{paymentSummary?.gst?.toFixed(2) || "0.00"}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Platform Fee</span>
              <span>₹{paymentSummary?.platformFee?.toFixed(2) || "0.00"}</span>
            </div>
            {paymentSummary?.total !==
              paymentSummary?.doctorFee +
                paymentSummary?.gst +
                paymentSummary?.platformFee && (
              <div className="flex justify-between text-sm text-green-600 font-semibold">
                <span>10% First Visit Discount Applied</span>
                <span>
                  -₹
                  {(
                    (paymentSummary?.doctorFee +
                      paymentSummary?.gst +
                      paymentSummary?.platformFee) *
                    0.1
                  ).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-semibold text-gray-900 border-t pt-2">
              <span>Total Amount</span>
              <span className="text-blue-400">
                ₹{paymentSummary?.total?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>

          {/* Appointment Summary */}
          <div className="bg-gray-100 rounded p-4 text-sm">
            <p className="font-medium mb-1">Appointment Summary</p>
            <p>
              <strong>Clinic & Doctor:</strong> {clinicData.name} -{" "}
              {appointmentSummary?.selectedDoctor?.name || "N/A"}
            </p>
            <p>
              <strong>Date:</strong> {appointmentSummary?.selectedDate || "N/A"}
            </p>
            <p>
              <strong>Time:</strong> {appointmentSummary?.selectedSlot || "N/A"}
            </p>
            <p>
              <strong>First Visit:</strong>{" "}
              {appointmentSummary?.isFirstVisit || "N/A"}
            </p>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-gray-500">
            Thank you for your booking. Please arrive 15 minutes before your
            appointment time.
          </p>

          {/* Close button - HIDDEN IN PRINT */}
          <button
            onClick={handleClose}
            className="mt-4 px-4 py-2 text-sm font-medium bg-black text-white rounded hover:bg-gray-800 print:hidden cursor-pointer"
          >
            Close
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Invoice;
