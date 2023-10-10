import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';

const DashboardPage: React.FC = () => {
    console.log("Rendering DashboardPage");

    const userContext = useContext(UserContext);
    const appAccessToken = userContext?.accessToken;

    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
    const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (appAccessToken) {
            setIsLoading(true);
            fetch(`${apiUrl}/getGoogleAccessToken`, {
                headers: {
                    'Authorization': `Bearer ${appAccessToken}`
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
        }
    }, [appAccessToken]);

    const handleGoogleAccessTokenError = () => {
        setGoogleAccessToken(null);
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
                    onError={handleGoogleAccessTokenError}
                /> 
                : 
                <ConnectGoogleCalendarButton />
            )}
        </div>
    );
};

export default DashboardPage;
