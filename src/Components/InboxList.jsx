import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';
import { Link } from "react-router-dom";
import { joinInbox } from '../Actions/inboxActions';
export class InboxList extends Component {

  render() {
    const { lastmessages, uid, userInbox, dispatch } = this.props;
    let inboxList;
    if (lastmessages) {
      inboxList = lastmessages[uid];
    }
    return (
      <div className="bot">
        {!isLoaded(lastmessages) ? (<Loading />)
          : (!inboxList) ? (
            <h2>Inbox is empty!</h2>
          ) : (<div className="inbox">
            <ul className="list">
              {Object.keys(inboxList).reverse().map((key, index) => {
                const inbox = inboxList[key].value;
                inbox.uid = inboxList[key].key;
                const inboxing = (inbox.uid === userInbox.uid) ? ' inboxing' : ' ';
                console.log(inbox);
                return (
                  <Link key={index} to={`/inbox/${inbox.uid}`}>
                    <li className={`item ${inboxing}`} onClick={() => {
                      dispatch(joinInbox(inbox.user));
                    }}>
                      <img className="avt" src={inbox.user.avatarUrl}></img>
                      <div className="content">
                        <div className="name">{inbox.user.displayName}</div>
                        <div className="lastmessage">
                          {inbox.message}
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


export default compose(
  firebaseConnect((props) => [
    { path: `lastmessages/${props.uid}/`, queryParams: ['orderByChild=createdAt'] }
  ]),
  connect((state) => ({
    lastmessages: state.firebase.ordered.lastmessages,
    userInbox: state.userInbox
  }))
)(InboxList)
