// components/LogoutPopup.js
import PropTypes from "prop-types";

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Are you sure you want to log out of your account?
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This action will end your current session and redirect you to the login page.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

LogoutPopup.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default LogoutPopup;
