import { createContext, ReactNode, useState, useEffect } from 'react';

interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    setUserData: (userUUID: string, organizationId: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if (token) {
            // Validate the token and populate userUUID and organizationId
            // This is a placeholder logic, replace with actual logic as needed.
            setUserUUID('someUUID');
            setOrganizationId('someOrgId');
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
        <UserContext.Provider value={{ userUUID, organizationId, setUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};
