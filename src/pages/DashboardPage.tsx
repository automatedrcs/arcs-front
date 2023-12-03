// pages/DashboardPage.tsx
import React, { useState } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import GoogleCalendarMonthly from '../components/GoogleCalendarMonthly'; // Import the Monthly Calendar component
import NotificationTray from '../components/NotificationTray';
import { apiUrl } from '../config';
import { useUserContext } from '../contexts/UserContext';
import { GoogleCalendarEventData } from '../types/GoogleTypes';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';
import './DashboardPage.css';
import axios, { isAxiosError } from 'axios';
import { useQuery } from 'react-query';
import SegmentedControl from '../components/SegmentedControl';
import { auto } from "@popperjs/core";

interface ApiError {
    message: string;
  }

  const isApiError = (error: unknown): error is ApiError => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

const fetchUserCalendarEvents = async (userId: string, startDate: Date) : Promise<GoogleCalendarEventData[]> => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() - 7);
  
    const calendarApiEndpoint = `${apiUrl}/calendar/events/user?user_id=${userId}&start_time=${adjustedStartDate.toISOString()}&end_time=${endDate.toISOString()}`;

    try {
        const response = await axios.get<GoogleCalendarEventData[]>(calendarApiEndpoint)
        return response.data
    } catch (error){
        if (isAxiosError(error) && error.response) {
            throw {message: error.message || 'An error occurred'} as ApiError;
        }
        throw error
    }
  };
  


const DashboardPage: React.FC = () => {
    const { userUUID } = useUserContext()
    const now = new Date();
    const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date(now.setDate(now.getDate() - now.getDay())));
    // Add state to track the selected view (week or month)
    const [selectedView, setSelectedView] = useState<'Week' | 'Day'>('Day');

    const {data: calendarEvents, isLoading, isError, error} = useQuery(
        ['calendarEvents', userUUID, currentWeekStartDate],
        () => fetchUserCalendarEvents(userUUID!, currentWeekStartDate),
        {
            enabled: !!userUUID,
            initialData: [],
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
        }
    );
    
    return (
        <div className="dashboard-page">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {isApiError(error) ? error.message : 'An uknown error occureed'}</p>
        ) : (
          <div className="dashboard-content">
            <NotificationTray />
            <div className="calendar-container">
              <div className="controls-container">
                <SegmentedControl 
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
              />
              <div style={{marginRight:auto}}></div>
              {calendarEvents && calendarEvents.length === 0 && (
                  <ConnectGoogleCalendarButton />
              )}
            </div>
            {calendarEvents && (
            <>
              {selectedView === 'Week' && (
                <GoogleCalendarWeekly 
                  events={calendarEvents}
                  weekStartDate={currentWeekStartDate}
                  onChangeWeek={date => setCurrentWeekStartDate(date)}
                />
              )}
              {selectedView === 'Day' && (
                <GoogleCalendarMonthly
                  events={calendarEvents}
                />
              )}
            </>
            )}
            </div>
          </div>
        )}
      </div>
    );
}

export default DashboardPage;
