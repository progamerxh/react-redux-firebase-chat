import * as types from '../Actions/usersActionTypes';
import { SET_FAV } from '../Actions/inboxActiontype'

export const searchUser = (state = '', action) => {
    switch (action.type) {
        case types.SEARCH_USER:
            return action.text;
        default:
            return state;
    }
};
