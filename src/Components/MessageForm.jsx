import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    submitHandler(e) {
        console.log(new Date().valueOf());
        e.preventDefault();
        if (this.state.text.trim() !== "") {
            const { auth, messageThread, firebase, userInbox } = this.props;
            const createdAt = Date.now();
            const message = {
                message: this.state.text,
                createdAt,
                photoURL: auth.photoURL,
                displayName: auth.displayName,
                uid: auth.uid
            };
            firebase.push(`messages/${messageThread}`, message);
            if (userInbox) {
                firebase.set(`lastmessages/${auth.uid}/${userInbox.uid}`,
                    {
                        createdAt, message: message.message, user: {
                            avatarUrl: userInbox.avatarUrl,
                            displayName: userInbox.displayName,
                            email: userInbox.email,
                            uid: userInbox.uid,
                        }
                    });
                firebase.set(`lastmessages/${userInbox.uid}/${auth.uid}`,
                    {
                        createdAt, message: message.message, user: {
                            avatarUrl: auth.photoURL,
                            displayName: auth.displayName,
                            email: auth.email,
                            uid: auth.uid
                        }
                    });
            }

        }
        this.setState({ text: '' });
    }

    render() {

        return (
            <form onSubmit={this.submitHandler}>
                <div className="send">
                    <i className="prefix mdi-communication-chat" />
                    <input type="text"
                        className="type"
                        placeholder="Type message..."
                        aria-label="Type message"
                        value={this.state.text}
                        onChange={this.handleChange} />
                </div>
            </form>
        );
    }
}

export default compose(
    firebaseConnect(),
    connect((state) => ({
        auth: state.firebase.auth,
        userInbox: state.userInbox
    }))
)(MessageForm)