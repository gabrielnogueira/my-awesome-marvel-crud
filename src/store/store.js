import {createStore, applyMiddleware, compose} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddeware from 'redux-promise';
import multiMidleware from 'redux-multi';
import {reducers as pagesReducer} from '../pages';

const configureStore = (initialState) =>{
  const loggerMiddleware = createLogger({predicate:(getState, action) => '__DEV__'});

  const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = comp(
    applyMiddleware(
      loggerMiddleware,
      multiMidleware,
      promiseMiddeware
    )
  );

  return createStore(pagesReducer, initialState, enhancer);
}

export default configureStore({
  characters:[],
  isLoading: true
});