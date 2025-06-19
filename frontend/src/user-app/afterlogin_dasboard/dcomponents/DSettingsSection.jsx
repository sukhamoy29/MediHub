import { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";

const DSettingsSection = () => {
  const { user } = useContext(AuthContext);

  const [active, setActive] = useState("Change password");
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const menuItems = ["Change password", "Delete account"];

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });

    if (name === "new") {
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!strongPasswordRegex.test(value)) {
        setPasswordError(
          "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character."
        );
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmitPassword = async () => {
    if (password.new !== password.confirm) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    try {
      const response = await api.post(
        "/change-password",
        {
          current_password: password.current,
          new_password: password.new,
          confirm_password: password.confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
          },
        }
      );
      toast.success(response.data.message || "Password changed successfully.");
      setPassword({ current: "", new: "", confirm: "" });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        toast.error(error.response.data.detail);
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/delete-account", {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      });
      localStorage.clear();
      toast.success("Your account has been deleted successfully.");
      window.location.href = "/";
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-[500px] bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full lg:w-64 bg-white shadow-md p-4">
        <h2 className="text-2xl text-center font-bold mb-4">Settings</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              className={`cursor-pointer p-2 rounded-md ${
                active === item
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              } hover:bg-gray-200`}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">{active}</h2>

        {/* Change Password Section */}
        {active === "Change password" && (
          <div className="mt-4">
            <label className="block mb-2">Current Password</label>
            <input
              type="password"
              name="current"
              value={password.current}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-md mb-4"
            />

            <label className="block mb-2">New Password</label>
            <input
              type="password"
              name="new"
              value={password.new}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-md mb-2"
            />
            {passwordError && (
              <p className="text-red-500 text-sm mb-4">{passwordError}</p>
            )}

            <label className="block mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={password.confirm}
              onChange={handlePasswordChange}
              className="w-full p-2 border rounded-md mb-4"
            />

            <button
              onClick={handleSubmitPassword}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        )}

        {/* Delete Account Section */}
        {active === "Delete account" && (
          <div className="w-full sm:w-3/4 p-5">
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
        )}
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
    </div>
  );
};

export default DSettingsSection;
