import { useState } from "react";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

const AppointmentNavbar = ({ view, setView, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (view === "Calendar" && query) {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    } else {
      setShowWarning(false);
      onSearch(query);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow rounded-lg space-y-3 md:space-y-0">
      {/* Search Bar */}
      <div className="relative w-full md:w-80">
        <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search appointments..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {showWarning && (
          <div className="absolute top-full mt-1 left-0 right-0 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
            Search is only available in List View
          </div>
        )}
      </div>

      {/* View Selection */}
      <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start gap-2 bg-gray-100 p-1 rounded-lg">
        {["List", "Calendar"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 text-sm rounded-lg transition cursor-pointer ${
              view === option ? "bg-white shadow" : "text-gray-500"
            }`}
            onClick={() => setView(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* New Appointment Button (Uncomment if needed) */}
      {/* <button className="flex items-center bg-black text-white px-4 py-2 rounded-lg cursor-pointer">
        <FaPlus className="mr-2" /> New Appointment
      </button> */}
    </div>
  );
};
AppointmentNavbar.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default AppointmentNavbar;
