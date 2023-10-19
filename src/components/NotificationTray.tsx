import { useState } from 'react';

function NotificationTray() {
    const [filterType, setFilterType] = useState('');

    return (
        <div>
            <h2>Notification Tray</h2>
            <div>
                <button onClick={() => setFilterType('scheduled')}>Scheduled</button>
                <button onClick={() => setFilterType('reschedule')}>Reschedule</button>
                <button onClick={() => setFilterType('pending')}>Pending</button>
                <button onClick={() => setFilterType('')}>All</button>
            </div>
            <ul>
                {/* This is just a placeholder for the empty tray */}
            </ul>
        </div>
    );
}

export default NotificationTray;
