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
    const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Added state for error message
    const userContext = useContext(UserContext);

    let headers: { [key: string]: string } = {};

    if (userContext && userContext.userUUID) {
        headers['user-uuid'] = userContext.userUUID; // Corrected header name
    }

    const handleButtonClick = async () => {
        try {
            if (!headers['user-uuid']) {
                setErrorMessage("User UUID is missing. Please log in or provide a valid UUID.");
                return;
            }

            const response = await fetch(apiUrl + "/test/api/connection-test", {
                headers: headers
            });
            const data = await response.json();
    
            if (response.ok) {
                setApiResponse(data);
                setErrorMessage(null); // Clear any previous errors
            } else {
                if (data && data[0] && data[0].type === "value_error.missing" && data[0].loc.includes("user-uuid")) {
                    setErrorMessage("User UUID is missing. Please log in or provide a valid UUID.");
                } else {
                    const errorData: ApiErrorResponse = data;
                    console.error("API returned an error:", errorData.detail);
                    setErrorMessage(errorData.detail || "Unknown server error");
                }
            }           
        } catch (error) {
            console.error("Error fetching the API:", error);
            setErrorMessage("Failed to connect to the API.");
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Test API Connection</button>
            {apiResponse && <div>
                <p>{apiResponse.message}</p>
                {apiResponse.data && <pre>{JSON.stringify(apiResponse.data, null, 2)}</pre>}
            </div>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}  {/* Display the error message */}
        </div>
    );
}

export default TestConnectionButton;
