import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { joinInbox } from '../Actions/inboxActions';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';
import { fetchUser } from '../Actions/authActions'
import TimeAgo from 'react-timeago';
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

const formatter = buildFormatter(enStrings)

export class UserList extends Component {
 
  render() {
    const { users, dispatch, userInbox, favList } = this.props;
    return (
      <div className="bot">
        {!isLoaded(users) ? (<Loading />)
          : isEmpty(users) ? (
            <h2>RoomList is empty!</h2>
          ) : (
              <div className="inbox">
                <ul className="list">
                  {Object.keys(users).reverse().map((key, index) => {
                    const user = users[key].value;
                    user.uid = users[key].key;
                    const date = new Date(user.lastTimeLoggedIn);
                    const inboxing = (user.uid === userInbox.uid) ? ' inboxing' : ' ';
                    if (user.isActive)
                      var style = { color: "#86BB71" }
                    return (
                      <Link key={index} to={`/inbox/${user.uid}`}>
                        <li className={`item ${inboxing}`} onClick={() => {
                          dispatch(joinInbox(user));
                        }}>
                          <img className="avt" src={user.avatarUrl}></img>
                          <div className="content">
                            <div className="name">{user.displayName}</div>
                            <div className="lastmessage">
                              <i className="fa fa-circle" style={style}></i>
                              {user.isActive ? (
                                "Online"
                              ) : (
                                <TimeAgo date={date} formatter={formatter} />
                                )}
                            </div>
                          </div>
                        </li>
                      </Link>
                    )
                  })}
                </ul>
              </div>
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.firebase.ordered.users,
    userInbox: state.userInbox,
    favList: state.favList,
  }
};

export default compose(
  firebaseConnect([
    { path: '/users', queryParams: ['orderByChild=lastTimeLoggedIn'] }
  ]),
  connect(mapStateToProps)
)(UserList)
