// types/UserTypes.tsx
import { ReactNode } from "react";

export interface UserContextProps {
    userUUID: string | null;
    organizationId: string | null;
    accessToken: string;
    setUserData: (userUUID: string, organizationId: string) => void;
    setAccessToken: (token: string) => void;
    logout: () => void;
    refreshToken: () => Promise<void>;
}


export interface UserProviderProps {
    children: ReactNode;
}