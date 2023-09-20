import { useEffect, useState } from 'react';

export default function DataPage() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.API_URL;
        const response = await fetch(`${apiUrl}/test/api/data`);
        
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          setError(result);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Data from Backend</h1>
      {error && <p>Error: {JSON.stringify(error)}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
