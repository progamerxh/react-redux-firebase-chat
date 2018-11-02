import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { fetchUser } from './Actions/authActions'
import Signin from './Components/SignIn';
import Home from './Components/Home'
import { connect } from 'react-redux';
import requireAuth from './Components/requireAuth'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="Container">
        <Route path='/' component={Signin} />
        <Route path='/' component={requireAuth(Home)} />
      </div>

    );
  }
}

export default connect(null, { fetchUser })(App);
