import React from 'react';
import { GoogleCalendarEventProps } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventProps> = ({ id, start, end, summary, style }) => {

    const eventStartTime = new Date(start.dateTime);
    const eventEndTime = new Date(end.dateTime);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const timeWindow = `${formatTime(eventStartTime)} - ${formatTime(eventEndTime)}`;

    return (
        <div key={id} className="event" style={style}>
            <div className="event-title">{summary}</div>
            <div className="event-time-window">{timeWindow}</div>
        </div>
    );
};

export default GoogleCalendarEvent;
