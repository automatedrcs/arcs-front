// components/ConnectGoogleCalendarButton.tsx
import React from 'react';
import { apiUrl } from '../config';

const ConnectGoogleCalendarButton: React.FC = () => {
    return (
        <button onClick={() => window.location.href = apiUrl + "/authentication/google/login/user"}>
            Connect Google Calendar
        </button>
    );
}

export default ConnectGoogleCalendarButton;
