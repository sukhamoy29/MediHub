import PropTypes from "prop-types";
import NotificationActions from "./NotificationActions";

const NotificationItem = ({ notification, onMarkAsRead, onDismiss }) => {
  return (
    <div
      className={`flex justify-between items-start sm:items-center p-4 border-b ${
        notification.isUnread ? "bg-white" : "bg-gray-100"
      }`}
    >
      {/* Notification Content */}
      <div className="flex items-start gap-3 w-full pr-2">
        {/* 🔵 Blue Dot for Unread Messages */}
        {notification.isUnread && (
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 mt-1 bg-blue-500 rounded-full shrink-0"></span>
        )}

        <div className="flex-1">
          <h4 className="text-base sm:text-lg font-semibold text-gray-800">
            {notification.title}
          </h4>
          <p className="text-sm sm:text-base text-gray-600 mt-0.5">
            {notification.message}
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            {notification.timestamp}
          </p>
        </div>
      </div>

      {/* Actions Menu */}
      <div className="ml-2 shrink-0">
        <NotificationActions
          markAsRead={() => onMarkAsRead(notification.id)}
          dismissNotification={() => onDismiss(notification.id)}
          isUnread={notification.isUnread}
        />
      </div>
    </div>
  );
};

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    isUnread: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onMarkAsRead: PropTypes.func.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default NotificationItem;
