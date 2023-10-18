// types/UserTypes.tsx
import { ReactNode } from "react";

export interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    setUserData: (userUUID: string, organizationId: string) => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
}


export interface UserProviderProps {
    children: ReactNode;
}