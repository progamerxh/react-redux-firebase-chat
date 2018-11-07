import React, { Component } from "react";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export class MessageRecieved extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgsrc: null,
        };
    }
    render() {
        const { fromMe, continous, isShowTime, message, timestone, firebase } = this.props;

        if (!this.state.imgsrc && message.filename)
            firebase.storage().ref(`images/${message.filename}`).getDownloadURL()
                .then(url => {
                    console.log(url);
                    this.setState({ imgsrc: url });
                });

        return (
            <li className={`${fromMe + continous}`}  >
                <div className="lapseday">
                    {(isShowTime) ? timestone : null}
                </div>
                <img className="avt" src={message.photoURL}></img>
                <div className='content'>
                    <h2>  {message.displayName} </h2>
                    {(message.message) ?
                        <p className="message">{message.message}</p>
                        : null} 
                    {(this.state.imgsrc) ? <img id="photo" src={this.state.imgsrc}></img>
                        : null}
                </div>
            </li>
        )
    }
}
export default firebaseConnect()(MessageRecieved)