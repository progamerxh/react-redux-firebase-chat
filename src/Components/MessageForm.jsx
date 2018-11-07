import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            file: null,
            previewImgUrl: null,
        };
        this.submitHandler = this.submitHandler.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    generatePreviewImgUrl(file, callback) {
        const reader = new FileReader();
        const url = reader.readAsDataURL(file);
        reader.onloadend = e => callback(reader.result);
    }

    fileChangedHandler = (event) => {
        const file = event.target.files[0];
        if (!file) {
            return
        }
        this.generatePreviewImgUrl(file, previewImgUrl => {
            this.setState({ file, previewImgUrl });
        })
    }

    removeFileHandler() {
        this.setState({ file: null, previewImgUrl: null });
    }
    componentWillReceiveProps() {
        this.removeFileHandler();
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    submitHandler(e) {
        e.preventDefault();
        if (this.state.text.trim() !== "" | this.state.file != null) {
            const { auth, messageThread, firebase, userInbox } = this.props;
            const createdAt = Date.now();
            const file = this.state.file;
            var filename = null;
            if (file) {
                filename = file.name;
                const filesPath = `images/`;
                this.props.firebase.uploadFile(filesPath, file, filesPath);
            }
            console.log(filename)
            const message = {
                message: this.state.text,
                createdAt,
                photoURL: auth.photoURL,
                filename: filename,
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
        this.setState({ file: null, previewImgUrl: null, text: '' });
    }

    render() {

        return (
            <form onSubmit={this.submitHandler}>
                <div className="send">
                    <input id="uploadimage" type="file" onChange={this.fileChangedHandler} />
                    <label htmlFor="uploadimage" className="prefix mdi-image-image" />
                    {(this.state.previewImgUrl) ? (
                        <div className="previewimage">
                            <img src={this.state.previewImgUrl} />
                            <i className="mdi-navigation-close remove"
                                onClick={this.removeFileHandler.bind(this)}
                            ></i>
                        </div>
                    ) : null
                    }
                    <input type="text"
                        className="type"
                        placeholder="Type message..."
                        aria-label="Type message"
                        value={this.state.text}
                        onChange={this.handleChange} >


                    </input>

                </div>
            </form >
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