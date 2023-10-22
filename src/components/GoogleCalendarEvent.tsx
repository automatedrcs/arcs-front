// components/GoogleCalendarEvent.tsx
import React from 'react';
import { GoogleCalendarEventProps } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventProps> = ({ id, start, end, summary, style }) => {

    const eventStartTime = new Date(start.dateTime);
    const eventEndTime = new Date(end.dateTime);

    const formatTime = (date: Date, isAllDay: boolean) => {
        if (isAllDay) {
            return "All Day";
        } else {
            const timeString = date.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' });
            return timeString.toLowerCase();
        }
    };
    
    const isAllDay = !start.dateTime;
    const timeWindow = formatTime(eventStartTime, isAllDay) + (isAllDay ? "" : ` - ${formatTime(eventEndTime, isAllDay)}`);

    return (
        <div key={id} className="event" style={style}>
            <div className="event-title">{summary}</div>
            <div className="event-time-window">{timeWindow}</div>
        </div>
    );
};

export default GoogleCalendarEvent;
