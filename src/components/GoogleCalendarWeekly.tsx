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
        let day = "";
        // Check if event.start.dateTime is present
        if (event.start.dateTime) {
            // Handle the case where start.dateTime is missing
            // You can provide a fallback behavior or skip the event
            console.log("dateTime missing for event");
            day = new Date(event.start.dateTime).toDateString();
        }
        else if (event.start.date) {
            console.log("date present in event");
            day = new Date(event.start.dateTime).toDateString();
        }
        else {
            console.log("no date nor dateTime");
        }

        if (!eventsByDay[day]) {
            eventsByDay[day] = [];
        }
        eventsByDay[day].push(event);
    });

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
                        
                        {/* Render events for the current day */}
                        {eventsByDay[weekStartDate.toDateString()]?.map((event: GoogleCalendarEventData, eventIndex) => (
                            <EventComponent
                                key={event.id}
                                {...event}
                                style={{ gridColumn: index + 1, gridRow: eventIndex + 2 }}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
