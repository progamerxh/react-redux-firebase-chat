import * as types from '../Actions/roomActionTypes'


export const roomName = (state = "", action) => {
    switch (action.type) {
        case types.ROOM_JOINED_IN:
            return action.roomName;
        case types.ROOM_LEFT:
            return '';
        default:
            return state;
    }
};

