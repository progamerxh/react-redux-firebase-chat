import * as types from './usersActionTypes';

export const retrieveUser = (uid, user) => {
  return {
    type: types.RETRIEVE_USER,
    uid,
    user
  }
};




