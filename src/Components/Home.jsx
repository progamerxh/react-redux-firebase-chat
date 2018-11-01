import React, { Component } from 'react';
import Tags from './Tags';
import SearchForm from './SearchForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar';



class Home extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="left">
            <SearchForm onUserLogin={this.handleUserLogin} />
            <Switch>
              <Route path='/home' component={Tags} />

            </Switch>
          </div>
          <div className="right">

          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
