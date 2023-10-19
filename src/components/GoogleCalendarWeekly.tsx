// components/GoogleCalendarWeekly.tsx

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

    return (
        <div className="google-calendar-weekly">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>Previous</button>
                <span>{weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                <button onClick={handleNextWeek}>Next</button>
            </div>
            {events.map((event: GoogleCalendarEvent) => (
                <div key={event.id} className="event">
                    <h4>{event.summary}</h4>
                    <p>Start: {new Date(event.start.dateTime).toLocaleString()}</p>
                    <p>End: {new Date(event.end.dateTime).toLocaleString()}</p>
                </div>
            ))}
        </div>
    );
};

export default GoogleCalendarWeekly;