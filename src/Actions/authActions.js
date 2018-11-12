import * as types from './authActionTypes';
import firebase from 'firebase';

export function logout() {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    if (uid) {
      firebase.database().ref().child(`users/${uid}`).update({
        isActive: false,
        lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
      });
    }
    dispatch({
      type: types.LOG_OUT,
    });
    firebase.auth().signOut();
  }
}

