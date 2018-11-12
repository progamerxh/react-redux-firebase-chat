import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import Signin from './Components/SignIn';
import Home from './Components/Home'
import requireAuth from './Components/requireAuth'
import './App.css'

class App extends Component {
 
  render() {
    return (
      <div className="Container">
        <Route path='/' component={Signin} />
        <Route path='/' component={requireAuth(Home)} />
      </div>

    );
  }
}

export default App;
