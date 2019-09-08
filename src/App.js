import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import theme from './theme';
import store from './store';
import Pages from './pages';

export default () => 
  <Provider store={store}>
         <ThemeProvider theme={theme}>
            <Pages />
         </ThemeProvider>
  </Provider>