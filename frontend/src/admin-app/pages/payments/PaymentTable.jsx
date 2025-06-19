import PropTypes from "prop-types";
import { deletePayment } from "../../api/clinicPaymentsApi";
import { useState } from "react";
import PaymentActionsMenu from "./PaymentActionsMenu";
import PaymentDetailsModal from "./PaymentDetailsModal";

const PaymentTable = ({ payments, setPayments }) => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleDelete = async (paymentId) => {
    if (!window.confirm("Are you sure you want to delete this payment?")) {
      return;
    }

    try {
      await deletePayment(paymentId);
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment.id !== paymentId)
      );
    } catch (error) {
      console.error("Failed to delete payment:", error);
      alert("Failed to delete payment. Please try again.");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "refunded":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Patient
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Invoice #
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Payment Method
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-900">
                  {payment.patient_name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {payment.invoice_number}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  ₹{Number(payment.amount).toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {formatDate(payment.payment_date)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">
                  {payment.payment_type || "Card"}
                </td>
                <td className="px-4 py-3 text-sm text-right">
                  <PaymentActionsMenu
                    payment={payment}
                    onDelete={handleDelete}
                    onView={() => setSelectedPayment(payment)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  );
};

PaymentTable.propTypes = {
  payments: PropTypes.array.isRequired,
  setPayments: PropTypes.func.isRequired,
};

export default PaymentTable;
