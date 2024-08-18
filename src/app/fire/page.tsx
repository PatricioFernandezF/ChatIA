'use client';

import { useEffect, useState } from 'react';

export default function FirePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/firestore');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Datos desde Firestore</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
