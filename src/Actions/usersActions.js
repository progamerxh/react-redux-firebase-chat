import * as types from './usersActionTypes';

export const searchUser = (text) => {
  return {
      type: types.SEARCH_USER,
      text
  }
};


