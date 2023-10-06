// components/GoogleCalendarWeekly.tsx

import React, { useState, useEffect } from 'react';

type CalendarEvent = {
    id: string;
    summary: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
};

interface GoogleCalendarWeeklyProps {
  accessToken: string;
  weekStartDate: Date;
  onChangeWeek: (newDate: Date) => void;
}

const GoogleCalendarWeekly: React.FC<GoogleCalendarWeeklyProps> = ({ accessToken, weekStartDate, onChangeWeek }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  useEffect(() => {
    if (accessToken) {
      fetchUserCalendarEvents(accessToken, weekStartDate);
    }
  }, [accessToken, weekStartDate]);

  const fetchUserCalendarEvents = (token: string, startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);
    
    const calendarApiEndpoint = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}`;
    
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
        setEvents(calendarData.items as CalendarEvent[]);
      }
    })
    .catch(error => {
      console.error('Failed to fetch Google Calendar data:', error);
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
      <div className="week-navigation">
        <button onClick={handlePreviousWeek}>Previous</button>
        <span>{weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
        <button onClick={handleNextWeek}>Next</button>
      </div>
      {events.map(event => (
        <div key={event.id} className="event">
            <h4>{event.summary}</h4>
            <p>Start: {event.start.dateTime}</p>
            <p>End: {event.end.dateTime}</p>
        </div>
      ))}
    </div>
  );
};

export default GoogleCalendarWeekly;
