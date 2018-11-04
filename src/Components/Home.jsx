import React, { Component } from 'react';
import Message from './Message';
import RoomList from './RoomList';
import Tags from './Tags';
import UserList from './UserList';
import SearchForm from './SearchForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar';
import InforPanel from './InforPanel';


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
              <Route path='/room/:roomname' component={UserList} />
              <Route path='/inbox' component={UserList} />
            </Switch>
          </div>
          <div className="right">
            <InforPanel />
            <Switch>
              <Route path='/home' component={RoomList} />
              <Route path='/room/:roomname' component={Message} />} />
              <Route path='/inbox/:touserid' component={Message} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default Home;
