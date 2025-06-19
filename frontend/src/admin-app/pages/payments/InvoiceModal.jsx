import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoiceModal = ({ invoice, onClose }) => {
  const invoiceRef = useRef(null); // Reference for the invoice content

  if (!invoice) return null;

  // Function to generate and download the invoice as a PDF
  const downloadPDF = () => {
    const input = invoiceRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${invoice.id}.pdf`);
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-auto bg-opacity-30 backdrop-blur-sm"></div>

      <div
        ref={invoiceRef}
        className="bg-white p-6 rounded-xl shadow-lg w-[90%] md:w-[500px] relative z-10"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <FiX size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Invoice</h2>

        {/* MediHub Info */}
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">MediHub</h3>
          <p className="text-sm text-gray-600">123 Medical Center Drive</p>
          <p className="text-sm text-gray-600">Anytown, CA 94321</p>
          <p className="text-sm text-gray-600">Phone: (555) 123-4567</p>
        </div>

        {/* Invoice Details */}
        <div className="mb-4 flex justify-between text-sm">
          <p className="text-gray-600">
            <strong>Invoice:</strong> {invoice.id}
          </p>
          <p className="text-gray-600">
            <strong>Date:</strong> {invoice.date}
          </p>
        </div>

        {/* Billing Info */}
        <div className="mb-4 flex justify-between text-sm">
          <div>
            <p className="text-gray-600">
              <strong>Bill To:</strong>
            </p>
            <p className="font-medium">{invoice.patient_name}</p>
            <p className="text-gray-600 text-xs"></p>
          </div>
          <div>
            <p className="text-gray-600">
              <strong>Service Provider:</strong>
            </p>
            <p className="font-medium">{invoice.doctor}</p>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full border-collapse border text-sm ">
            <thead>
              <tr className="bg-gray-100 border-b text-left">
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Quantity</th>
                <th className="p-2 border">Rate</th>
                <th className="p-2 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 border">{invoice.service}</td>
                <td className="p-2 border">1</td>
                <td className="p-2 border">${invoice.amount.toFixed(2)}</td>
                <td className="p-2 border">${invoice.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Summary */}
        <div className="mb-4 text-sm">
          <p className="text-gray-600">
            <strong>Subtotal:</strong> ${invoice.amount.toFixed(2)}
          </p>
          <p className="text-gray-600">
            <strong>Tax (0%):</strong> $0.00
          </p>
          <p className="font-medium">
            <strong>Total:</strong> ${invoice.amount.toFixed(2)}
          </p>
          <p
            className={`font-semibold ${
              invoice.status === "Paid"
                ? "text-green-600"
                : invoice.status === "Pending"
                ? "text-yellow-500"
                : "text-red-600"
            }`}
          >
            <strong>Status:</strong> {invoice.status}
          </p>
        </div>

        {/* Footer Message */}
        <p className="text-xs text-gray-500 text-center mb-4">
          Thank you for choosing MediHub for your healthcare needs.
          <br />
          Please contact our billing department if you have any questions.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

InvoiceModal.propTypes = {
  invoice: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default InvoiceModal;
