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

    const [err, hasError] = useState(false);
    const [errType, setErrType] = useState('');
    const [errMsg, setErrorMsg] = useState('');
    const [valid, validateDone] = useState(false);

    const clearErrors = () => {
        hasError(false);
        setErrType('');
        setErrorMsg('');
        validateDone(false);
    }

    let validateProps = {
        err,
        hasError,
        errType,
        setErrType,
        errMsg,
        setErrorMsg,
        valid,
        validateDone,
        clearErrors
    }

    return (
        <>
            <NavBar />
            <div className="container">
                <Switch>
                    <Route exact path='/'>
                        <StoreItems {...validateProps}/>
                    </Route>
                    <Route exact path='/add-item'>
                        <CreateItem {...validateProps} />
                    </Route>
                    <Route exact path='/search-price'>
                            <MaxPrice {...validateProps} />
                    </Route> 
                    <Route component={NoMatch} />
            </Switch>
           </div>
        </>
    );

}

export default App;
