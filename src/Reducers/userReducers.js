import * as types from '../Actions/usersActionTypes';
import { SET_FAV } from '../Actions/inboxActiontype'

export const users = (state = [], action) => {
    switch (action.type) {
        case SET_FAV:
            var users = state;
            for (let i = 0; i < users.length; i++) {
                if (users[i].uid === action.uid)
                    users[i].isFav = action.isFav;
            }
            return users;
        default:
            return state;
    }
};

export const searchUser = (state = '', action) => {
    switch (action.type) {
        case types.SEARCH_USER:
            return action.text;
        default:
            return state;
    }
};
