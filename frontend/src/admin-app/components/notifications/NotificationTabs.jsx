import PropTypes from "prop-types";

const NotificationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b">
      {["All", "Unread"].map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`py-2 px-4 flex-1 text-center ${
            activeTab === tab
              ? "border-b-2 border-blue-500 font-semibold text-lg text-gray-900"
              : "text-gray-500 font-medium text-base"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

NotificationTabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

export default NotificationTabs;
