
export type CalendarEvent = {
    id: string;
    summary: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
};

export interface GoogleCalendarWeeklyProps {
    accessToken: string;
    weekStartDate: Date;
    onChangeWeek: (date: Date) => void;
    onError: () => void; 
}  

export type GoogleCalendarData = {
    items: GoogleCalendarEvent[];
};

export type GoogleCalendarEvent = {
    // ... appropriate fields for an event
};