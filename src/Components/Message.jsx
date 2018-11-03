import React, { Component } from 'react';
import firebase from 'firebase';
import MessageForm from './MessageForm';
import { connect } from 'react-redux';
import MessageList from './MessageList';

export class Message extends Component {

  
    render() {
        const { dispatch, userMessage, messages, messageThread } = this.props;

        return (
            <div id="message-box" className="bot">
                <MessageList
                    dispatch={dispatch}
                    messages={messages}
                    messageThread={messageThread}
                />
                <MessageForm
                    userMessage={userMessage}
                    dispatch={dispatch}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userMessage: state.userMessage,
        messages: state.messages,
        messageThread: state.messageThread
    }
};
export default connect(
    mapStateToProps
)(Message);
