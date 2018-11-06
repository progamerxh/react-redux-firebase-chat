import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';

export class MessageList extends Component {
    componentDidUpdate() {
        const objDiv = document.getElementById('messageList');
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    render() {
        const { messages, messageThread, uid } = this.props;
        var messageList;
        if (messages) {
            messageList = messages[messageThread];
        }
        var lastuid = '';
        const today = new Date();
        var lapseday = new Date(0);
        var timestone = null;
        var isShowTime = false;
        return (
            <div className="messages" id='messageList'>
                {!isLoaded(messages) ? (<Loading />)
                    : isEmpty(messageList) ? (
                        null
                    ) : (
                            <ul className="list">
                                {Object.keys(messageList).map((key, index) => {
                                    const message = messageList[key];
                                    const createday = new Date(message.createdAt);
                                    const fromMe = (uid === message.uid) ? 'item from-me' : 'item';
                                    const continous = (message.uid === lastuid) ? ' continue' : ' begin';
                                    lastuid = message.uid;
                                    if (new Date(createday).setHours(0, 0, 0, 0) > lapseday.setHours(0, 0, 0, 0)) {
                                        lapseday = new Date(createday);
                                        isShowTime = true;
                                    }
                                    else {
                                        isShowTime = false;
                                    }

                                    if (lapseday.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)) {
                                        timestone = lapseday.toDateString();
                                    }
                                    else if (isShowTime) {
                                        timestone = createday.toLocaleTimeString();
                                        isShowTime = true;
                                    }
                                    else
                                        timestone = null
                                    return (
                                        <li className={`${fromMe + continous}`} key={index} >
                                            <div className="lapseday">
                                                {(isShowTime) ? timestone : null}
                                            </div>
                                            <img className="avt" src={message.photoURL}></img>
                                            <div className='content'>
                                                <h2>  {message.displayName} </h2>
                                                <p className="message">{message.message}</p>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        )
                }
            </div>
        );
    }

}
export default compose(
    firebaseConnect((props) => [
        `messages/${props.messageThread}/`
    ]),
    connect((state) => ({
        messages: state.firebase.data.messages,
    }))
)(MessageList)
