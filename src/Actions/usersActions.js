import * as types from './usersActionTypes';

export const retrieveUser = (uid, user) => {
  return {
    type: types.RETRIEVE_USER,
    uid,
    user
  }
};

export const refreshUser = () => {
  return {
    type: types.REFRESH_USER,
  }
};




