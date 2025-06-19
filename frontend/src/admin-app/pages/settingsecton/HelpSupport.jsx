import {
  FiMail,
  FiHelpCircle,
  FiGlobe,
  FiFileText,
  FiInfo,
} from "react-icons/fi";

const HelpSupport = () => {
  return (
    <div className="max-4xl-md mx-4 bg-white dark:bg-gray-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-900">
        Help & Support
      </h2>
      <p className="text-gray-900 dark:text-gray-900">
        Get help and find resources for using the system
      </p>

      {/* Documentation Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
          Documentation
        </h3>
        <div className="mt-2 space-y-2">
          {[
            { name: "User Guide", icon: <FiGlobe /> },
            { name: "Administrator Manual", icon: <FiFileText /> },
            { name: "FAQ", icon: <FiInfo /> },
          ].map((doc) => (
            <button
              key={doc.name}
              className="w-full flex items-center p-3 border hover:bg-gray-100 border-gray-300 rounded-lg text-left text-gray-900 dark:text-gray-900 bg-white dark:bg-gray-100 cursor-pointer"
            >
              <span className="text-xl text-gray-900 dark:text-gray-900 mr-3">
                {doc.icon}
              </span>
              {doc.name}
            </button>
          ))}
        </div>
      </div>

      {/* Contact Support Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-900">
          Contact Support
        </h3>
        <div className="mt-2 space-y-3">
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-100 rounded-lg">
            <FiMail className="text-blue-600 dark:text-blue-400 text-2xl mr-3" />
            <div>
              <p className="text-gray-900 dark:text-gray-900 font-medium">
                Email Support
              </p>
              <p className="text-sm text-gray-900 dark:text-gray-900">
                Send an email to our support team for assistance
              </p>
              <div className="mt-1 p-2 bg-white dark:bg-gray-100 hover:bg-gray-100 rounded-md text-gray-900 dark:text-gray-900 border border-gray-400 dark:border-gray-500 cursor-pointer">
                support@medihub.com
              </div>
            </div>
          </div>
          <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-100 rounded-lg">
            <FiHelpCircle className="text-blue-600 dark:text-blue-400 text-2xl mr-3" />
            <div>
              <p className="text-gray-900 dark:text-gray-900 font-medium">
                Help Desk
              </p>
              <p className="text-sm text-gray-800 dark:text-gray-900">
                Submit a ticket to our help desk for technical issues
              </p>
              <button className="mt-2 bg-black text-white p-2 rounded-md cursor-pointer">
                Open Help Desk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status Section */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          System Status
        </h3>
        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-300 rounded-lg">
          <p className="text-sm flex items-center text-gray-900 dark:text-gray-100">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            All Systems Operational
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            Last checked: Today at 10:45 AM
          </p>
          <button className="mt-2 border p-2 rounded-md text-gray-900 dark:text-gray-100 hover:bg-gray-200 cursor-pointer">
            View Status Page
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default HelpSupport;
