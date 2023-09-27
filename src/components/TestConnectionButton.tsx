import React, { useState } from 'react';
import { JSONObject } from '../types/jsonTypes';

// Define a type for your API response
interface ApiResponse {
    message: string;
    data?: {
        organization_name?: string;
        organization_data?: JSONObject;
    };
}

function TestConnectionButton() {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const handleButtonClick = async () => {
        try {
            const response = await fetch(process.env.VITE_API_URL + "/test/api/connection-test");
            const data: ApiResponse = await response.json();
            setApiResponse(data);
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
