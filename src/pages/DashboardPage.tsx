import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';

const DashboardPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const appAccessToken = userContext?.accessToken;
    const userUUID = userContext?.userUUID;

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (appAccessToken && userUUID) {
            fetchUserCalendarEvents(appAccessToken, userUUID, currentWeekStartDate);
        }
    }, [appAccessToken, userUUID, currentWeekStartDate]);

    const fetchUserCalendarEvents = (token: string, userId: string, startDate: Date) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        
        const calendarApiEndpoint = `${apiUrl}/events/user?user_id=${userId}&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}`;
        
        fetch(calendarApiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Error fetching Google access token.');
                return response.json();
            })
            .then(data => {
                setGoogleAccessToken(data.googleAccessToken);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.log(error.message);
            });
    };

    return (
        <div className="dashboard-page">
            <h1>Welcome to the Dashboard</h1>
            <p>This is your dashboard, from here you can manage your application's main features.</p>
            {isLoading ? <p>Loading...</p> : (
                googleAccessToken ? 
                <GoogleCalendarWeekly 
                    accessToken={googleAccessToken}
                    weekStartDate={currentWeekStartDate}
                    onChangeWeek={setCurrentWeekStartDate}
                /> 
                :
                <p>Unable to connect to Google Calendar</p>
            )}
        </div>
    );
};

export default DashboardPage;
