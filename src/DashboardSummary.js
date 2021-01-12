import React from 'react';
import { observer } from 'mobx-react-lite';

import dataStore from './store';


const DashboardSummary = observer(() => {
    return <div className="DashboardSummary">
        <div>{dataStore.totalInventory}</div>
        <div>{dataStore.lowCountPercentage}</div>
    </div>;
});

export default DashboardSummary;
