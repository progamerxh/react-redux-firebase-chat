import React, { Component } from 'react';
import { retrieveMessage, refreshMessage } from '../Actions/messageActions';
import firebase from 'firebase';

export default class MessageList extends Component {
    constructor(props) {
        super(props);
        this._firebaseRef = null;
    }

    listenMesage = (messageThread) => {
        if (this._firebaseRef)
            this._firebaseRef.off();
        this._firebaseRef = firebase.database().ref(`messages/${messageThread}`);
        this._firebaseRef
            .on('child_added', (snapshot) => {
                const { uid, displayName, photoURL, message } = snapshot.val();
                this.props.dispatch(retrieveMessage({ uid, displayName, photoURL, message }));
            });
    }

    componentDidMount() {
        let messageThread = this.props.messageThread;
        this.listenMesage(messageThread);
    }

    componentWillReceiveProps(nextProps) {
        let messageThread = nextProps.messageThread;
        if (this.props.messageThread !== messageThread) {
            this.listenMesage(messageThread);
        }
    }

    componentDidUpdate() {
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const { messages } = this.props;
        return (
            <div className="messages" id='messageList'>
                <ul className="list">
                    {messages.map((message, index) => {
                        const fromMe = (this.props.uid === message.uid) ? 'item from-me' : 'item';
                        const continous = (message.isContinue) ? ' continue' : ' begin';
                        return (
                            <li className={`${fromMe + continous}`} key={index} >
                                <img className="avt" src={message.photoURL}></img>
                                <div className='content'>
                                    <h2>  {message.displayName} </h2>

                                    <p className="message">{message.message}</p>

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
    }
}
