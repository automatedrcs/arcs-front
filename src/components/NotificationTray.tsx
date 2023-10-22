// components/NotificationTray.tsx
function NotificationTray() {
    return (
        <div className="notification-tray">
            <h2>Notifications</h2>
            <div className="notification-buttons">
                <button>Scheduled</button>
                <button>Reschedule</button>
                <button>Pending</button>
                <button>All</button>
            </div>
            <ul>
                {/* This is just a placeholder for the empty tray */}
            </ul>
        </div>
    );
}

export default NotificationTray;
