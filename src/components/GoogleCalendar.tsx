import React, { useEffect, useState } from 'react';
import { GoogleCalendarData } from '../contexts/UserContext';

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

interface GoogleCalendarProps {
  accessToken: string;
  data: GoogleCalendarData;
}

const GoogleCalendar: React.FC<GoogleCalendarProps> = ({ accessToken }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  useEffect(() => {
    if (accessToken) {
      fetchUserCalendarEvents(accessToken);
    }
  }, [accessToken]);

  const fetchUserCalendarEvents = (token: string) => {
    const calendarApiEndpoint = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';
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

  return (
    <div className="google-calendar">
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

export default GoogleCalendar;
