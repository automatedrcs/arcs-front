// components/GoogleCalendarWeekly.tsx
import React, { useState, useEffect } from 'react';
import { CalendarEvent, GoogleCalendarWeeklyProps } from '../types/GoogleTypes';
import ConnectGoogleCalendarButton from './ConnectGoogleCalendarButton';
import { apiUrl } from '../config';

const GoogleCalendarWeekly: React.FC<GoogleCalendarWeeklyProps> = ({ accessToken, weekStartDate, onChangeWeek, onError }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (accessToken) {
      fetchUserCalendarEvents(accessToken, weekStartDate);
    }
  }, [accessToken, weekStartDate]);

  const fetchUserCalendarEvents = (token: string, startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const calendarApiEndpoint = `${apiUrl}/calendar/v3/calendars/primary/events?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}`;
    
    fetch(calendarApiEndpoint, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(calendarData => {
      if (calendarData.items && Array.isArray(calendarData.items)) {
        setEvents(calendarData.items);
      }
    })
    .catch(error => {
      console.error('Failed to fetch Google Calendar data:', error);
      setError("Failed to load calendar data");
      if (error.message === 'Network response was not ok') {
        onError();
      }
    });
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(weekStartDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    onChangeWeek(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(weekStartDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    onChangeWeek(newStartDate);
  };

  return (
    <div className="google-calendar-weekly">
    {error ? (
          <>
              <p>{error}</p>
              <ConnectGoogleCalendarButton />
          </>
      ) : (
        <>
          <div className="week-navigation">
            <button onClick={handlePreviousWeek}>Previous</button>
            <span>{weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            <button onClick={handleNextWeek}>Next</button>
          </div>
          {events.map(event => (
            <div key={event.id} className="event">
                <h4>{event.summary}</h4>
                <p>Start: {new Date(event.start.dateTime).toLocaleString()}</p>
                <p>End: {new Date(event.end.dateTime).toLocaleString()}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default GoogleCalendarWeekly;
