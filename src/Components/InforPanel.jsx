import React, { Component } from 'react';
import * as authActions from '../Actions/authActions';
import { setFav } from '../Actions/inboxActions'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';

export class InforPanel extends Component {
    static contextTypes = {
        firebase: PropTypes.shape({
            logout: PropTypes.func.isRequired
        }),
    };
    render() {
        const { dispatch, userInbox, roomName, auth, firebase } = this.props;
        const fav = (userInbox && userInbox.isFav) ? ' fa-star' : ' fa-star-o';
        return (
            <div className="top">
                {(roomName !== '') ? (
                    <div className="title">
                        <div className="name">{roomName}</div>
                    </div>

                ) : (null)}
                {(userInbox !== '') ? (
                    <div className="title"                       >
                        <img className="avt" src={userInbox.avatarUrl}></img>
                        <div className="name">{userInbox.displayName}</div>
                        <div className={`fav fa ${fav}`}
                            onClick={() => {
                                 dispatch(setFav(userInbox));
                                 }}
                        >
                        </div>
                        <div className="lastmessage">
                        </div>
                    </div>
                ) : (null)
                }

                <div className="account">
                    <img className="avt"
                        src={auth.photoURL}
                        alt={auth.displayName}
                    />
                    <Link to='/'>
                        <button
                            className="button"
                            onClick={() => { 
                                dispatch(authActions.logout());
                                firebase.logout();
                             }}>
                            Logout
                        </button>
                    </Link>
                </div>
            </div >
        )
    }

}

const mapStateToProps = state => {
    return {
        auth: state.firebase.auth,
        roomName: state.roomName,
        userInbox: state.userInbox
    }
};


export default compose(
    firebaseConnect(),
    connect(
        mapStateToProps,
    )
)(InforPanel);