import { useState, useEffect } from "react";
import {
  NotificationHeader,
  NotificationTabs,
  NotificationList,
} from "../components/notifications";

import sampleNotifications from "../components/notifications/notificationData";

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedFilter, setSelectedFilter] = useState("All Types");
  const [notifications, setNotifications] = useState(sampleNotifications);

  // ✅ Load notifications from localStorage or sample data on mount
  useEffect(() => {
    const storedNotifications = localStorage.getItem("notifications");
    if (storedNotifications && JSON.parse(storedNotifications).length > 0) {
      setNotifications(JSON.parse(storedNotifications));
    } else {
      setNotifications(sampleNotifications);
    }
  }, []);
  const filteredNotifications = [...notifications]
    .sort((a, b) => {
      if (a.isUnread !== b.isUnread) {
        return a.isUnread ? -1 : 1;
      }

      // 2️⃣ Sort by timestamp (latest first)
      return new Date(b.timestamp) - new Date(a.timestamp);
    })
    .filter((notif) => {
      const matchesTab =
        activeTab === "All" || (activeTab === "Unread" && notif.isUnread);
      const matchesCategory =
        selectedFilter === "All Types" || notif.category === selectedFilter;
      return matchesTab && matchesCategory;
    });

  // ✅ Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  // ✅ Filtering logic
  // const filteredNotifications = notifications.filter((notif) => {
  //   const matchesTab =
  //     activeTab === "All" || (activeTab === "Unread" && notif.isUnread);
  //   const matchesCategory =
  //     selectedFilter === "All Types" || notif.category === selectedFilter;
  //   return matchesTab && matchesCategory;
  // });

  // ✅ Mark all as read and update button logic

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map((notif) => ({
      ...notif,
      isUnread: false,
    }));
    setNotifications(updatedNotifications);
  };

  const handleActionClick = (notif) => {
    // Logic to handle action button click
    if (notif.isUnread) {
      // Show "Mark as Read" and "Dismiss"
    } else {
      // Show only "Dismiss"
    }
  };

  return (
    <div className="flex-col justify-between items-center bg-white p-2 shadow-md rounded-lg text-2xl">
      <NotificationHeader
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
        markAllAsRead={markAllAsRead}
        isMarkAllDisabled={filteredNotifications.every((n) => !n.isUnread)}
      />
      <div className="max-4xl-md mx-4 bg-white dark:bg-gray-50 p-6 rounded-lg shadow-lg mt-10 border-2 border-slate-200">
        <NotificationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <NotificationList
          notifications={filteredNotifications}
          setNotifications={setNotifications}
        />
      </div>
    </div>
  );
};

export default Notifications;
