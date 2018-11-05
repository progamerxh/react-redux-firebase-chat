import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { fetchUser, absence } from './Actions/authActions'
import Signin from './Components/SignIn';
import Home from './Components/Home'
import { connect } from 'react-redux';
import requireAuth from './Components/requireAuth'
import './App.css'

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    window.addEventListener("unload", this.dispatchActionOnExit());
  }
  componentWillMount() {
    this.dispatchActionOnExit = this.dispatchActionOnExit.bind(this);
  }

  dispatchActionOnExit() {
    this.props.absence();
  }
  componentWillUnmount() {
    window.removeEventListener("unload", this.dispatchActionOnExit());
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

export default connect(null, { fetchUser, absence })(App);
