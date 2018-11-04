import * as types from './messageActionTypes';
import firebase from 'firebase';


export const sendMessageInProgress = (payload) => {
  return {
    type: types.SEND_MESSAGE,
    ...payload
  }
};

export const sendMessageSuccess = () => {
  return {
    type: types.SEND_MESSAGE_SUCCESS
  }
};

export const sendMessageError = () => {
  return {
    type: types.SEND_MESSAGE_ERROR
  }
};

export const sendMessage = (message) => {
  return (dispatch, getState) => {
    const { uid, displayName, photoURL } = getState().firebase.auth;
    if (uid !== 0) {
      dispatch(sendMessageInProgress({ uid, displayName, photoURL, message }));
      let thread = getState().messageThread;
      firebase.database().ref(`messages/${thread}`).push({
        uid,
        displayName,
        photoURL,
        message,
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    } else {
      dispatch(sendMessageError());
    }
  }
};
