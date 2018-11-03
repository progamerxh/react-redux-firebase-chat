import React, { Component } from 'react';
import firebase from 'firebase';
import { retrieveUser, refreshUser } from '../Actions/usersActions';
import { Link } from 'react-router-dom'
import { joinInbox } from '../Actions/inboxActions';
import { connect } from 'react-redux';


export class UserList extends Component {

  componentDidMount() {
    this._firebaseRef = firebase.database().ref('users');
    this._firebaseRef.on('child_added', snapshot => {
      this.props.dispatch(retrieveUser(snapshot.key, snapshot.val()));
    });
  }

  render() {
    const { users, dispatch } = this.props;
    return (
      <div className="bot inbox">
        <ul className="list">
          {
            users.map((user, index) => {
              if (user.isActive)
                var style = { color: "#86BB71" }
              return (
                <li key={index} className="item" onClick={() => {
                  dispatch(joinInbox(user));
                }}>
                  <Link to={`/inbox/${user.uid}`}>
                    <img className="avt" src={user.photoURL}></img>
                    <div className="content">
                      <div className="name">{user.displayName}</div>
                      <div className="lastmessage">
                        <i className="fa fa-circle" style={style}></i>
                        {user.isActive ? (
                          "Online"
                        ) : (
                            user.lastTimeLoggedIn
                          )}
                      </div>
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </div>
    );
  }

  componentWillUnmount() {
    this._firebaseRef.off();
    this.props.dispatch(refreshUser());
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};
export default connect(
  mapStateToProps
)(UserList);
