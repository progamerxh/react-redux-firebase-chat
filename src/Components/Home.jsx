import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar';



class Home extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
