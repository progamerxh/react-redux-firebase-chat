import * as types from './authActionTypes';
import firebase from 'firebase';

function signInSuccess(user) {
  return {
    type: types.SIGNIN_SUCCESS,
    user
  }
}

function signInInProgress() {
  return {
    type: types.SIGNIN
  }
}

function signInError(errorMessage) {
  return {
    type: types.SIGNIN_ERROR,
    errorMessage
  }
}

export function logout() {
  return (dispatch, getState) => {
    firebase.database().ref().child(`users/${getState().auth.uid}`).update({
      isActive: false,
      lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
    });
    dispatch({
      type: types.LOG_OUT,
    });
    firebase.auth().signOut();
  }
}

export const fetchUser = () => dispatch => {
  dispatch(signInInProgress());
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(signInSuccess(user));
    }
    else
      dispatch({
        type: types.LOG_OUT,
      });
  });
};

export function signIn() {
  return (dispatch) => {
    dispatch(signInInProgress());
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const { user: { uid, displayName, photoURL, email } } = result;
        firebase.database().ref(`users/${uid}`).set({
          isActive: true,
          displayName,
          photoURL,
          email,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
        });
        dispatch(signInSuccess(result.user));
      })
      .catch((error) => {
        dispatch(signInError(error.message))
      });
  }
}
