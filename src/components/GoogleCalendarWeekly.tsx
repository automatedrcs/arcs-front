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
    const sortedEvents = [...events].sort((a, b) => new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime());
    
    const getDayOfWeek = (date: Date) => {
        return date.getDay();
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
                    </div>
                ))}
                {sortedEvents.map((event: GoogleCalendarEventData) => {
                    const dayColumn = getDayOfWeek(new Date(event.start.dateTime)) + 1;
                    let eventRow = currentRow;
                    currentRow += 1;
                    return (
                        <EventComponent 
                            key={event.id} 
                            {...event} 
                            style={{ gridColumn: dayColumn, gridRow: eventRow }}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;