// components/GoogleCalendarEvent.tsx
import React from 'react';
import { GoogleCalendarEventData } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventData> = ({ id, start, end, summary }) => {
    const eventStartTime = new Date(start.dateTime);
    const eventEndTime = new Date(end.dateTime);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const timeWindow = `${formatTime(eventStartTime)} - ${formatTime(eventEndTime)}`;

    return (
        <div
            key={id}
            className="event"
            style={{
                gridColumn: `${daysOfWeek.indexOf(eventStartTime.toLocaleDateString('en-US', { weekday: 'short' })) + 1}`
            }}
        >
            <div className="event-title">{summary}</div>
            <div className="event-time-window">{timeWindow}</div>
        </div>
    );
};

export default GoogleCalendarEvent;
