import { useState } from "react";

const Notification = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    appointmentUpdates: true,
    paymentNotifications: false,
    systemNotifications: false,
  });

  const [pushNotifications, setPushNotifications] = useState({
    appointmentUpdates: true,
    paymentNotifications: false,
    systemNotifications: true,
  });

  // const [quietHours, setQuietHours] = useState({
  //   start: "10:00 PM",
  //   end: "7:00 AM",
  // });

  const toggleEmailNotification = (type) => {
    setEmailNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const togglePushNotification = (type) => {
    setPushNotifications((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    // < className="flex h-screen bg-gray-100 ">
    <div className="flex-1 max-w-7xl mx-4 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold">Notification Preferences</h2>
      <p className="text-gray-500">
        Manage how you receive notifications and alerts
      </p>

      {/* Email Notifications */}
      <div className="mt-6 border-b pb-4">
        <h3 className="text-lg font-semibold">Email Notifications</h3>
        <div className="space-y-4 mt-2">
          {Object.keys(emailNotifications).map((key) => (
            <div key={key} className="flex justify-between items-center">
              <div className="w-2/3">
                <h4 className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </h4>
                <p className="text-gray-500 text-sm">
                  Receive notifications about{" "}
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={emailNotifications[key]}
                  onChange={() => toggleEmailNotification(key)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition ${
                    emailNotifications[key] ? "bg-black" : "bg-gray-300"
                  } peer-disabled:bg-gray-200 relative`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                      emailNotifications[key] ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="mt-6 border-b pb-4">
        <h3 className="text-lg font-semibold">Push Notifications</h3>
        <div className="space-y-4 mt-2">
          {Object.keys(pushNotifications).map((key) => (
            <div key={key} className="flex justify-between items-center">
              <div className="w-2/3">
                <h4 className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </h4>
                <p className="text-gray-500 text-sm">
                  Receive push notifications about{" "}
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={pushNotifications[key]}
                  onChange={() => togglePushNotification(key)}
                />
                <div
                  className={`w-11 h-6 rounded-full transition ${
                    pushNotifications[key] ? "bg-black" : "bg-gray-300"
                  } peer-disabled:bg-gray-200 relative`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                      pushNotifications[key] ? "translate-x-5" : ""
                    }`}
                  ></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Schedule */}
      {/* <div className="mt-6">
        <h3 className="text-lg font-semibold">Notification Schedule</h3>
        <p className="text-gray-800 font-medium text-sm mb-5 mt-4">
          Quiet Hours
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <select
              value={quietHours.start}
              onChange={(e) =>
                setQuietHours({ ...quietHours, start: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2  focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>8:00 PM</option>
              <option>9:00 PM</option>
              <option>10:00 PM</option>
              <option>11:00 PM</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
            <select
              value={quietHours.end}
              onChange={(e) =>
                setQuietHours({ ...quietHours, end: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option>6:00 AM</option>
              <option>7:00 AM</option>
              <option>8:00 AM</option>
              <option>9:00 AM</option>
            </select>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2">
          During quiet hours, you will only receive critical notifications.
        </p>
      </div> */}
    </div>
  );
};

export default Notification;
