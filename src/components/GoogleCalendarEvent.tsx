import React from 'react';
import { GoogleCalendarEventData } from '../types/GoogleTypes';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventData> = ({ id, start, end, summary }) => {
    const eventStartTime = new Date(start.dateTime);
    const eventEndTime = new Date(end.dateTime);
    const eventStartMinutes = eventStartTime.getHours() * 60 + eventStartTime.getMinutes();
    const eventEndMinutes = eventEndTime.getHours() * 60 + eventEndTime.getMinutes();
    const minutesInADay = 24 * 60;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div
            key={id}
            className="event"
            style={{
                top: `${(eventStartMinutes / minutesInADay) * 100}%`,
                height: `${((eventEndMinutes - eventStartMinutes) / minutesInADay) * 100}%`,
                gridColumn: `${daysOfWeek.indexOf(eventStartTime.toLocaleDateString('en-US', { weekday: 'short' })) + 1}`,
            }}
        >
            {summary}
        </div>
    );
};

export default GoogleCalendarEvent;
