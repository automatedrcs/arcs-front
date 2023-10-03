import { createContext, ReactNode, useState, useEffect } from 'react';

interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    calendarData: GoogleCalendarData | null;
    accessToken: string; // Add this
    setUserData: (userUUID: string, organizationId: string) => void;
    setCalendarData: (data: GoogleCalendarData) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [calendarData, setCalendarData] = useState<GoogleCalendarData | null>(null);
    const [accessToken, setAccessToken] = useState<string>(""); // Create a new state for accessToken

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            setAccessToken(token); 
            // TODO: Fetch user details from backend based on token
            setUserUUID('someUUID'); // Placeholder logic
            setOrganizationId('someOrgId'); // Placeholder logic
        }
    }, []);

    const setUserData = (userUUID: string, organizationId: string) => {
        setUserUUID(userUUID);
        setOrganizationId(organizationId);
    };

    const logout = () => {
        setUserUUID(null);
        setOrganizationId(null);
        localStorage.removeItem('jwt');
    };

    return (
        <UserContext.Provider value={{ userUUID, organizationId, calendarData, accessToken, setUserData, setCalendarData, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export type GoogleCalendarData = {
    items: GoogleCalendarEvent[];
};

export type GoogleCalendarEvent = {
    // ... appropriate fields for an event
};