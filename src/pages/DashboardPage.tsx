// pages/DashboardPage.tsx

import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';

const DashboardPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const appAccessToken = userContext?.accessToken;
    const userUUID = userContext?.userUUID;

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [calendarEvents, setCalendarEvents] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        console.log("in useEffect, appAccessToken: ", appAccessToken);
        if (appAccessToken && userUUID) {
            fetchUserCalendarEvents(appAccessToken, userUUID, currentWeekStartDate);
        }
    }, [appAccessToken, userUUID, currentWeekStartDate]);    

    const fetchUserCalendarEvents = (token: string, userId: string, startDate: Date) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        const calendarApiEndpoint = `${apiUrl}/calendar/events/user?user_id=${userId}&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}`;


        fetch(calendarApiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Fetching calendar events response:', response.status);
            if (!response.ok) throw new Error('Error fetching Google calendar events.');
            return response.json();
        })
        .then(data => {
            console.log('Calendar events data:', data);
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
            <h1>Welcome to the Dashboard</h1>
            <p>This is your dashboard, from here you can manage your application's main features.</p>
            {isLoading ? <p>Loading...</p> : (
                calendarEvents ? 
                <GoogleCalendarWeekly 
                    events={calendarEvents}
                    weekStartDate={currentWeekStartDate}
                    onChangeWeek={setCurrentWeekStartDate}
                /> 
                :
                <ConnectGoogleCalendarButton />
            )}
        </div>
    );
};

export default DashboardPage;
