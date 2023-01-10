import React, {createContext,useContext,useReducer} from 'react';
import {reducerType} from '../types'

export const StateContext = createContext({});

export const StateProvider = ({ reducer, initialState, children}:reducerType) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
