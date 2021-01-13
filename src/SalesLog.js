import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import dataStore from './store';


const SaleItemStyle = styled.div`
    height: 50px;
    border-radius: 4px;
    margin: 10px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;

    border: solid 1px #e9e9e9;
`;

const SaleItem = (props) => {
    return <SaleItemStyle>
        <span style={{ fontWeight: 'bold' }}>{props.sale.model}</span>
        <span>{props.sale.store}</span>
    </SaleItemStyle>
};

const SalesLog = observer(() => {
    return <div className="SalesLog">
        <h2>🔥 Sales Log</h2>
        {/* Print the sales in reverse order (newer first) */}
        {dataStore.recentSales.slice(0).reverse().map((recentSale, i) =>
            <SaleItem key={i} sale={recentSale} />
        )}
    </div>;
});

export default SalesLog;
