// components/GoogleCalendarEvent.tsx
import React from 'react';
import { GoogleCalendarEventProps } from '../types/GoogleTypes';
import { format } from 'date-fns';

const GoogleCalendarEvent: React.FC<GoogleCalendarEventProps> = ({
  id,
  start,
  end,
  summary,
  style,
}) => {
  let eventStartTime = null;
  let eventEndTime = null;

  if (start.dateTime) {
    eventStartTime = new Date(start.dateTime);
    eventEndTime = new Date(end.dateTime);
  }

  const timeWindow =
    eventStartTime && eventEndTime
      ? `${format(eventStartTime, 'p')} - ${format(eventEndTime, 'p')}`
      : '';

  return (
    <div key={id} className="event" style={style}>
      <div className="fs-6 text-black">{summary}</div>
      {timeWindow && (
        <div className="event-time-window text-black">{timeWindow}</div>
      )}
    </div>
  );
};

export default GoogleCalendarEvent;
