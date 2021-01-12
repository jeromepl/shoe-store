import React from 'react';
import { observer } from 'mobx-react-lite';

import dataStore from './store';


const SalesLog = observer(() => {
    return <div>
        <h2>Sales Log</h2>
        {/* Print the sales in reverse order (newer first) */}
        {dataStore.recentSales.slice(0).reverse().map((recentSale, i) =>
            <div key={i}>
                <span>{recentSale.store} </span>
                <span>{recentSale.model} </span>
                <span>{recentSale.inventory}</span>
            </div>
        )}
    </div>;
});

export default SalesLog;
