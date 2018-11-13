import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Message from './Message';
import RoomList from '../Components/RoomList';
import Tags from '../Components/Tags';
import SearchForm from '../Components/SearchForm';
import Navbar from '../Components/Navbar';
import InforPanel from '../Components/InforPanel';
import Inbox from './Inbox';
import '../App.css'

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
