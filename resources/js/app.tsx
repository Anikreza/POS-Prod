import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// @ts-ignore
import reducer, {initialState} from "./states/reducer";
// @ts-ignore
import {StateProvider} from './states/StateProvider';
import Index from "./Index";

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <Index/>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('app')
);
