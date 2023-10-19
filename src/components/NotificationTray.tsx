// components/NotificationTray.tsx
function NotificationTray() {
    // Removed filterType and setFilterType

    return (
        <div className="notification-tray">
            <h2>Notification Tray</h2>
            <div>
                {/* Removed the onClick handlers since they were setting filterType */}
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
