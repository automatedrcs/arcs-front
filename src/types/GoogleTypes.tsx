// types/GoogleTypes.tsx

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
  events: GoogleCalendarEvent[];
  weekStartDate: Date;
  onChangeWeek: (date: Date) => void;
  onError?: () => void;  // Made this optional as it wasn't used yet
}

export type GoogleCalendarData = {
  items: GoogleCalendarEvent[];
};

export type GoogleCalendarEvent = {
  id: string;
  summary: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  };
  // Add other required fields if any.
};
