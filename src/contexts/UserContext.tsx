import { createContext, ReactNode, useState, useEffect } from 'react';
import axios from 'axios';

interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    calendarData: GoogleCalendarData | null;
    accessToken: string;
    setUserData: (userUUID: string, organizationId: string) => void;
    setAccessToken: (token: string) => void;
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
        const token = localStorage.getItem('jwt') || accessToken; // <-- Modified here
        if (token) {
            setAccessToken(token);  
            // Fetch user details from backend based on token
            axios.get('/user/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                const { userUUID, organizationId } = response.data;
                setUserUUID(userUUID);
                setOrganizationId(organizationId);
                console.log('User details fetched:', response.data);
            }).catch(error => {
                console.error('Error fetching user details:', error);
                // Removing the token if it's invalid
                localStorage.removeItem('jwt');
                setAccessToken(""); // <-- Clear accessToken if there's an error
            });
        }
    }, [accessToken]);

    const setUserData = (userUUID: string, organizationId: string) => {
        console.log('Setting user data:', userUUID, organizationId);
        setUserUUID(userUUID);
        setOrganizationId(organizationId);
    };

    const logout = () => {
        console.log('User logging out');
        setUserUUID(null);
        setOrganizationId(null);
        localStorage.removeItem('jwt');
        setAccessToken("");
    };

    return (
        <UserContext.Provider value={{ userUUID, organizationId, calendarData, accessToken, setUserData, setCalendarData, logout, setAccessToken }}>
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