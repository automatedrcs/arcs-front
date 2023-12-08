// components/GoogleCalendarWeekly.tsx
import React from 'react';
import EventComponent from './GoogleCalendarEvent';
import { addDays, subDays } from 'date-fns';
import {
  GoogleCalendarEventData,
  GoogleCalendarWeeklyProps,
} from '../types/GoogleTypes';

const GoogleCalendarWeekly: React.FC<GoogleCalendarWeeklyProps> = ({
  events,
  weekStartDate,
  onChangeWeek,
}) => {
  const handlePreviousWeek = () => {
    const newStartDate = subDays(weekStartDate, 7);
    onChangeWeek(newStartDate);
  };

  const handleNextWeek = () => {
    const newStartDate = addDays(weekStartDate, 7);
    onChangeWeek(newStartDate);
  };

  const endDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const filteredEvents = events.filter((event) => event.start.dateTime);

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return (
      new Date(a.start.dateTime).getTime() -
      new Date(b.start.dateTime).getTime()
    );
  });

  const getDayOfWeek = (date: Date) => {
    return date.getDay();
  };

  let currentRow = 2;
  let lastDayColumn = -1;

  return (
    <div className="google-calendar-weekly">
      <div className="week-navigation">
        <button
          className="btn rounded-button btn-primary btn-lg m-2"
          onClick={handlePreviousWeek}
        >
          &larr; Prev
        </button>
        <span className="text-black">
          {weekStartDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
        </span>
        <button
          className="btn rounded-button btn-primary btn-lg m-2"
          onClick={handleNextWeek}
        >
          Next &rarr;
        </button>
      </div>
      <div className="grid-container">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="grid-item-day text-black"
            style={{ gridColumn: index + 1 }}
          >
            {day}
          </div>
        ))}
        {sortedEvents.map((event: GoogleCalendarEventData) => {
          const dayColumn = getDayOfWeek(new Date(event.start.dateTime)) + 1;

          if (dayColumn !== lastDayColumn) {
            currentRow = 2;
            lastDayColumn = dayColumn;
          } else {
            currentRow += 1;
          }

          return (
            <EventComponent
              key={event.id}
              {...event}
              style={{ gridColumn: dayColumn, gridRow: currentRow }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GoogleCalendarWeekly;
