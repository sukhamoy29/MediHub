import PropTypes from "prop-types";

const NotificationHeader = ({
  selectedFilter,
  setSelectedFilter,
  markAllAsRead,
  isMarkAllDisabled,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border-b">
      <div>
        <h1 className="text-3xl font-bold">Notifications</h1>
        <p className="text-gray-500 text-sm">
          Stay updated with important information
        </p>
      </div>
      <div className="flex gap-4 mt-6 md:mt-6">
        {/* ✅ Ensure category names match sampleNotifications */}
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm cursor-pointer"
        >
          <option value="All Types">All Types</option>
          <option value="Appointments">Appointments</option>
          <option value="Payments">Payments</option>
          <option value="Medical">Medical</option>
          <option value="System">System</option>
        </select>
        <button
          onClick={markAllAsRead}
          disabled={isMarkAllDisabled}
          className={`px-4 py-2 text-sm rounded-md cursor-pointer ${
            isMarkAllDisabled
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-slate-400 text-white"
          }`}
        >
          Mark All as Read
        </button>
      </div>
    </div>
  );
};

NotificationHeader.propTypes = {
  selectedFilter: PropTypes.string.isRequired,
  setSelectedFilter: PropTypes.func.isRequired,
  markAllAsRead: PropTypes.func.isRequired,
  isMarkAllDisabled: PropTypes.bool.isRequired,
};

export default NotificationHeader;
