import { createContext, ReactNode, useState } from 'react';

interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    setUserData: (userUUID: string, organizationId: string) => void;
    logout?: () => void;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [userUUID, setUserUUID] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<string | null>(null);

    
    const setUserData = (userUUID: string, organizationId: string) => {
        setUserUUID(userUUID);
        setOrganizationId(organizationId);
    };

    const logout = () => {
        // Here you would actually clear any user data, perhaps from local storage or cookies.
        setUserUUID(null);
        setOrganizationId(null);
      };

    return (
        <UserContext.Provider value={{ userUUID, organizationId, setUserData, logout }}>
            {children}
        </UserContext.Provider>
    );
};
