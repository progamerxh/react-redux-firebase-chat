import * as types from './inboxActiontype';
import { leaveRoom } from './roomActions';
import firebase from 'firebase';

export const setFav = (userInbox) => {
    return (dispatch, getState) => {
        const uid = getState().firebase.auth.uid;
        const userInboxuid = userInbox.uid;
        if (userInbox.isFav)
            firebase.database().ref(`users/${uid}/favList`).child(userInboxuid).remove();
        else
            firebase.database().ref(`users/${uid}/favList`).child(userInboxuid).set(true);
        dispatch({
            type: types.SET_FAV,
            uid: userInbox.uid,
            isFav: !userInbox.isFav
        });
    }
};
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
        if (user !== getState().userInbox) {
            dispatch(leaveRoom());
            const { uid } = getState().firebase.auth;
            let thread = (uid < user.uid) ? uid + user.uid : user.uid + uid;
            if (uid !== 0) {
                dispatch(joinInboxSuccess(thread, user));
            }
        }
    }
}

