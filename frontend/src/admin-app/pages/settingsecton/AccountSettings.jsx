import { useState } from "react";

const AccountSettings = () => {
  const [language, setLanguage] = useState("English (India)");
  const [timezone, setTimezone] = useState("Indian Standard Time (IST)");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12-hour");
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="max-w-7xl mx-4 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Account Settings</h2>
      <p className="text-gray-500">
        Manage your account preferences and settings
      </p>
      {/* Language & Timezone Section */}
      <div className="grid grid-cols-2 gap-6 mt-4">
        {/* Language Dropdown */}
        <div>
          <label className="block text-sm font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option>English (India)</option>
            <option>English (UK)</option>
            <option>Bengali</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Timezone Dropdown */}
        <div>
          <label className="block text-sm font-medium">Timezone</label>
          <select
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1"
          >
            <option>Indian Standard Time (IST)</option>
            <option>International Time (UTC)</option>
          </select>
        </div>
      </div>
      {/* Date Format Section */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Date Format</label>
        <div className="flex flex-col space-y-2 mt-1">
          {["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"].map((format) => (
            <label key={format} className="flex items-center space-x-2">
              <input
                type="radio"
                value={format}
                checked={dateFormat === format}
                onChange={(e) => setDateFormat(e.target.value)}
              />
              <span>{format}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Time Format Section */}
      <div className="mt-4">
        <label className="block text-sm font-medium">Time Format</label>
        <div className="flex flex-col space-y-2 mt-1">
          {["12-hour", "24-hour"].map((format) => (
            <label key={format} className="flex items-center space-x-2">
              <input
                type="radio"
                value={format}
                checked={timeFormat === format}
                onChange={(e) => setTimeFormat(e.target.value)}
              />
              <span>
                {format === "12-hour" ? "12-hour (1:30 PM)" : "24-hour (13:30)"}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Delete Account Button */}
      <div className="mt-6 border-t pt-4">
        <button
          className="text-red-600 border border-red-500 px-4 py-2 rounded-lg hover:bg-red-200"
          onClick={() => setShowConfirm(true)}
        >
          Delete Account
        </button>
      </div>
      {/* Confirmation Popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/20 bg-opacity-30 backdrop-blur-sm"></div>
          <div className="bg-white p-6 rounded-lg shadow-lg z-10">
            <h2 className="text-lg font-semibold">Confirm Deletion</h2>
            <p>
              {" "}
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="mr-3 px-6 py-2 bg-gray-100 border border-zinc-500 rounded cursor-pointer hover:bg-gray-300"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 text-red-600 border border-red-500 rounded hover:bg-red-100 cursor-pointer"
                // onClick={onConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
