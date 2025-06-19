import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {/* Previous Arrow */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`w-10 h-10 flex items-center justify-center rounded-md border cursor-pointer ${
            number === currentPage
              ? "bg-emerald-600 text-white font-semibold shadow"
              : "border-gray-200 text-gray-800 bg-white hover:bg-gray-100"
          }`}
        >
          {number}
        </button>
      ))}

      {/* Next Arrow */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 flex items-center justify-center rounded-md border border-gray-200 cursor-pointer ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-600 hover:bg-gray-100"
        }`}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};
Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
