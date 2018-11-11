import React, { Component } from "react";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export class MessageRecieved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgsrc: null,
        };
    }

    componentDidMount() {
        var text = this.props.message.message;
        var urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        text.replace(urlRegex, (url) => {
            if (url.match(/\.(jpeg|jpg|gif|png)/) !== null)
            this.setState({imgsrc:url});
        });
    }

    render() {
        const { fromMe, continous, isShowTime, message, timestone, firebase } = this.props;

        if (!this.state.imgsrc && message.filename)
            firebase.storage().ref(`images/${message.filename}`).getDownloadURL()
                .then(url => {
                    this.setState({ imgsrc: url });
                });

        return (
            <li className={`${fromMe + continous}`}  >
                <div className="lapseday">
                    {(isShowTime) ? timestone : null}
                </div>
                <img className="avt" src={message.photoURL}></img>
                <div className='content' >
                    <h2>  {message.displayName} </h2>
                    {(message.message) ?
                        <p className="message"> {message.message}</p>
                        : null}
                    {(this.state.imgsrc) ? (
                        <a href={this.state.imgsrc} target="_blank">
                            <img id="photo" alt={this.state.imgsrc} src={this.state.imgsrc}
                            ></img>
                        </a>
                    ) : null}
                </div>
            </li>
        )
    }
}
export default firebaseConnect()(MessageRecieved)