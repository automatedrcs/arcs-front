//pages/DashboardPage.tsx

import React, { useContext, useState } from 'react';
import GoogleCalendarWeekly from '../components/GoogleCalendarWeekly';
import ConnectGoogleCalendarButton from '../components/ConnectGoogleCalendarButton';
import { apiUrl } from '../config';
import './DashboardPage.css';
import { UserContext } from '../contexts/UserContext';

const DashboardPage: React.FC = () => {
  console.log("Rendering DashboardPage");
  const [currentWeekStartDate, setCurrentWeekStartDate] = useState(new Date());
  const context = useContext(UserContext);

  return (
    
    <div className="dashboard-page">
      <h1>Welcome to the Dashboard</h1>
      <p>This is your dashboard, from here you can manage your application's main features.</p>
      {
          context?.accessToken ? 
          <GoogleCalendarWeekly accessToken={context.accessToken} weekStartDate={currentWeekStartDate} onChangeWeek={setCurrentWeekStartDate} /> :
          <ConnectGoogleCalendarButton authURL={`${apiUrl}/authentication/google`} />
      }
    </div>
  );
};

export default DashboardPage;
