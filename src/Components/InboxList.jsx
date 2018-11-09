import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';
import { Link } from "react-router-dom";
import { joinInbox } from '../Actions/inboxActions';
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(enStrings)

export class InboxList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textsearch: '',
    };
  }
  searchUser(name) {
    const textsearch = this.state.textsearch
    if (textsearch) {
      let lcname = name.toLowerCase();
      return lcname.indexOf(textsearch.toLowerCase()) !== -1;
    }
    return true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.searchUser !== nextProps.searchUser)
      this.setState({ textsearch: nextProps.searchUser });
  }

  render() {
    const { lastmessages, uid, users, userInbox, dispatch, favList } = this.props;
    let inboxList;
    let userList = users;
    if (lastmessages) {
      inboxList = lastmessages[uid];
      Object.keys(inboxList).map((key) => {
        const inbox = inboxList[key].value;
        inbox.uid = inboxList[key].key;
        var pos = 0;
        for (let j = 0; j < userList.length; j++) {
          if (inbox.uid == userList[pos].key) {
            var temp = userList.splice(pos, 1)[0];
            temp.lastmessage = inbox.message;
            userList.push(temp);
          }
          pos++;
        }
        pos = 0;
        for (let j = 0; j < userList.length; j++) {
          if (userList[pos].isFav && userList[pos].isActive) {
            var temp = userList.splice(pos, 1)[0];
            userList.push(temp);
          }
          pos++;
        }
      })
    }

    return (
      <ul className="list">
        {!isLoaded(lastmessages) ? (<Loading />)
          : (!inboxList) ? (
            <h2>Inbox is empty!</h2>
          ) : (<div className="inbox">

            {Object.keys(users).reverse().map((key, index) => {
              const user = users[key].value;
              user.uid = users[key].key;
              user.lastmessage = users[key].lastmessage
              const date = new Date(user.lastTimeLoggedIn);
              const inboxing = (user.uid === userInbox.uid) ? ' inboxing' : ' ';
              if (!this.searchUser(user.displayName))
                return;
              if (user.isActive)
                var style = { color: "#86BB71" }
              return (
                <Link key={index} to={`/inbox/${user.uid}`} >
                  <li className={`item ${inboxing}`} onClick={() => {
                    dispatch(joinInbox(user));
                  }}>
                    <img className="avt" src={user.avatarUrl}></img>
                    <div className="content">
                      <div className="infor">
                        <div className="name">{user.displayName}</div>
                        <div className="status">
                          <i className="fa fa-clock-o" style={style}></i>
                          {user.isActive ? (
                            "Online"
                          ) : (
                              <TimeAgo date={date} formatter={formatter} />
                            )}
                        </div>
                      </div>
                      <div className="lastmessage">
                        {user.lastmessage}
                      </div>
                    </div>
                  </li>
                </Link>
              )
            })}

          </div>
            )}
      </ul>
    );
  }
}


export default compose(
  firebaseConnect((props) => [
    { path: `lastmessages/${props.uid}/`, queryParams: ['orderByChild=createdAt'] }
  ]),
  connect((state) => ({
    lastmessages: state.firebase.ordered.lastmessages,
    userInbox: state.userInbox,
    favList: state.favList,
    searchUser: state.searchUser,
  }))
)(InboxList)
