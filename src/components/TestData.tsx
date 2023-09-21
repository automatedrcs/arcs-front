import React, { useState, useEffect } from 'react';

const apiUrl = import.meta.env.API_URL;

interface DataResponse {
    message: string;
    data: {
        example_key: string;
    };
}

const fetchData = async (): Promise<DataResponse | null> => {
    try {
        const response = await fetch(`${apiUrl}/test/api/data`);
        return response.json() as unknown as DataResponse;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
};

const TestData: React.FC = () => {
    const [data, setData] = useState<DataResponse | null>(null);

    useEffect(() => {
        fetchData().then(fetchedData => {
            if (fetchedData) {
                setData(fetchedData);
            }
        });
    }, []);

    return ("
        <div>
            <h2>Test Data from FastAPI</h2>
            {data ? (
                <div>
                    <p>{data.message}</p>
                    <p>Example Key: {data.data.example_key}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    ");
};

export default TestData;
