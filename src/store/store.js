import {createStore, applyMiddleware, compose, combineReducers } from 'redux';
import {createLogger} from 'redux-logger';
import thunkMidleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import {reducers as pagesReducer} from '../pages';

const pagesPersistConfig = {
  key: '@my-awesome-marvel-crud/pages',
  storage,
  whitelist: ['customCharacters']
}

const configureStore = (initialState) =>{
  const loggerMiddleware = createLogger({predicate:(getState, action) => '__DEV__'});

  const comp = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const rootReducer = combineReducers({
    form: formReducer,
    pages: persistReducer(pagesPersistConfig, pagesReducer)
  })

  const enhancer = comp(
    applyMiddleware(
      loggerMiddleware,
      thunkMidleware,
    )
  );
  const store = createStore(rootReducer, initialState, enhancer);
  const persistor = persistStore(store)

  return {store, persistor};
}

export default configureStore({});