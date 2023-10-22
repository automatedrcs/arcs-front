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
    const sortedEvents = [...events].sort((a, b) => {
        const isAllDayA = !a.start.dateTime;
        const isAllDayB = !b.start.dateTime;

        if (isAllDayA && !isAllDayB) {
            return -1; // a is all-day, so it comes first
        } else if (!isAllDayA && isAllDayB) {
            return 1; // b is all-day, so it comes first
        }

        // Compare start times for non-all-day events
        return new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime();
    });
    
    const getDayOfWeek = (date: Date) => {
        return date.getDay();
    };

    let currentRow = 2;
    let lastDayColumn = -1;

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