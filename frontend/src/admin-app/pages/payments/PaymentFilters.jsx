import PropTypes from "prop-types";

const PaymentFilters = ({ selectedFilter, setSelectedFilter }) => {
  const filters = ["All", "Paid", "Pending", "Refunded"];

  return (
    <div className="bg-white p-2 rounded-lg flex gap-2 shadow">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setSelectedFilter(filter)}
          className={`px-4 py-2 text-sm rounded transition ${
            selectedFilter === filter
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

PaymentFilters.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
};

export default PaymentFilters;
