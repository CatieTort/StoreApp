import React, { Component } from 'react';
import { Route } from 'react-router';
import { Home } from './components/Home';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import './main.css'

library.add(fas);

export default class App extends Component {
    static displayName = App.name;

    

  render () {
    return (
        <div>
            <Route exact path='/' component={Home} />
        </div>
    );
  }
}
