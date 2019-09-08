import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMidleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import {reducers as pagesReducer} from '../pages';

const configureStore = (initialState) =>{
  const loggerMiddleware = createLogger({predicate:(getState, action) => '__DEV__'});

  const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    form: formReducer,
    pages: pagesReducer
  })

  const enhancer = comp(
    applyMiddleware(
      loggerMiddleware,
      thunkMidleware,
    )
  );

  return createStore(rootReducer, initialState, enhancer);
}

export default configureStore({
  pages:{
    characters:[],
    customCharacters:[]
  }
});