import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Menu, SquarePen, Users, Settings, LogOut } from "lucide-react";
import LogoutPopup from "./DLogoutPopup";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";

const Dsidebar = ({ onSectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const location = useLocation();

  const { logout } = useContext(AuthContext);

  const handleLogoutConfirm = () => {
    logout();
    window.location.href = "/";
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsExpanded(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarItems = [
    {
      icon: <SquarePen size={24} />,
      label: "View / Update Profile",
      section: "profile",
      path: "/dashboard/profile",
    },
    {
      icon: <Users size={24} />,
      label: "Appointments",
      section: "appointment",
      path: "/dashboard/appointments",
    },
    {
      icon: <Users size={24} />,
      label: "Book Appointment",
      section: "book_appointment",
      path: "/clinics",
    },
    {
      icon: <Settings size={24} />,
      label: "Settings",
      section: "settings",
      path: "/dashboard/settings",
    },
    {
      icon: <LogOut size={24} />,
      label: "Log Out",
      color: "text-red-400",
      section: "logout",
    },
  ];

  return (
    <>
      {isMobile && (
        <div className="bg-white p-4 shadow-md sticky top-0 z-10">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-900 hover:text-gray-700"
          >
            <Menu size={24} />
          </button>
        </div>
      )}

      <div
        className={`${
          isExpanded ? "translate-x-0" : "-translate-x-full"
        } transform ${
          isMobile
            ? "fixed top-16 left-0 h-50 max-h-[90vh]"
            : "sticky top-0 left-0 h-screen"
        } w-56 bg-white shadow-lg transition-transform duration-300 ease-in-out z-20 flex flex-col`}
      >
        <div className="flex-1 overflow-y-auto p-4">
          <h2 className="text-xl font-semibold mb-6 text-center">Menu</h2>
          <ul className="space-y-4">
            {sidebarItems.map((item) => (
              <li
                key={item.label}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition-all duration-200
                  ${item.color ? item.color : "text-gray-700"}
                  ${
                    location.pathname === item.path
                      ? "bg-teal-50 text-teal-600 border-l-4 border-teal-500 font-medium"
                      : "hover:bg-gray-50 hover:text-teal-600"
                  }`}
                onClick={() => {
                  if (item.section === "logout") {
                    handleLogout();
                  } else {
                    onSectionChange(item.section);
                  }
                  if (isMobile) setIsExpanded(false);
                }}
              >
                <div
                  className={`${
                    location.pathname === item.path ? "text-teal-600" : ""
                  }`}
                >
                  {item.icon}
                </div>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showLogoutPopup && (
        <LogoutPopup
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutPopup(false)}
        />
      )}

      {isExpanded && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

Dsidebar.propTypes = {
  onSectionChange: PropTypes.func.isRequired,
};

export default Dsidebar;

// import { useState, useEffect, useContext } from "react";
// import PropTypes from "prop-types";
// import { Menu, SquarePen, Users, Settings, LogOut, X } from "lucide-react";
// import LogoutPopup from "./DLogoutPopup";
// import { AuthContext } from "../../context/AuthContext";
// import { NavLink, useLocation } from "react-router-dom";

// const Dsidebar = ({ onSectionChange }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [showLogoutPopup, setShowLogoutPopup] = useState(false);
//   const location = useLocation();

//   const { logout } = useContext(AuthContext);

//   const handleLogoutConfirm = () => {
//     logout();
//     window.location.href = "/";
//   };

//   const handleLogout = () => {
//     setShowLogoutPopup(true);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);
//       setIsExpanded(!mobile);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const sidebarItems = [
//     {
//       label: "View / Update Profile",
//       icon: <SquarePen size={20} />,
//       section: "profile",
//       path: "/dashboard/profile",
//       group: "MAIN",
//     },
//     {
//       label: "Appointments",
//       icon: <Users size={20} />,
//       section: "appointment",
//       path: "/dashboard/appointments",
//       group: "MAIN",
//     },
//     {
//       label: "Settings",
//       icon: <Settings size={20} />,
//       section: "settings",
//       path: "/dashboard/settings",
//       group: "ADMINISTRATION",
//     },
//   ];

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isMobile && isExpanded && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsExpanded(false)}
//         />
//       )}

//       {/* Top mobile menu toggle */}
//       {isMobile && (
//         <div className="bg-white p-4 shadow-md sticky top-0 z-50">
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <Menu size={24} />
//           </button>
//         </div>
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white text-gray-700 p-5 z-50 border-r-2 border-slate-300 transition-transform duration-300 ease-in-out
//         ${
//           isExpanded ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 md:relative`}
//       >
//         {/* Close button for mobile */}
//         {isMobile && (
//           <button
//             className="absolute top-4 right-4 md:hidden"
//             onClick={() => setIsExpanded(false)}
//           >
//             <X size={24} />
//           </button>
//         )}

//         {["MAIN", "ADMINISTRATION"].map((section) => (
//           <div key={section} className="mb-4">
//             <h3 className="text-gray-400 uppercase text-sm mb-2">{section}</h3>
//             {sidebarItems
//               .filter((item) => item.group === section)
//               .map((item) => (
//                 <NavLink
//                   key={item.label}
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 py-2 px-3 w-full text-left rounded transition-all duration-200 ${
//                       isActive
//                         ? "bg-gray-100 text-teal-600"
//                         : "hover:bg-gray-100"
//                     }`
//                   }
//                   onClick={() => {
//                     onSectionChange(item.section);
//                     if (isMobile) setIsExpanded(false);
//                   }}
//                 >
//                   {item.icon}
//                   {item.label}
//                 </NavLink>
//               ))}
//           </div>
//         ))}

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 py-2 px-3 w-full text-left rounded hover:bg-gray-200 text-red-400 mt-4 transition-all duration-200"
//         >
//           <LogOut size={20} /> Logout
//         </button>
//       </div>

//       {/* Logout popup */}
//       {showLogoutPopup && (
//         <LogoutPopup
//           onConfirm={handleLogoutConfirm}
//           onCancel={() => setShowLogoutPopup(false)}
//         />
//       )}
//     </>
//   );
// };

// Dsidebar.propTypes = {
//   onSectionChange: PropTypes.func.isRequired,
// };

// export default Dsidebar;
