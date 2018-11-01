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
