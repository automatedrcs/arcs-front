import React, { ReactNode } from "react"; // Make sure to import ReactNode
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Navigate } from "react-router-dom";

interface RequireLoginProps {
    children: ReactNode;
}

const RequireLogin: React.FC<RequireLoginProps> = ({ children }) => {
    const context = useContext(UserContext);
    const isLoggedIn = Boolean(context?.userUUID);

    if (!isLoggedIn) {
        return <Navigate to="/entry" />;
    }

    return <>{children}</>;
};

export default RequireLogin;
