// types/GoogleTypes.tsx

export type CalendarEvent = {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    date?: string; // Add the 'date' property here
  };
  end: {
    dateTime: string;
    date?: string; // Add the 'date' property here
  };
};

export interface GoogleCalendarWeeklyProps {
  events: GoogleCalendarEventData[];
  weekStartDate: Date;
  onChangeWeek: (date: Date) => void;
  onError?: () => void;  // Made this optional as it wasn't used yet
}

export type GoogleCalendarData = {
  items: GoogleCalendarEventData[];
};

export type GoogleCalendarEventData = {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    date?: string; // Add the 'date' property here
  };
  end: {
    dateTime: string;
    date?: string; // Add the 'date' property here
  };
  // Add other required fields if any.
};

export interface GoogleCalendarEventProps extends GoogleCalendarEventData {
  style?: React.CSSProperties;
}