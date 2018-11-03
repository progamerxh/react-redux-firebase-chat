import React, { Component } from 'react';
import { retrieveMessage, refreshMessage } from '../Actions/messageActions';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { leaveInbox } from '../Actions/inboxActions';
import { leaveRoom } from '../Actions/roomActions';

export default class MessageList extends Component {

    componentDidMount() {
        console.log(this.props.messageThread);
        this._firebaseRef = firebase.database().ref(`messages/${this.props.messageThread}`);
        this._firebaseRef
            .on('child_added', (snapshot) => {
                const { uid, displayName, photoURL, message } = snapshot.val();
                this.props.dispatch(retrieveMessage({ uid, displayName, photoURL, message }));
            });
    }

    componentDidUpdate() {
        console.log(this.props.messageThread);
    }
    
    render() {
        const { messages } = this.props;
        return (
            <div className="messages">
                <ul className="list">
                    {messages.map((message, index) => {
                        return (
                            <li className="item" key={index}>
                                <img className="avt" src={message.photoURL}></img>
                                <div className="content">
                                    <h2>  {message.displayName} </h2>

                                    <div className="recieve">
                                        {message.message} </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
    componentWillUnmount() {
        this._firebaseRef.off();
        this.props.dispatch(refreshMessage());
        this.props.dispatch(leaveInbox());
        this.props.dispatch(leaveRoom());
    }
}
