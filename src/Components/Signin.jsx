import React, { Component } from "react";
import { connect } from "react-redux";
import logo from '../logo.svg';
import * as authActions from '../Actions/authActions';
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'
export class Signin extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        if (!this.props.isUserSignedIn) {
            return (
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>
                        Welcome to react-redux-firebase Chat App
                         </h2>
                    <div id="customBtn" className="customGPlusSignIn" onClick={this.props.onSignInClick}>
                        <span className="icon"></span>
                        <span className="buttonText">Sign in with Google</span>
                    </div>
                </header>
            );
        }
        return <Redirect to='/home' />

    }
}
const mapStateToProps = (state) => {
    return {
        isUserSignedIn: state.auth.isUserSignedIn,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        onSignInClick: () => {
            dispatch(authActions.signIn())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Signin);
