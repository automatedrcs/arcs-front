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

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="google-calendar-weekly">
            <div className="week-navigation">
                <button onClick={handlePreviousWeek}>&larr;</button> {/* Replace with left arrow */}
                <span>{weekStartDate.toLocaleDateString()} - {new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                <button onClick={handleNextWeek}>&rarr;</button> {/* Replace with right arrow */}
            </div>
            <div className="grid-container">
                {daysOfWeek.map((day, index) => (
                    <div key={index} className="grid-item-day">
                        {day}
                    </div>
                ))}
                {Array.from({ length: 48 }).map((_, index) => (
                    <div className="half-hour-label" key={index}>
                        {index % 2 === 0 ? `${Math.floor(index/2)}:00` : `${Math.floor(index/2)}:30`}
                    </div>
                ))}
                {events.map((event: GoogleCalendarEventData) => (
                    <EventComponent key={event.id} {...event} />
                ))}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
