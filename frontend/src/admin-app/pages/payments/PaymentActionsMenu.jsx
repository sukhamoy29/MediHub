import PropTypes from "prop-types";
import { useState, useRef, useEffect } from "react";
import { FiEye, FiTrash2 } from "react-icons/fi";

const PaymentActionsMenu = ({ payment, onDelete, onView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = () => {
    setIsOpen(false);
    onDelete(payment.id);
  };

  const handleView = () => {
    setIsOpen(false);
    onView(payment);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="font-bold text-gray-600 hover:text-gray-800"
      >
        ⋮
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
        >
          <div className="py-1">
            <button
              onClick={handleView}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FiEye className="mr-2" /> View Details
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <FiTrash2 className="mr-2" /> Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

PaymentActionsMenu.propTypes = {
  payment: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default PaymentActionsMenu;
