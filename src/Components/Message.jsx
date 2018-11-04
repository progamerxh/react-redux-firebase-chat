import React, { Component } from 'react';
import { leaveInbox } from '../Actions/inboxActions';
import { leaveRoom } from '../Actions/roomActions';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import MessageList from './MessageList';
import {refreshMessage } from '../Actions/messageActions';

export class Message extends Component {

  
    render() {
        const { dispatch, userMessage, messages, messageThread, uid } = this.props;

        return (
            <div id="message-box" className="bot">
                <MessageList
                    dispatch={dispatch}
                    messages={messages}
                    messageThread={messageThread}
                    uid = {uid}
                />
                <MessageForm
                    userMessage={userMessage}
                    dispatch={dispatch}
                />
            </div>
        );
    }
    componentWillUnmount()
    {
        this.props.dispatch(refreshMessage());
        this.props.dispatch(leaveInbox());
        this.props.dispatch(leaveRoom());
    }
}

const mapStateToProps = (state) => {
    return {
        uid : state.auth.uid,
        userMessage: state.userMessage,
        messages: state.messages,
        messageThread: state.messageThread
    }
};
export default connect(
    mapStateToProps
)(Message);