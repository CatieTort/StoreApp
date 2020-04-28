import React, { Component, useState } from 'react';
import {Switch, Route } from 'react-router';
import Home from './components/Home';
import MaxPrice from './components/MaxPrice';
import NoMatch from './components/NoMatch';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './main.css';

library.add(fas);

function App (){
    const displayName = App.name;
    
    return (
        <div>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/max-price' component={MaxPrice} />
                <Route>
                    <NoMatch />
                </Route>
            </Switch>
        </div>
    );

}

export default App;
