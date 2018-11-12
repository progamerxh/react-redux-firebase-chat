import React, { Component } from 'react';
import { connect } from 'react-redux';
import InboxList from './InboxList';
import { compose } from 'redux'
import Loading from './Loading';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

export class Inbox extends Component {
    render() {
        const { uid, users } = this.props;
        return (
            <div className="bot">
                {!isLoaded(users) ? (<Loading />)
                    : isEmpty(users) ? (
                        <h2>There's no users!</h2>
                    ) : (
                            <InboxList users={users} uid={uid} />
                        )}
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        uid: state.firebase.auth.uid,
        users: state.firebase.ordered.users,
    }
};
export default compose(
    firebaseConnect([
        { path: '/users', queryParams: ['orderByChild=firstName'] }
    ]),
    connect(mapStateToProps)
)(Inbox);
