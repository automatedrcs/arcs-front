// components/GoogleCalendarEvent.tsx
import React from 'react';
import { GoogleCalendarEventData } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventData> = ({ id, start, end, summary }) => {
    const eventStartTime = new Date(start.dateTime);
    const eventEndTime = new Date(end.dateTime);
    
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const timeWindow = `${formatTime(eventStartTime)} - ${formatTime(eventEndTime)}`;

    const truncatedSummary = summary.length > 27 
        ? `${summary.substring(0, 24)}...`
        : summary;

    return (
        <div key={id} className="event">
            <div className="event-title" style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                maxHeight: '2.4em' // Assuming line-height of 1.2em, adjust as needed
            }}>{truncatedSummary}</div>
            <div className="event-time-window">{timeWindow}</div>
        </div>
    );
};

export default GoogleCalendarEvent;