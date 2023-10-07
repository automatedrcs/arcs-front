import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { apiUrl } from '../config';
import { JSONObject } from '../types/JsonTypes';
import { UserContext } from '../contexts/UserContext';

interface Notification {
    id: string; // adjust the type if needed
    type: string;
    data: JSONObject; // you might want to specify a more detailed type here
    // add other fields if necessary
  }
  
function NotificationTray() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [filterType, setFilterType] = useState('');
    const userContext = useContext(UserContext);

    useEffect(() => {
        // Fetch all notifications for the logged-in user from the backend
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(apiUrl + '/notification', {
                    params: {
                        user_id:userContext?.userUUID, 
                        organization_id: userContext?.organizationId 
                    }
                });
                if (response.data && Array.isArray(response.data)) {
                    setNotifications(response.data as Notification[]);
                } else {
                console.error('Unexpected data structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching notifications:', error);
            }
        };
    
        fetchNotifications();
    }, [filterType, userContext?.userUUID, userContext?.organizationId]);

  const filteredNotifications = notifications.filter(notification => {
    if (filterType) {
      return notification.type === filterType;
    }
    return true;
  });

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
        {filteredNotifications.map(notification => (
          <li key={notification.id}>
            Type: {notification.type} | Data: {JSON.stringify(notification.data)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationTray;
