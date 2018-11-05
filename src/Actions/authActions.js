import * as types from './authActionTypes';
import firebase from 'firebase';

export function absence() {
  return (dispatch, getState) => {
    const uid = getState().firebase.auth.uid;
    if (uid) {
      console.log(uid);
      firebase.database().ref().child(`users/${uid}`).update({
        isActive: false,
        lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP
      });
    }
  }
}

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

export const fetchUser = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.database().ref(`users/${user.uid}`).update(
        {
          isActive: true,
          lastTimeLoggedIn: firebase.database.ServerValue.TIMESTAMP,
        }
      )
      firebase.database().ref(`users/${user.uid}/favList`)
        .once('value', favList => {
          var _favList = [];
          favList.forEach(user => {
            if (user.val())
              _favList.push(user.key)
          })
          dispatch({
            type: types.GET_FAVLIST,
            favList: _favList
          });
        });
    }
    else
      dispatch({
        type: types.LOG_OUT,
      });
  });
};

