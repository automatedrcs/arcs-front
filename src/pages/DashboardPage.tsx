import React, { useContext } from 'react';
import GoogleCalendar from '../components/GoogleCalendar';
import './DashboardPage.css';
import { UserContext } from '../contexts/UserContext';

const DashboardPage: React.FC = () => {
  const context = useContext(UserContext);

  return (
    <div className="dashboard-page">
      <h1>Welcome to the Dashboard</h1>
      <p>This is your dashboard, from here you can manage your application's main features.</p>
      <GoogleCalendar accessToken={context?.accessToken || ""} data={{
        items: []
      }} />
    </div>
  );
};

export default DashboardPage;
