import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reducer, {initialState} from "./states/reducer";
import {StateProvider} from './states/StateProvider';
import Index from "./Index";
import './lang/i18n'

ReactDOM.render(
    <React.StrictMode>
        <StateProvider initialState={initialState} reducer={reducer}>
            <Suspense fallback="...loading">
                <Index/>
            </Suspense>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('app')
);
