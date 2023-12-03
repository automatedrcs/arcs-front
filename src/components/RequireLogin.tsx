import React, { ReactNode } from "react"; // Make sure to import ReactNode
import { Navigate } from "react-router-dom";
import { getUserFromLocalStorage } from "../utils/helpers";
import { useUserContext } from "../contexts/UserContext";

interface RequireLoginProps {
    children: ReactNode;
}

const RequireLogin: React.FC<RequireLoginProps> = ({ children }) => {

    const {setUserData} = useUserContext()
    const user = getUserFromLocalStorage()
    const isLoggedIn = user !== null
    if (isLoggedIn) {
        setUserData(user.uuid, user.organizationId)
    }

    if (!isLoggedIn) {
        return <Navigate to="/entry" />;
    }

    return <>{children}</>;
};

export default RequireLogin;
