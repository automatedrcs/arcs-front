// components/ConnectGoogleCalendarButton.tsx
import React from 'react';
import { apiUrl } from '../config';

const ConnectGoogleCalendarButton: React.FC = () => {
    return (
        <a  role={"button"} className="btn btn-primary" href={`${apiUrl}/authentication/google/login/user`}>
            Connect Google Calendar
        </a>
    );
}

export default ConnectGoogleCalendarButton;
