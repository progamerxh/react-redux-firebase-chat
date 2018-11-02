import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from 'react-router-dom'

export default function (ComposedComponent) {

  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    render() {
      console.log(this.props.isUserSignedIn);
      if (this.props.isUserSignedIn) {
        return <ComposedComponent {...this.props} />;
      }
      return <Redirect to='/' />
    }
  }

  function mapStateToProps(state) {
    return { isUserSignedIn: state.auth.isUserSignedIn, };
  }

  return connect(mapStateToProps)(Authentication);
}