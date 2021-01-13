import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import dataStore, { STORE_LIST, SHOE_LIST } from './store';


const Grid = styled.table`
    border-spacing: 1px;

    & tr {
        height: 40px;
    }

    & td:not(.row-header) {
        width: 40px;
        box-sizing: border-box;
        text-align: center;
    }

    & td.row-header {
        font-weight: bold;
        text-align: right;
        padding-right: 12px;
    }

`;

const CellStyled = styled.td`
    background-color: ${props => props.color ?? 'white'};
    transition: background-color ease 0.5s;
`;

const Cell = observer((props) => {
    const inventory = dataStore.stores.get(props.store).inventory.get(props.model);
    const color = inventory >= 0 ? `hsl(${(inventory / 100) * 156}deg 55% 51%)` : 'white';
    return <CellStyled color={color}>
        {inventory >= 0 ? inventory : '-'}
    </CellStyled>;
});


const Dashboard = () => {
    return <div className="Dashboard">
        <h2>👟 Inventory</h2>
        <Grid>
            <tbody>
                <tr>
                    <th></th>
                    {SHOE_LIST.map((model) =>
                        <th key={model} title={model}>{model.slice(0, 3)}.</th>
                    )}
                </tr>
                {STORE_LIST.map((store) =>
                    <tr key={store}>
                        <td className='row-header'>{store}</td>
                        {SHOE_LIST.map((model) =>
                            <Cell key={store + model} store={store} model={model} />
                        )}
                    </tr>
                )}
            </tbody>
        </Grid>
    </div>;
};

export default Dashboard;