import { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext'; 

const useApiRequest = () => {
    const context = useContext(UserContext);

    // Ensure context is available before proceeding.
    if (!context) {
        throw new Error('useApiRequest must be used within a UserProvider');
    }

    const { accessToken, refreshToken, logout } = context;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);  // Modify this line

    const sendRequest = async (url: string, options: RequestInit = {}) => {
        setIsLoading(true);
        setError(null);

        const defaultOptions = {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        };

        const mergedOptions = { ...defaultOptions, ...options };

        try {
            let response = await fetch(url, mergedOptions);
            if (response.status === 401) {
                await refreshToken();
                response = await fetch(url, mergedOptions);
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIsLoading(false);
            return data;

        } catch (err) {
            setIsLoading(false);
            if (err instanceof Error) {
                setError(err.message);
                if (err.message === 'Network response was not ok') {
                    logout();
                }
            } else {
                setError("An unexpected error occurred.");
            }
        }
    };

    return { sendRequest, isLoading, error };
};

export default useApiRequest;
