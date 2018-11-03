import * as types from './inboxActiontype';
import { refreshMessage } from './messageActions';
import { leaveRoom } from './roomActions';

export const joinInboxSuccess = (messageThread, user) => {
    return {
        type: types.INBOX_JOINED_IN,
        messageThread,
        user
    }
};

export const leaveInbox = () => {
    return {
        type: types.INBOX_LEFT,
    }
};
export const joinInbox = (user) => {
    return (dispatch, getState) => {
        dispatch(refreshMessage());
        dispatch(leaveRoom());
        const { uid } = getState().auth;
        let thread = (uid < user.uid) ? uid + user.uid : user.uid + uid;
        console.log(thread);
        if (uid !== 0) {
            dispatch(joinInboxSuccess(thread, user));
        }
    }
}

