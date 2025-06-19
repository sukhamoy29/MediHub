import {
  FaTachometerAlt,
  FaUserMd,
  // FaUsers,
  FaCalendarCheck,
  FaMoneyBill,
  FaCog,
  FaBell,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { X } from "lucide-react";
import PropTypes from "prop-types";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../user-app/context/AuthContext";

const Sidebar = ({
  setActivePage,
  isOpen,
  toggleSidebar,
  notifications = [],
  markAsRead,
}) => {
  const { logout } = useContext(AuthContext);
  const unreadCount = notifications.filter(
    (notification) => notification.isUnread
  ).length;

  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      section: "MAIN",
      path: "/admin/dashboard",
    },
    {
      name: "Doctors",
      icon: <FaUserMd />,
      section: "MAIN",
      path: "/admin/doctors",
    },
    // {
    //   name: "Patients",
    //   icon: <FaUsers />,
    //   section: "MAIN",
    //   path: "/admin/patients",
    // },
    {
      name: "Appointments",
      icon: <FaCalendarCheck />,
      section: "MAIN",
      path: "/admin/appointments",
    },
    {
      name: "Payments",
      icon: <FaMoneyBill />,
      section: "ADMINISTRATION",
      path: "/admin/payments",
    },
    {
      name: "Notifications",
      icon: (
        <div className="relative">
          <FaBell />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">
              {unreadCount}
            </span>
          )}
        </div>
      ),
      section: "ADMINISTRATION",
      path: "/admin/notifications",
    },
    {
      name: "Settings",
      icon: <FaCog />,
      section: "ADMINISTRATION",
      path: "/admin/settings",
    },
  ];

  const handleLogout = () => {
    toast.info("Logging out..."); // Show toast message on logout
    logout(); // Call the logout function from AuthContext
    window.location.reload(); // Optionally, use navigate("/") instead
  };

  const handleNotificationClick = () => {
    markAsRead(); // Mark notifications as read
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-white text-gray-700 w-64 p-5 z-50 border-r-2 border-slate-300 transition-transform duration-300 ease-in-out 
        ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 md:hidden"
          onClick={toggleSidebar}
        >
          <X size={24} />
        </button>

        {["MAIN", "ADMINISTRATION"].map((section) => (
          <div key={section} className="mb-4">
            <h3 className="text-gray-400 uppercase text-sm mb-2">{section}</h3>
            {menuItems
              .filter((item) => item.section === section)
              .map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-3 py-2 px-3 w-full text-left rounded bg-gray-100 transition-all duration-200"
                      : "flex items-center gap-3 py-2 px-3 w-full text-left rounded hover:bg-gray-100 transition-all duration-200"
                  }
                  onClick={() => {
                    setActivePage(item.name);
                    toggleSidebar(); // Close sidebar on mobile after clicking
                    if (item.name === "Notifications") {
                      handleNotificationClick(); // Mark notifications as read
                    }
                  }}
                >
                  {item.icon} {item.name}
                </NavLink>
              ))}
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 py-2 px-3 w-full text-left rounded hover:bg-gray-200 text-red-400 mt-4 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  notifications: PropTypes.array,
  markAsRead: PropTypes.func.isRequired,
};

export default Sidebar;
