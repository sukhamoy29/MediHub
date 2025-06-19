import React, { useState } from "react";

export default function SecurityPasswordChange({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isLongEnough = password.length >= 8;

    if (!isLongEnough) return "Password must be at least 8 characters.";
    if (!hasUpperCase) return "Add at least one uppercase letter.";
    if (!hasNumber) return "Add at least one number.";
    if (!hasSpecialChar) return "Add at least one special character.";
    return "Strong ✅";
  };

  // Validate before saving changes
  const handleSaveChanges = () => {
    let newErrors = {};

    if (!currentPassword)
      newErrors.currentPassword = "Current password is required.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    else if (passwordStrength !== "Strong ✅")
      newErrors.newPassword = "Please enter a strong password.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm password is required.";
    else if (newPassword !== confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Password changed successfully!");
      onClose();
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center bg-auto bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-lg p-6 w-[500px] shadow-lg">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-semibold">Change Password</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl"
          >
            &times;
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Enter your current password and a new password to update your
          credentials.
        </p>

        {/* Current Password */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setErrors({ ...errors, currentPassword: "" });
            }}
            className="w-full border rounded-md p-3 mt-1"
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setPasswordStrength(checkPasswordStrength(e.target.value));
              setErrors({ ...errors, newPassword: "" });
            }}
            className="w-full border rounded-md p-3 mt-1"
          />
          {passwordStrength && (
            <p
              className={`text-sm mt-1 ${
                passwordStrength === "Strong ✅"
                  ? "text-green-600"
                  : "text-orange-500"
              }`}
            >
              {passwordStrength}
            </p>
          )}
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            className="w-full border rounded-md p-3 mt-1"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveChanges}
            className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  ) : null;
}
