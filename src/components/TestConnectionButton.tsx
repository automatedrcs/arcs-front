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

function TestConnectionButton() {
    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
    const userContext = useContext(UserContext);

    let headers: { [key: string]: string } = {};  // Explicitly define the type of headers object

    if (userContext && userContext.userUUID) {
        headers['X-User-UUID'] = userContext.userUUID;
    }

    const handleButtonClick = async () => {
        try {
            const response = await fetch(apiUrl + "/test/api/connection-test", {
                headers: headers  // Use the headers variable
            });
            const data: ApiResponse = await response.json();
            console.log("data, ", data);
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
