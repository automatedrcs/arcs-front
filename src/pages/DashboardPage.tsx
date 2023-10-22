import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import NotificationTray from '../components/NotificationTray';
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const userUUID = userContext?.userUUID;
    const now = new Date();
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date(now.setDate(now.getDate() - now.getDay())));

    const [calendarEvents, setCalendarEvents] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    useEffect(() => {
        if (userUUID) {
            fetchUserCalendarEvents(userUUID, currentWeekStartDate);
        }
    }, [userUUID, currentWeekStartDate]);    

    const fetchUserCalendarEvents = (userId: string, startDate: Date) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        const calendarApiEndpoint = `${apiUrl}/calendar/events/user?user_id=${userId}&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}`;
        fetch(calendarApiEndpoint)
        .then(response => {
            if (!response.ok) throw new Error('Error fetching Google calendar events.');
            return response.json();
        })
        .then(data => {
            setCalendarEvents(data);
            setIsLoading(false);
        })
        .catch(error => {
            console.log('Error fetching calendar events:', error.message);
            setIsLoading(false);
        });
    };
    
    return (
        <div className="dashboard-page">
            {isLoading ? <p>Loading...</p> : (
                <div className="dashboard-content">
                    <NotificationTray />
                    {calendarEvents ? 
                    <GoogleCalendarWeekly 
                        events={calendarEvents}
                        weekStartDate={currentWeekStartDate}
                        onChangeWeek={date => setCurrentWeekStartDate(date)}
                    />
                    :
                    <ConnectGoogleCalendarButton />
                    }
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
