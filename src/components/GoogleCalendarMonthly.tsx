// components/GoogleCalendarMonthly.tsx
import React, { useState } from 'react';
import { GoogleCalendarEventProps } from '../types/GoogleTypes';
import { DayPicker } from 'react-day-picker';
import './GoogleCalendarMonthly.css';

const GoogleCalendarMonthly: React.FC<{
  events: GoogleCalendarEventProps[];
}> = ({ events }) => {
  // Use state to manage the currently displayed month
  const initialDays: Date[] = events.map(
    (event) => new Date(event.start.dateTime)
  );
  const [days, setDays] = useState<Date[] | undefined>(initialDays);

  // // Function to navigate to the previous month
  // const goToPreviousMonth = () => {
  //     const newMonth = new Date(currentMonth);
  //     newMonth.setMonth(newMonth.getMonth() - 1);
  //     setCurrentMonth(newMonth);
  // };

  // // Function to navigate to the next month
  // const goToNextMonth = () => {
  //     const newMonth = new Date(currentMonth);
  //     newMonth.setMonth(newMonth.getMonth() + 1);
  //     setCurrentMonth(newMonth);
  // };

  // // Function to generate an array of days in the current month
  // const getDaysInMonth = (date: Date) => {
  //     const year = date.getFullYear();
  //     const month = date.getMonth();
  //     const daysInMonth = new Date(year, month + 1, 0).getDate();

  //     const daysArray: Date[] = [];
  //     for (let day = 1; day <= daysInMonth; day++) {
  //         daysArray.push(new Date(year, month, day));
  //     }

  //     return daysArray;
  // };

  // // Get the days of the current month
  // const daysInCurrentMonth = getDaysInMonth(currentMonth);

  return (
    <div className="google-monthly-calendar-container">
      <DayPicker
        mode={'multiple'}
        selected={days}
        onSelect={setDays}
        fromYear={2015}
        toYear={2030}
      />
      <div className="calendar-list-container">
        {events.map((event, index) => {
          return (
            <div key={index} className="text-black">
              {event.summary}
            </div>
          );
        })}
      </div>
    </div>
  );

  // return (
  //     <div className="google-calendar-monthly">
  //         <div className="calendar-header">
  //             <button onClick={goToPreviousMonth}>&lt;</button>
  //             <h2>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h2>
  //             <button onClick={goToNextMonth}>&gt;</button>
  //         </div>
  //         <div className="calendar-grid">
  //             {/* Render the days of the week */}
  //             <div className="day-labels">
  //                 {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
  //                     <div key={index} className="day-label">
  //                         {day}
  //                     </div>
  //                 ))}
  //             </div>
  //             {/* Render the days of the month */}
  //             {daysInCurrentMonth.map((day, index) => (
  //                 <div key={index} className="calendar-day">
  //                     <div className="day-number">{day.getDate()}</div>
  //                     {/* You can render events for each day here */}
  //                     {events.map((event) => {
  //                         const eventDate = new Date(event.start.dateTime);
  //                         if (
  //                             eventDate.getDate() === day.getDate() &&
  //                             eventDate.getMonth() === day.getMonth() &&
  //                             eventDate.getFullYear() === day.getFullYear()
  //                         ) {
  //                             return (
  //                                 <div key={event.id} className="event">
  //                                     {event.summary}
  //                                 </div>
  //                             );
  //                         }
  //                         return null;
  //                     })}
  //                 </div>
  //             ))}
  //         </div>
  //     </div>
  // );
};

export default GoogleCalendarMonthly;
