import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import reduxPersist from './store';
import Pages from './pages';

export default () => 
  <Provider store={reduxPersist.store}>
      <PersistGate loading={null} persistor={reduxPersist.persistor}>
         <ThemeProvider theme={theme}>
            <Pages />
         </ThemeProvider>
      </PersistGate>
  </Provider>