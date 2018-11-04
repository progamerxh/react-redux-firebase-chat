import React, { Component } from 'react';
import { sendMessage } from '../Actions/messageActions';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({ message: e.target.value });
    }

    submitHandler(e) {
        e.preventDefault();
        if (this.state.message.trim !== '')
            this.props.dispatch(sendMessage(this.state.message));
        this.setState({ message: '' });
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
                        value={this.state.message}
                        onChange={this.handleChange} />
                </div>
            </form>
        );
    }
}

export default MessageForm;