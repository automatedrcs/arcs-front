// components/GoogleCalendarWeekly.tsx
import React from 'react';
import EventComponent from './GoogleCalendarEvent';
import { GoogleCalendarEventData, GoogleCalendarWeeklyProps } from '../types/GoogleTypes';

const GoogleCalendarWeekly: React.FC<GoogleCalendarWeeklyProps> = ({ events, weekStartDate, onChangeWeek }) => {
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

    const endDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Separate events into all-day and timed events
    const allDayEvents: GoogleCalendarEventData[] = [];
    const timeEvents: GoogleCalendarEventData[] = [];
    
    events.forEach((event) => {
        if (event.start.dateTime) {
            timeEvents.push(event);
        } else {
            allDayEvents.push(event);
        }
    });

    const getDayOfWeek = (date: Date) => {
        return date.getDay();
    };

    const renderEventsForDay = (dayIndex: number) => {
        const eventsForDay = timeEvents.filter((event) => {
            const dayOfWeek = getDayOfWeek(new Date(event.start.dateTime));
            return dayOfWeek === dayIndex;
        });

        if (allDayEvents.length > 0 && dayIndex === daysOfWeek.indexOf(weekStartDate.toLocaleDateString())) {
            eventsForDay.unshift(...allDayEvents);
        }

        return eventsForDay.map((event: GoogleCalendarEventData) => (
            <EventComponent
                key={event.id}
                {...event}
                style={{ gridColumn: dayIndex + 1, gridRow: currentRow }}
            />
        ));
    };

    let currentRow = 2;

    return (
        <div className="google-calendar-weekly">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>&larr; Prev</button>
                <span>{weekStartDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
                <button onClick={handleNextWeek}>Next &rarr;</button>
            </div>
            <div className="grid-container">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="grid-item-day" style={{ gridColumn: index + 1 }}>
                        {day}
                        {renderEventsForDay(index)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
