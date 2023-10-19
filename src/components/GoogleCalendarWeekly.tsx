import React from 'react';
import { GoogleCalendarEvent, GoogleCalendarWeeklyProps } from '../types/GoogleTypes';
import './GoogleCalendarWeekly.css';

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

    // Days of the week labels
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="google-calendar-weekly">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>Previous</button>
                <span>{weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                <button onClick={handleNextWeek}>Next</button>
            </div>
            <div className="grid-container">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="grid-item">
                        {day}
                    </div>
                ))}
                {events.map((event: GoogleCalendarEvent) => {
                    const eventStartTime = new Date(event.start.dateTime);
                    const eventEndTime = new Date(event.end.dateTime);
                    const eventStartMinutes = eventStartTime.getHours() * 60 + eventStartTime.getMinutes();
                    const eventEndMinutes = eventEndTime.getHours() * 60 + eventEndTime.getMinutes();
                    const minutesInADay = 24 * 60;
                    
                    return (
                        <div
                            key={event.id}
                            className="event"
                            style={{
                                top: `${(eventStartMinutes / minutesInADay) * 100}%`,
                                height: `${((eventEndMinutes - eventStartMinutes) / minutesInADay) * 100}%`,
                                gridColumn: `${daysOfWeek.indexOf(eventStartTime.toLocaleDateString('en-US', { weekday: 'short' })) + 1}`,
                            }}
                        >
                            {event.summary}
                        </div>
                    );                    
                })}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
