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
export const rooms = (state = [], action) => {
    const room = action.room;
    switch (action.type) {
        case types.RETRIEVE_ROOM:
            return [
                ...state,
                {
                    roomName: action.roomName,
                    tags: room.tags,
                    photoURL: room.photoURL
                }
            ];
        case types.REFRESH_ROOM:
            return state = [];
        default:
            return state;
    }
};

