// components/NotificationTray.tsx
import React, { useState } from 'react'
import './NotificationTray.css'

const NotificationTray : React.FC = ({}) => {

    const [selectedNotificationView, setSelectedNotificationView] = useState('All')

  return (
    <div className="notification-tray-container">
            <h3 className="text-secondary pt-3">Notifications</h3>
            <div className="btn-group ps-3 pe-3">
                <button
                className={selectedNotificationView === 'All' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
                onClick={() => setSelectedNotificationView('All')}
                >
                All
                </button>
                <button
                className={selectedNotificationView === 'Scheduled' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
                onClick={() => setSelectedNotificationView('Scheduled')}
                >
                Scheduled
                </button>
                <button
                className={selectedNotificationView === 'Pending' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
                onClick={() => setSelectedNotificationView('Pending')}
                >
                Pending
                </button>
                <button
                className={selectedNotificationView === 'Rescheduled' ? 'btn btn-outline-primary active' : 'btn btn-outline-primary'}
                onClick={() => setSelectedNotificationView('Rescheduled')}
                >
                Rescheduled
                </button>
            </div>
    </div>
  )
}

export default NotificationTray
