import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";

const NotificationList = ({
  notifications,
  setNotifications,
  onActionClick,
}) => {
  // ✅ Mark notification as read & update localStorage
  const handleMarkAsRead = (id) => {
    const updatedNotifications = notifications.map((notif) =>
      notif.id === id ? { ...notif, isUnread: false } : notif
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  // ✅ Remove notification & update localStorage
  const handleDismiss = (id) => {
    const updatedNotifications = notifications.filter(
      (notif) => notif.id !== id
    );
    setNotifications(updatedNotifications);
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications));
  };

  return (
    <div>
      {notifications.length === 0 ? (
        <p className="text-gray-500 text-center py-4 text-lg font-medium">
          No notifications
        </p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={handleMarkAsRead}
            onDismiss={handleDismiss}
            onActionClick={onActionClick} // Pass the action click handler
          />
        ))
      )}
    </div>
  );
};

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      isUnread: PropTypes.bool.isRequired,
    })
  ).isRequired,
  setNotifications: PropTypes.func.isRequired,
  onActionClick: PropTypes.func.isRequired,
};

export default NotificationList;
