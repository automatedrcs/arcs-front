// pages/DashboardPage.tsx

import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import NotificationTray from '../components/NotificationTray'; // import NotificationTray component
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';

const DashboardPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const userUUID = userContext?.userUUID;

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [calendarEvents, setCalendarEvents] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("in useEffect, appAccessToken: ");
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
                <div className="dashboard-content"> {/* Wrapping div for the calendar and notification tray */}
                    {calendarEvents ? 
                    <GoogleCalendarWeekly 
                        events={calendarEvents}
                        weekStartDate={currentWeekStartDate}
                        onChangeWeek={setCurrentWeekStartDate}
                    /> 
                    :
                    <ConnectGoogleCalendarButton />
                    }
                    <NotificationTray /> {/* NotificationTray component */}
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
