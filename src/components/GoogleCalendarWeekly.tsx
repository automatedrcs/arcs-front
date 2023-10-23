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

    // Create a dictionary to hold events for each day
    const eventsByDay: { [key: string]: GoogleCalendarEventData[] } = {};

    // Group events by day
    events.forEach((event) => {
        // Check if event.start.dateTime is present
        if (event.start.dateTime) {
            const day = new Date(event.start.dateTime).toDateString();
            if (!eventsByDay[day]) {
                eventsByDay[day] = [];
            }
            eventsByDay[day].push(event);
        } else if (event.start.date) {
            const day = new Date(event.start.date).toDateString();
            if (!eventsByDay[day]) {
                eventsByDay[day] = [];
            }
            eventsByDay[day].push(event);
        } else {
            console.log('no date nor dateTime for event');
        }
    });

    // Create a mapping between the index and the full date string
    const indexToDateMapping: { [key: number]: string } = {};
    daysOfWeek.forEach((_, index) => {
        const currentDate = new Date(weekStartDate);
        currentDate.setDate(currentDate.getDate() + index);
        indexToDateMapping[index] = currentDate.toDateString();
    });

    return (
        <div className="google-calendar-weekly">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>&larr; Prev</button>
                <span>{weekStartDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</span>
                <button onClick={handleNextWeek}>Next &rarr;</button>
            </div>
            <div className="grid-container">
                {daysOfWeek.map((day, columnIndex) => (
                    <div key={columnIndex} className="grid-item-day" style={{ gridColumn: columnIndex + 1 }}>
                        {day}
                        
                        {/* Render events for the current day */}
                        {eventsByDay[indexToDateMapping[columnIndex]]?.map((event: GoogleCalendarEventData, eventIndex) => (
                            <EventComponent
                                key={event.id}
                                {...event}
                                style={{ gridColumn: columnIndex + 1, gridRow: eventIndex + 2 }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
