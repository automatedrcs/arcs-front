// contexts/UserContext.tsx

import { createContext, useState, useEffect } from 'react';
import { apiUrl } from '../config';
import { UserContextProps, UserProviderProps } from '../types/UserTypes';

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<string>(localStorage.getItem('jwt') || "");

    useEffect(() => {
        if (accessToken) {
            fetch(apiUrl + '/user/me', {
                credentials: 'include'  // Use cookies for authentication
            })
            .then(response => {
                if (!response.ok) throw new Error('Error fetching user details.');
                return response.json();
            })
            .then(data => {
                console.log('User data:', data);
                const { userUUID, organizationId } = data;
                setUserUUID(userUUID);
                setOrganizationId(organizationId);
            })            
            .catch(error => {
                localStorage.removeItem('jwt');
                setAccessToken("");
                console.log(error.message);
            });
        }
    }, [accessToken]);
    
    const setUserData = (userUUID: string, organizationId: string) => {
        setUserUUID(userUUID);
        setOrganizationId(organizationId);
    };

    const refreshToken = async () => {
        try {
            const response = await fetch(apiUrl + '/user/token/refresh', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            if (data.access_token) {
                setAccessToken(data.access_token);
            } else {
                throw new Error("Failed to refresh token.");
            }
        } catch (error) {
            logout();
        }
    };
    
    const logout = () => {
        setUserUUID(null);
        setOrganizationId(null);
        setAccessToken("");
    };
    

    return (
        <UserContext.Provider value={{ userUUID, organizationId, accessToken, setAccessToken, setUserData, refreshToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};
