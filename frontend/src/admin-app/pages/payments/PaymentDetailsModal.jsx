import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { FaFileInvoice } from "react-icons/fa";
import { useState } from "react";
import InvoiceModal from "./InvoiceModal";

const PaymentDetailsModal = ({ payment, onClose }) => {
  const [showInvoice, setShowInvoice] = useState(false);

  if (!payment) return null;

  const handleViewInvoice = () => {
    setShowInvoice(true);
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-auto bg-opacity-50 backdrop-blur-sm"></div>
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px] relative z-10">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold mb-4">Payment Details</h2>

        {/* Payment Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaFileInvoice className="text-blue-600" size={24} />
            <div>
              <p className="font-semibold text-gray-900">{payment.id}</p>
              <p className="text-sm text-gray-500">
                Invoice: {payment.invoice}
              </p>
            </div>
          </div>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              payment.status === "Paid"
                ? "bg-green-100 text-green-700"
                : payment.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {payment.status}
          </span>
        </div>

        {/* Patient  */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Patient</p>
            <p className="text-gray-900 font-medium">{payment.patient_name}</p>
            <p className="text-xs text-gray-500"></p>
          </div>
        </div>

        {/* Service, Amount, Date, Payment Method */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Service</p>
            <p className="text-gray-900 font-medium">
              {payment.patient_service}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Amount</p>
            <p className="text-gray-900 font-medium">
              ${payment.amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Date</p>
            <p className="text-gray-900 font-medium">{payment.payment_date}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Payment Method</p>
            <p className="text-gray-900 font-medium">
              {payment.payment_method}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer"
            onClick={handleViewInvoice}
          >
            View Invoice
          </button>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <InvoiceModal invoice={payment} onClose={handleCloseInvoice} />
      )}
    </div>
  );
};

PaymentDetailsModal.propTypes = {
  payment: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PaymentDetailsModal;
