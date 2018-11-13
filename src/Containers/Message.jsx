import React, { Component } from 'react';
import { leaveInbox } from '../Actions/inboxActions';
import { leaveRoom } from '../Actions/roomActions';
import { connect } from 'react-redux';
import MessageForm from '../Components/MessageForm';
import MessageList from '../Components/MessageList';

export class Message extends Component {
  
    render() {
        const { dispatch, messageThread, uid } = this.props;

        return (
            <div id="message-box" className="bot">
                <MessageList
                    dispatch={dispatch}
                    messageThread={messageThread}
                    uid = {uid}
                />
                <MessageForm
                    messageThread={messageThread}
                    dispatch={dispatch}
                />
            </div>
        );
    }
    componentWillUnmount()
    {
        this.props.dispatch(leaveInbox());
        this.props.dispatch(leaveRoom());
    }
}

const mapStateToProps = (state) => {
    return {
        uid : state.firebase.auth.uid,
        messageThread: state.messageThread
    }
};
export default connect(
    mapStateToProps
)(Message);
