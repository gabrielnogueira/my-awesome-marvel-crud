import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Pages from './pages';

export default () => 
  <Provider store={store}>
        <Pages />
  </Provider>