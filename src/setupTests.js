
// import '@testing-library/react/dont-cleanup-after-each'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, wait, waitForElement, waitForElementToBeRemoved, waitForDomChange, cleanup, act} from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunkMidleware from 'redux-thunk';
import {reducers as pagesReducer} from './pages';
import {BrowserRouter} from 'react-router-dom';

jest.mock('axios');
jest.useRealTimers()

global.render = render;
global.fireEvent = fireEvent;
global.wait = wait;
global.waitForElement = waitForElement;
global.waitForElementToBeRemoved = waitForElementToBeRemoved;
global.waitForDomChange = waitForDomChange;
global.React = require('react');
global.mockedAxios = axios;
global.cleanup = cleanup;
global.act = act;

const configureStore = (initialState) =>{
    const rootReducer = combineReducers({
      pages: pagesReducer
    })
  
    const enhancer = compose(
      applyMiddleware(
        thunkMidleware
      )
    );
    return createStore(rootReducer, initialState, enhancer);
  }

global.reduxWrap = (comp, state)=>(
    <Provider store={configureStore(state)}>
        <BrowserRouter>
            {comp}
        </BrowserRouter>
    </Provider>
)