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
import { startOfWeek } from 'date-fns';

interface ApiError {
  message: string;
  code: number;
}

const isApiError = (error: unknown): error is ApiError => {
  return typeof error === 'object' && error !== null && 'message' in error;
};

const fetchUserCalendarEvents = async (
  userId: string,
  startDate: Date
): Promise<GoogleCalendarEventData[]> => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const calendarApiEndpoint = `${apiUrl}/calendar/events/user?userId=${userId}&start_time=${startDate.toISOString()}&end_time=${endDate.toISOString()}`;

  try {
    const response =
      await axios.get<GoogleCalendarEventData[]>(calendarApiEndpoint);
    return response.data;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error) && error.response) {
      throw {
        message: error.response.data.message,
        code: error.response.status,
      } as ApiError;
    }
    throw error;
  }
};

const DashboardPage: React.FC = () => {
  const { userUUID } = useUserContext();
  const now = new Date();
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(
    startOfWeek(now)
  );
  // Add state to track the selected view (week or month)
  const [selectedView, setSelectedView] = useState<'Week' | 'Day'>('Day');

  const {
    data: calendarEvents,
    isLoading,
    isError,
    error,
  } = useQuery(
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
        <div className="d-flex spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="dashboard-page">
          <div className="dashboard-content ">
            <NotificationTray />
            <div className="calendar-container">
              {isError && (
                <div
                  className="alert alert-danger alert-dismissible fade show m-3 "
                  role="alert"
                >
                  {isApiError(error) &&
                    `Error code: ${error.code} | Message: ${error.message}`}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )}
              {/* {!isError && calendarEvents&& calendarEvents.length === 0 &&  (
              <div className="alert alert-info alert-dismissible fade show m-3 "role="alert">No calendar events found
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
              )} */}
              <div className="controls-container">
                <SegmentedControl
                  selectedView={selectedView}
                  setSelectedView={setSelectedView}
                />
                <div style={{ marginRight: 'auto' }}></div>
                {isError && <ConnectGoogleCalendarButton />}
              </div>
              {calendarEvents && (
                <>
                  {selectedView === 'Week' && (
                    <GoogleCalendarWeekly
                      events={calendarEvents}
                      weekStartDate={currentWeekStartDate}
                      onChangeWeek={(date) => setCurrentWeekStartDate(date)}
                    />
                  )}
                  {selectedView === 'Day' && (
                    <GoogleCalendarMonthly events={calendarEvents} />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;
