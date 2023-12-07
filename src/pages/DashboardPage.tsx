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
    code: number;
  }

  const isApiError = (error: unknown): error is ApiError => {
    return typeof error === 'object' && error !== null && 'message' in error;
  };

const fetchUserCalendarEvents = async (userId: string, startDate: Date) : Promise<GoogleCalendarEventData[]> => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const adjustedStartDate = new Date(startDate);
    adjustedStartDate.setDate(adjustedStartDate.getDate() - 7);
  
    const calendarApiEndpoint = `${apiUrl}/calendar/events/user?userId=${userId}&start_time=${adjustedStartDate.toISOString()}&end_time=${endDate.toISOString()}`;

    try {
        const response = await axios.get<GoogleCalendarEventData[]>(calendarApiEndpoint)
        return response.data
    } catch (error){
        if (isAxiosError(error) && error.response) {
            throw {message: error.response.data.message || 'An error occurred', code: error.response.status} as ApiError;
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
      <> 
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
        ) : 
        (
        <div className="dashboard-page">
          <div className="dashboard-content">
            <NotificationTray />
            <div className="calendar-container">
              {isError && (
              <div className="alert alert-danger alert-dismissible fade show m-3 "role="alert">{isApiError(error) && error.code === 403 && error.message}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              )}
              {isError && isApiError(error) && error.code === 404 &&  (
              <div className="alert alert-info alert-dismissible fade show m-3 "role="alert">No calendar events found
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              )}
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
        </div>
         )}
      </>
    );
}

export default DashboardPage;
