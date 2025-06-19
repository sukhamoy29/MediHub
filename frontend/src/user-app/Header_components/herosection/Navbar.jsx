import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, UserCircle, ChevronDown } from "lucide-react";
import pngegg from "../../assets/pngegg.png";
import { navItems } from "../../constants";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logout } = useContext(AuthContext);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    window.location.reload(); // or navigate to "/"
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-gradient-to-r from-slate-700 via-gray-700 to-neutral-700 sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img className="h-10 w-10 mr-2" src={pngegg} alt="MediHub Logo" />
              <span className="text-2xl tracking-tight text-slate-100">
                MediHub
              </span>
            </Link>
          </div>

          {/* Nav Items */}
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={
                    item.label === "About"
                      ? "/about"
                      : item.label === "FAQ"
                      ? "/faq"
                      : item.href
                  }
                  className="text-slate-100 hover:text-zinc-300 text-lg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Section */}
          <div className="hidden lg:flex justify-center items-center">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  <UserCircle size={32} className="text-white" />
                  <ChevronDown size={16} className="text-white" />
                </div>
                {isDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg py-2 z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link
                      to="/Dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      View / Update Profile
                    </Link>
                    <Link
                      to="/DAppointmentHistory"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Appointments
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button
              onClick={toggleNavbar}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              {mobileDrawerOpen ? (
                <X color="#ffffff" size={24} />
              ) : (
                <Menu color="#ffffff" size={24} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <Link
                    to={
                      item.label === "About"
                        ? "/about"
                        : item.label === "FAQ"
                        ? "/faq"
                        : item.href
                    }
                    className="text-slate-200 hover:text-stone-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex mt-4">
              {user ? (
                <Link
                  to="/Dashboard"
                  className="text-white border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition"
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="text-white border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-black transition"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
