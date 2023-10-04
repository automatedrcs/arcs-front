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
        const token = localStorage.getItem('jwt');
        if (token) {
            setAccessToken(token);  
            // Fetch user details from backend based on token
            axios.get('/user/', {  // assuming "/user/me" is the endpoint to get user details
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                const { userUUID, organizationId } = response.data;
                setUserUUID(userUUID);
                setOrganizationId(organizationId);
            }).catch(error => {
                console.error('Error fetching user details:', error);
                // Optionally, handle the error. Maybe remove the token if it's invalid.
            });
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
        <UserContext.Provider value={{ userUUID, organizationId, calendarData, accessToken, setUserData, setCalendarData, logout, setAccessToken }}> {/* <-- Add setAccessToken here */}
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