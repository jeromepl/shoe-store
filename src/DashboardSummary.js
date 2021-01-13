import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import dataStore, { LOW_STOCK_THRESHOLD } from './store';


const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 230px;
`;

const ExplanationText = styled.p`
    font-size: 22px;
`;

const StockText = styled.div`
    font-size: 40px;
    margin: 40px 0;
    font-weight: bold;
    color: hsl(156deg 55% 51%);
`;


const DashboardSummary = observer(() => {
    const inStockPercentage = (1 - dataStore.lowCountPercentage) * 100; // In %
    return <div className="DashboardSummary">
        <SectionContainer>
            <div style={{ width: '200px' }}>
                <CircularProgressbar
                    value={inStockPercentage}
                    text={inStockPercentage.toFixed(1) + '%'}
                    styles={buildStyles({
                        pathColor: `hsl(${inStockPercentage / 100 * 156}deg 55% 51%)`,
                        textColor: `hsl(${inStockPercentage / 100 * 156}deg 55% 51%)`
                    })}
                />
            </div>
            <ExplanationText>of products are in <span title={`> ${LOW_STOCK_THRESHOLD}`} style={{ borderBottom: 'dashed 1px grey', cursor: 'default' }}>sufficient</span> stock</ExplanationText>
        </SectionContainer>
        <SectionContainer>
            <StockText style={{ height: '200px' }}>{dataStore.totalInventory}</StockText>
            <ExplanationText>Total number of items in inventory</ExplanationText>
        </SectionContainer>
        <SectionContainer>
            <div style={{ width: '200px' }}>
                <CircularProgressbar
                    value={100}
                    text="100%"
                    styles={buildStyles({
                        pathColor: `hsl(156deg 55% 51%)`,
                        textColor: `hsl(156deg 55% 51%)`
                    })}
                />
            </div>
            <ExplanationText>This dashboard is 100% awesome 👍</ExplanationText>
        </SectionContainer>
    </div>;
});

export default DashboardSummary;
