import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const NotificationActions = ({ markAsRead, dismissNotification, isUnread }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownDirection, setDropdownDirection] = useState(null);
  const menuRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Effect to determine dropdown direction (up or down)
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const direction = spaceBelow < 160 && spaceAbove > 160 ? "up" : "down";
      setDropdownDirection(direction);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* ⋮ Button */}
      <button
        className="text-gray-500 hover:text-gray-700 font-semibold text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        ⋮
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 ${
            dropdownDirection === "up" ? "bottom-full mb-2" : "mt-2"
          }`}
        >
          <ul className="py-1 text-sm font-medium text-gray-700">
            {isUnread && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  markAsRead();
                  setIsOpen(false);
                }}
              >
                Mark as read
              </li>
            )}

            <li
              className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                dismissNotification();
                setIsOpen(false);
              }}
            >
              Dismiss
            </li>
            {!isUnread && (
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  markAsRead();
                  setIsOpen(false);
                }}
              >
                Mark as read
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
NotificationActions.propTypes = {
  markAsRead: PropTypes.func.isRequired,
  dismissNotification: PropTypes.func.isRequired,
  isUnread: PropTypes.bool.isRequired,
};

export default NotificationActions;
