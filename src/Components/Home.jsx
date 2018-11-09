import React, { Component } from 'react';
import Message from './Message';
import RoomList from './RoomList';
import Tags from './Tags';
import SearchForm from './SearchForm';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../App.css'
import Navbar from './Navbar';
import InforPanel from './InforPanel';
import Inbox from './Inbox';


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
              <Route path='/room/:roomname' component={Inbox} />
              <Route path='/inbox' component={Inbox} />
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
