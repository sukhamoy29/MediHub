import { useState, useEffect } from "react";

import { Filter, ChevronDown } from "lucide-react";

export default function FilterSection({ setFilter }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Patients");

  const handleFilterSelect = (filter) => {
    setDropdownOpen(false);

    setSelectedFilter(filter);
    setFilter(filter);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest(".relative")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        <Filter className="mr-2" size={18} /> {selectedFilter}{" "}
        <ChevronDown className="ml-2" size={18} />
      </button>
      {dropdownOpen && (
        <div className="absolute mt-2 bg-gray-100 border border-gray-600 rounded-md w-full shadow-lg ">
          <button
            onClick={() => handleFilterSelect("All Patients")}
            className="block px-4 py-2 text-neutral-900 hover:bg-gray-600 hover:text-white w-full text-left cursor-pointer"
          >
            All Patients
          </button>
          <button
            onClick={() => handleFilterSelect("Active")}
            className="block px-4 py-2 text-neutral-900 hover:bg-gray-600 hover:text-white w-full text-left cursor-pointer"
          >
            Active
          </button>
          <button
            onClick={() => handleFilterSelect("Inactive")}
            className="block px-4 py-2 text-neutral-900 hover:bg-gray-600 hover:text-white w-full text-left cursor-pointer"
          >
            Inactive
          </button>
        </div>
      )}
    </div>
  );
}
