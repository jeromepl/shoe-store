import React from 'react';
import { observer } from 'mobx-react-lite';
import { values } from 'mobx';

import dataStore from './store';


const Dashboard = observer(() => {
    return <div className="Dashboard">
        {values(dataStore.stores).map((store, i) => (
            <div key={i} >
                { values(store['inventory']).map((shoe, j) => (
                    <span key={j}>{shoe > 0 ? shoe : '-'}</span>
                ))}
            </div>
        ))}
    </div>;
});

export default Dashboard;