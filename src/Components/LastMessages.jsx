import React, { Component } from 'react';
import { connect } from 'react-redux';
import InboxList from './InboxList';

export class LastMessages extends Component {
    render() {
        const { uid } = this.props;
        return (
            <InboxList uid={uid} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
    }
};
export default connect(
    mapStateToProps
)(LastMessages);
