import * as types from '../Actions/usersActionTypes';
import { SET_FAV } from '../Actions/inboxActiontype'

export const users = (state = [], action) => {
    console.log(action);
    switch (action.type) {
        case types.RETRIEVE_USER:
            const { user } = action;
            var users = state.slice();
            if (user.isFav && user.isActive)
                users.unshift(user);
            else
                users.push(user);
            return users;
        case types.REFRESH_USER:
            return state = [];
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

