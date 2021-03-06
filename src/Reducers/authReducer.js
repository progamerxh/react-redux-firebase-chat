import * as types from '../Actions/authActionTypes';
import { SET_FAV } from '../Actions/inboxActiontype'


export function favList(state = [], action) {
  switch (action.type) {
    case types.GET_FAVLIST:
      return action.favList
    case SET_FAV:
      var favList = state;
      for (let i = 0; i < favList.length; i++) {
        if (favList[i] === action.uid && !action.isFav)
          favList.splice(i, 1);
      }
      if (action.isFav)
        favList.push(action.uid);
      return favList;
    default:
      return state;
  }
}
