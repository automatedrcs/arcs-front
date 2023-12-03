// contexts/UserContext.tsx

import { createContext, useState, useEffect, useContext } from 'react';
import { apiUrl } from '../config';
import { UserContextProps, UserProviderProps } from '../types/UserTypes';
import { saveUserToLocalStorage } from '../utils/helpers';

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    // useEffect(() => {
    //     if (userUUID !== null) {
    //         fetch(apiUrl + '/user/me', {
    //             credentials: 'include'  // Use cookies for authentication
    //         })
    //         .then(response => {
    //             if (!response.ok) throw new Error('Error fetching user details.');
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log('User data:', data);
    //             const { userUUID, organizationId } = data;
    //             setUserUUID(userUUID);
    //             setOrganizationId(organizationId);
    //         })            
    //         .catch(error => {
    //             logout();
    //             console.log(error.message);
    //         });
    //     }
    // }, []);
    
    const setUserData = (userUUID: string, organizationId: string) => {
        setUserUUID(userUUID)
        setOrganizationId(organizationId)
        saveUserToLocalStorage(userUUID, organizationId)
    };

    const refreshToken = async () => {
        try {
            const response = await fetch(apiUrl + '/user/token/refresh', {
                method: 'POST',
                credentials: 'include'
            });
            if (!response.ok) throw new Error("Failed to refresh token.");
        } catch (error) {
            logout();
        }
    };    
    
    const logout = () => {
        setUserUUID(null);
        setOrganizationId(null);
        localStorage.removeItem('user')
    };
    

    return (
        <UserContext.Provider value={{ userUUID, organizationId, setUserData, refreshToken, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error('useUserContext must be used withib a UserProvider')
    }
    return context
}