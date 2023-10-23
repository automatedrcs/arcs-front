// components/GoogleCalendarEvent.tsx
import React from 'react';
import { GoogleCalendarEventProps } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventProps> = ({ id, start, end, summary, style }) => {
    let eventStartTime = null;
    let eventEndTime = null;

    if (start.dateTime) {
        eventStartTime = new Date(start.dateTime);
        eventEndTime = new Date(end.dateTime);
    }

    const formatTime = (date: Date) => {
        if (!isNaN(date.getTime())) {
            return date.toLocaleTimeString([], { hour12: true, hour: 'numeric', minute: '2-digit' }).toLowerCase();
        } else {
            return '';
        }
    };

    const timeWindow = eventStartTime && eventEndTime
        ? `${formatTime(eventStartTime)} - ${formatTime(eventEndTime)}`
        : '';

    return (
        <div key={id} className="event" style={style}>
            <div className="event-title">{summary}</div>
            {timeWindow && <div className="event-time-window">{timeWindow}</div>}
        </div>
    );
};

export default GoogleCalendarEvent;
