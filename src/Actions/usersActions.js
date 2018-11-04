import * as types from './usersActionTypes';

export const retrieveUser = (uid, user) => {
  return (dispatch, getState) => {
    var favList = getState().favList;
    for (let i = 0; i < favList.length; i++) {
      if (favList[i] === uid)
        user.isFav = true;
    }
    user.uid = uid;
    dispatch({
      type: types.RETRIEVE_USER,
      user
    })
  }
};

export const refreshUser = () => {
  return {
    type: types.REFRESH_USER,
  }
};




