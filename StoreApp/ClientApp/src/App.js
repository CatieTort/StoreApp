import React, { Component, useState } from 'react';
import { Switch, Route } from 'react-router';
import NavBar from './components/NavBar';
import StoreItems from './components/StoreItems';
import CreateItem from './components/CreateItem';
import MaxPrice from './components/MaxPrice';
import NoMatch from './components/NoMatch';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import './main.scss';

library.add(fas);

function App (){
    const displayName = App.name;
    
    return (
        <>
            <NavBar />
            <div className="container">
                <Switch>
                    <Route exact path='/' component={StoreItems} />
                    <Route exact path='/add-item' component={CreateItem} />
                    <Route exact path='/max-price' component={MaxPrice} />
                    <Route component={NoMatch} />
            </Switch>
           </div>
        </>
    );

}

export default App;
