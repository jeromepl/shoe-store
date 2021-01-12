import React from 'react';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';

import dataStore from './store';

import logo from './offline_shopping.svg';
import './App.css';


const App = observer(() => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {dataStore.totalInventory}
          <br />
          {dataStore.lowCountPercentage}
        </p>
        {values(dataStore.stores).map((store, i) => (
          <div key={i} >
            { values(store['inventory']).map((shoe, j) => (
              <span key={j}>{shoe > 0 ? shoe : '-'}</span>
            ))}
          </div>
        ))}
      </header>
    </div>
  );
});

export default App;

