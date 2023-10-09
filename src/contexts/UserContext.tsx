// contexts/UserContext.tsx

import { createContext, useState, useEffect } from 'react';
import { apiUrl } from '../config';
import { UserContextProps, UserProviderProps } from '../types/UserTypes';

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem('jwt') || accessToken;
        if (token) {
            setAccessToken(token);
            
            fetch(apiUrl + '/user/me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                if(!response.ok) throw new Error('Error fetching user details.');
                return response.json();
            })
            .then(data => {
                const { userUUID, organizationId } = data;
                setUserUUID(userUUID);
                setOrganizationId(organizationId);
                console.log('User details fetched:', data);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
                localStorage.removeItem('jwt');
                setAccessToken("");
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
        <UserContext.Provider value={{ userUUID, organizationId, accessToken, setUserData, setCalendarData, logout, setAccessToken }}>
            {children}
        </UserContext.Provider>
    );
};
