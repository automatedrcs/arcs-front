// components/TestConnectionButton.tsx
import { useState, useContext } from 'react';
import { apiUrl } from '../config';
import { JSONObject } from '../types/JsonTypes';
import { UserContext } from '../contexts/UserContext.tsx';

// Define a type for your API response
interface ApiResponse {
    message: string;
    data?: {
        organization_name?: string;
        organization_data?: JSONObject;
    };
}

interface ApiErrorResponse {
    detail: string;
}

function TestConnectionButton() {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const userContext = useContext(UserContext);

    let headers: { [key: string]: string } = {};  // Explicitly define the type of headers object

    if (userContext && userContext.userUUID) {
        headers['user_uuid'] = userContext.userUUID;
    }

    const handleButtonClick = async () => {
        try {
            const response = await fetch(apiUrl + "/test/api/connection-test", {
                headers: headers
            });
            const data = await response.json();
    
            if (response.ok) {
                // If the response is within the 200-299 range
                const apiData: ApiResponse = data;
                setApiResponse(apiData);
            } else {
                // If the response has an error status
                const errorData: ApiErrorResponse = data;
                console.error("API returned an error:", errorData.detail);
                setApiResponse({ message: errorData.detail || "Unknown server error" });
            }
    
        } catch (error) {
            console.error("Error fetching the API:", error);
            setApiResponse({ message: "Failed to connect to the API." });
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Test API Connection</button>
            {apiResponse && <div>
                <p>{apiResponse.message}</p>
                {apiResponse.data && <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>}
            </div>}
        </div>
    );
}

export default TestConnectionButton;
