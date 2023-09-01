import { legacy_createStore, Store, applyMiddleware, Dispatch, combineReducers } from 'redux';
import thunk from 'redux-thunk';


import {AuthReducer } from './Authentication/reducer';

const rootReducer = combineReducers({
  AuthReducer,
  
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
