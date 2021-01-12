import React from 'react';

import Header from './Header';
import DashboardSummary from './DashboardSummary';
import Dashboard from './Dashboard';
import SalesLog from './SalesLog';

import './App.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <DashboardSummary />
      <Dashboard />
      <SalesLog />
    </div>
  );
};

export default App;

