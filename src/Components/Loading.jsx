import React, { Component } from "react";
import logo from '../logo.svg';

export default class Loading extends Component {

    render() {
        return (
            <div className="loader">
                <img src={logo} className="App-logo" alt="logo" />
            </div>
        )
    }
}