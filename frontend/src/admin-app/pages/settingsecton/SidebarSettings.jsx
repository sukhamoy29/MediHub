import { useState, useEffect } from "react";
import ProfileSettings from "./ProfileSettings";
// /import AccountSettings from "./AccountSettings";
import Notification from "./Notification";
import Appearance from "./Appearance";
import HelpSupport from "./HelpSupport";
import SecurityPrivacy from "./SecurityPrivacy";
import {
  FaUser,
  // FaKey,
  // FaBell,
  FaPalette,
  FaShieldAlt,
  // FaQuestionCircle,
  // FaSignOutAlt,
} from "react-icons/fa";

const SidebarSettings = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [setUserData] = useState({});

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleProfileUpdate = (updatedData) => {
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  const menuItems = [
    { name: "Profile", icon: <FaUser /> },
    // { name: "Account", icon: <FaKey /> },
    // { name: "Notifications", icon: <FaBell /> },
    { name: "Appearance", icon: <FaPalette /> },
    { name: "Security & Privacy", icon: <FaShieldAlt /> },
    // { name: "Help & Support", icon: <FaQuestionCircle /> },
  ];

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100 mt-10">
      {/* Sidebar */}
      <div className="w-full sm:w-72 bg-white shadow-lg p-6 rounded-lg flex flex-col items-center sm:items-start mb-6 sm:mb-0">
        {/* Menu Items */}
        <div className="mt-6 w-full">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center w-full px-4 py-3 rounded-lg gap-3 transition duration-300 cursor-pointer text-left ${
                activeTab === item.name
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.name)}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 p-4">
        {activeTab === "Profile" && (
          <ProfileSettings onProfileUpdate={handleProfileUpdate} />
        )}
        {/* {activeTab === "Account" && <AccountSettings />} */}
        {activeTab === "Notifications" && <Notification />}
        {activeTab === "Appearance" && <Appearance />}
        {activeTab === "Help & Support" && <HelpSupport />}
        {activeTab === "Security & Privacy" && <SecurityPrivacy />}
        {activeTab !== "Profile" &&
          // activeTab !== "Account" &&
          activeTab !== "Notifications" &&
          activeTab !== "Appearance" &&
          activeTab !== "Help & Support" &&
          activeTab !== "Security & Privacy" && (
            <h2 className="text-2xl font-semibold">{activeTab} Section</h2>
          )}
      </div>
    </div>
  );
};

export default SidebarSettings;
