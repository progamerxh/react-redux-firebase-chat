import React, { Component } from 'react';
import firebase from 'firebase'
import { sendMessage } from '../Actions/messageActions';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };

    }

    handleChange = e => {
        this.setState({ message: e.target.value });
    }

    handleSend() {
        this.props.dispatch(sendMessage(this.state.message));
    }

    handleKeyPress(event) {
        if (event.key !== 'Enter')
            return;
        this.props.dispatch(sendMessage(this.state.message));
        this.setState({ message: '' });
    }

    render() {

        return (
            <div className="send">
                <input type="textarea"
                    className="type"
                    placeholder="Type message..."
                    aria-label="Type message"
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress.bind(this)} />

                <button
                    className="sendbutton"
                    onClick={this.handleSend.bind(this)}
                >
                    send
                </button>
            </div>

        );
    }
}

export default MessageForm;