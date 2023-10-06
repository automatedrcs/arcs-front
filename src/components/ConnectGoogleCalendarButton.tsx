// components/ConnectGoogleCalendarButton.tsx
import React from 'react';

interface Props {
    authURL: string; // URL to your backend endpoint that redirects to Google OAuth
}

const ConnectGoogleCalendarButton: React.FC<Props> = ({ authURL }) => {
    return (
        <button onClick={() => window.location.href = authURL}>
            Connect Google Calendar
        </button>
    );
}

export default ConnectGoogleCalendarButton;