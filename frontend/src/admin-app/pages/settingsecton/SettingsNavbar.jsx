import { useState } from "react";
import { FiSave, FiCheckCircle } from "react-icons/fi";

const SettingsNavbar = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true); // Show loading state

    // Delay before showing the message
    setTimeout(() => {
      setMessage("Settings saved successfully");
      setLoading(false);

      // Hide message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }, 1000); // Delay before showing message
  };

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-lg font-semibold">Settings</h2>
        <button
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition cursor-pointer"
          onClick={handleSave}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <span className="animate-spin border-t-2 border-white border-solid rounded-full h-4 w-4"></span>
          ) : (
            <FiSave />
          )}
          Save Changes
        </button>
      </div>

      {/* Success Message */}
      {message && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center">
          <FiCheckCircle className="mr-2" />
          {message}
        </div>
      )}
    </div>
  );
};

export default SettingsNavbar;
