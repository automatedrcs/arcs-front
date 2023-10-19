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
                {events.map((event: GoogleCalendarEventData) => (
                    <EventComponent key={event.id} {...event} />
                ))}
            </div>
        </div>
    );
};

export default GoogleCalendarWeekly;
