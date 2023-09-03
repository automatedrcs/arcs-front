import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace this URL with your Cloud Run back-end service URL
    fetch("https://arcs-back-service-ctl3t7ldeq-uc.a.run.app/api/data")
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error("There was a problem with the fetch operation:", error.message));
  }, []); // The empty array means this effect will only run once, similar to componentDidMount

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {data && (
          <div>
            <h2>Received Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;