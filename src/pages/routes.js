import React from 'react';
import {BrowserRouter,  Switch, Route } from 'react-router-dom';
import Master from './Master';
// import Details from './Detail';

export default () => 
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Master} />
            {/* <Route path="/details/:id" exact component={Details} /> */}
        </Switch>
    </BrowserRouter>

