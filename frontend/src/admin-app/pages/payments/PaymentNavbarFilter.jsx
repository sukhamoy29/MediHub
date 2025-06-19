import { useState } from "react";
import PropTypes from "prop-types";

const PaymentNavbarFilter = ({ onApplyFilters }) => {
  const [status, setStatus] = useState("All Statuses");
  const [method, setMethod] = useState("All Methods");
  const [date, setDate] = useState("");

  const handleApplyFilters = () => {
    onApplyFilters({ status, method, date });
  };

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg border rounded-md p-4 z-10">
      <h3 className="text-lg font-semibold">Filter Payments</h3>
      <p className="text-sm text-gray-500">
        Narrow down payments by status, method, and date
      </p>

      {/* Status Filter */}
      <label className="block mt-3 text-sm font-medium">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option>All Statuses</option>
        <option>Paid</option>
        <option>Pending</option>
        <option>Refunded</option>
      </select>

      {/* Payment Method Filter */}
      <label className="block mt-3 text-sm font-medium">Payment Method</label>
      <select
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="w-full border rounded-md p-2"
      >
        <option>All Methods</option>
        <option>Card</option>
        <option>UPI</option>
        <option>Offline</option>
        <option>Bank Transfer</option>
      </select>

      {/* Date Picker */}
      <label className="block mt-3 text-sm font-medium">Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded-md p-2"
      />

      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full mt-4 bg-black text-white py-2 rounded-md hover:bg-gray-800"
      >
        Apply Filters
      </button>
    </div>
  );
};
PaymentNavbarFilter.propTypes = {
  onApplyFilters: PropTypes.func.isRequired,
};

export default PaymentNavbarFilter;
