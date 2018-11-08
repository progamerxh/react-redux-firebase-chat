import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import Loading from './Loading';
import { Link } from "react-router-dom";

export default class Inbox extends Component {
    render() {
        const { inbox } = this.props;
        return (
            <Link to={`/inbox/${inbox.uid}`}>
                <li className={`item `} onClick={() => {
                    // dispatch(joinInbox(user));
                }}>
                    <img className="avt"></img>
                    <div className="content">
                        <div className="name"></div>
                        <div className="lastmessage">
                            {inbox.message}
                        </div>
                    </div>
                </li>
            </Link>
        );
    }
}


