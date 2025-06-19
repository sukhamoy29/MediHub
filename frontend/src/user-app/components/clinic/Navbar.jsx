import React from "react";
import { Search } from "lucide-react";

const Navbar = ({ searchTerm, onSearchChange }) => {
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-xl shadow-md">
      {/* Search Input */}
      <div className="relative w-full sm:max-w-md flex-grow">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search clinics by name"
          className="w-full pl-10 pr-3 py-2 rounded-md border text-sm placeholder-gray-500"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Navbar;
