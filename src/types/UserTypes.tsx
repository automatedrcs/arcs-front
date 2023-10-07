import { GoogleCalendarData } from "./GoogleTypes";
import { ReactNode } from "react";

export interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    calendarData: GoogleCalendarData | null;
    accessToken: string;
    setUserData: (userUUID: string, organizationId: string) => void;
    setAccessToken: (token: string) => void;
    setCalendarData: (data: GoogleCalendarData) => void;
    logout: () => void;
}


export interface UserProviderProps {
    children: ReactNode;
}