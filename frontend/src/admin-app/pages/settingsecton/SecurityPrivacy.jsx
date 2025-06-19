import { useState } from "react";
import PropTypes from "prop-types";
import SecurityPasswordChange from "./SecurityPasswordChange";
import apiClient from "../../api/apiClient";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Button({ children, variant = "default", className = "", ...props }) {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium focus:outline-none transition";
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "outline", "destructive"]),
  className: PropTypes.string,
};

function Card({ children, className = "" }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
        checked ? "bg-slate-800" : "bg-gray-300"
      }`}
    >
      <span
        className={`transform transition ease-in-out duration-200 inline-block w-6 h-4 bg-white rounded-full ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function SecurityPrivacy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [twoFactor, setTwoFactor] = useState(false);
  const [activityLog, setActivityLog] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  // Added states for Delete Account section
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Added function for deleting account
  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      toast.error("You must be logged in to delete your account.");
      return;
    }
    toast.info("Deleting your account, please wait...");
    try {
      const response = await apiClient.delete("/api/delete-account");
      toast.success(
        response.data.message || "Your account has been deleted successfully."
      );
      localStorage.clear();
      window.location.href = "/";
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please log in again.");
        localStorage.clear();
        window.location.href = "/login";
      } else {
        toast.error(
          error.response?.data?.error ||
            "Failed to delete account. Please try again."
        );
      }
    }
  };

  return (
    <Card className="flex-1 max-w-7xl mx-0 bg-white p-4 rounded-lg shadow-md">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2 className="text-xl font-semibold">Security & Privacy</h2>
      <p className="text-sm text-gray-500 mb-4">
        Manage your security settings and privacy preferences
      </p>

      {/* Change Password */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Password</label>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Change Password
        </Button>
      </div>

      {/* Two-Factor Authentication */}
      {/* <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="block font-medium">
            Enable Two-Factor Authentication
          </label>
        </div>
        <ToggleSwitch checked={twoFactor} onChange={setTwoFactor} />
      </div>
      {twoFactor && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-200 rounded-lg">
          <p className="text-sm mb-2">Recovery Codes:</p>
          <div className="grid grid-cols-2 gap-2 text-sm font-mono">
            <span>ABCD-1234</span> <span>EFGH-5678</span>
            <span>IJKL-9812</span> <span>MNOP-3456</span>
            <span>QRST-7890</span> <span>UVWX-1234</span>
          </div>
          <Button className="mt-2 w-full">Download Codes</Button>
        </div>
      )} */}

      {/* Privacy Settings */}
      {/* <div className="mb-4">
        <label className="block font-medium mb-2">Profile Visibility</label>
        <select className="w-full p-2 border rounded-md">
          <option value="public">Public</option>
          <option value="staff" selected>
            Staff Only - Visible to staff members
          </option>
          <option value="private">Private - Only visible to you</option>
        </select>
      </div> */}

      {/* Activity Log & Data Sharing */}
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="block font-medium">Activity Log</label>
          <p className="text-sm text-gray-500">
            Keep a log of your account activity for security purposes
          </p>
        </div>
        <ToggleSwitch checked={activityLog} onChange={setActivityLog} />
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div>
          <label className="block font-medium">Data Sharing</label>
          <p className="text-sm text-gray-500">
            Allow anonymous usage data to be shared for system improvements
          </p>
        </div>
        <ToggleSwitch checked={dataSharing} onChange={setDataSharing} />
      </div>

      {/* Change Password Modal */}
      <SecurityPasswordChange
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Delete Account Section */}
      <div className="w-full sm:w-3/4 p-5 mt-8 border-t border-gray-300">
        <hr className="my-4" />
        <p>
          Are you sure? This will permanently delete your account. Once the
          deletion process begins, you won&apos;t be able to reactivate your
          account or retrieve any data or information.
        </p>
        <hr className="my-4" />
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete my account
        </button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md w-11/12 sm:w-1/3 text-center">
            <h3 className="text-xl font-semibold mb-2">
              Confirm Account Deletion
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
