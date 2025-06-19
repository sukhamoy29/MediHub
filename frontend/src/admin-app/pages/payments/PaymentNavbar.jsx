import { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import PaymentNavbarFilter from "./PaymentNavbarFilter";

const PaymentNavbar = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleApplyFilters = (filters) => {
    onFilter(filters);
    setIsFilterOpen(false);
  };

  return (
    <div className="flex flex-wrap justify-between items-center p-4 bg-white shadow rounded-lg relative">
      {/* Search Input */}
      <div className="relative w-full md:w-72 mb-4 md:mb-0">
        <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search payments by id, name ....."
          className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Filter Button */}
      <div className="relative w-full md:w-auto text-center md:text-left">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center justify-center gap-2 w-full md:w-auto px-4 py-2 border rounded-md hover:bg-gray-100 transition"
        >
          <FiFilter size={18} />
          <span>Filter</span>
        </button>

        {/* PaymentFilter Dropdown */}
        {isFilterOpen && (
          <div className="absolute right-0 mt-2 z-10">
            <PaymentNavbarFilter onApplyFilters={handleApplyFilters} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentNavbar;
