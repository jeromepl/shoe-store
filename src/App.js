import React from 'react';

import Header from './Header';
import DashboardSummary from './DashboardSummary';
import Dashboard from './Dashboard';
import SalesLog from './SalesLog';

import './App.css';

/**
 * The main gist of how this app works:
 * The data store (store.js) contains all the stock numbers and uses MobX to automatically
 * derive computed properties such as the percentage of items that are in low stock.
 * Views that use this data are then defined in the React components that can be seen below.
 * These views use MobX's observer function to automatically refresh when a change happens in
 * a value they use from the store.
 * The store is automatically updated by watching for messages from the websocket conneciton
 * (this is also done in the store.js file).
 * The rest is UI design using styled-components and a few css animations.
 */


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

