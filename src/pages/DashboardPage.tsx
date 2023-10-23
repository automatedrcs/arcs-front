// pages/DashboardPage.tsx
import React, { useContext, useState, useEffect } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import GoogleCalendarMonthly from '../components/GoogleCalendarMonthly'; // Import the Monthly Calendar component
import NotificationTray from '../components/NotificationTray';
import { apiUrl } from '../config';
import { UserContext } from '../contexts/UserContext';
import { GoogleCalendarEventData } from '../types/GoogleTypes';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';
import './DashboardPage.css';

const DashboardPage: React.FC = () => {
    const userContext = useContext(UserContext);
    const userUUID = userContext?.userUUID;
    const now = new Date();
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date(now.setDate(now.getDate() - now.getDay())));

    // Initialize calendarEvents as an empty array with the correct type
    const [calendarEvents, setCalendarEvents] = useState<GoogleCalendarEventData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    
    // Add state to track the selected view (weekly or monthly)
    const [selectedView, setSelectedView] = useState<'weekly' | 'monthly'>('weekly');

    useEffect(() => {
        if (userUUID) {
            fetchUserCalendarEvents(userUUID, currentWeekStartDate);
        }
    }, [userUUID, currentWeekStartDate]);    

    const fetchUserCalendarEvents = (userId: string, startDate: Date) => {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        
        // Adjust the start time to include events that have occurred this week
        const adjustedStartDate = new Date(currentWeekStartDate);
        adjustedStartDate.setDate(adjustedStartDate.getDate() - 7);
        
        const calendarApiEndpoint = `${apiUrl}/calendar/events/user?user_id=${userId}&start_time=${adjustedStartDate.toISOString()}&end_time=${endDate.toISOString()}`;
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
                    <div className="calendar-switch">
                        {/* Add buttons to switch between weekly and monthly views */}
                        <button
                            className={selectedView === 'weekly' ? 'active' : ''}
                            onClick={() => setSelectedView('weekly')}
                        >
                            Weekly
                        </button>
                        <button
                            className={selectedView === 'monthly' ? 'active' : ''}
                            onClick={() => setSelectedView('monthly')}
                        >
                            Monthly
                        </button>
                    </div>
                    {selectedView === 'weekly' ? (
                        <GoogleCalendarWeekly 
                            events={calendarEvents}
                            weekStartDate={currentWeekStartDate}
                            onChangeWeek={date => setCurrentWeekStartDate(date)}
                        />
                    ) : (
                        <GoogleCalendarMonthly
                            events={calendarEvents}
                        />
                    )}
                </div>
            )}
            {/* Display ConnectGoogleCalendarButton if calendarEvents is empty */}
            {calendarEvents.length === 0 && (
                <div className="connect-calendar-button">
                    <ConnectGoogleCalendarButton />
                </div>
            )}
        </div>
    );
}

export default DashboardPage;
