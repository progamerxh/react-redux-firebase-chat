import * as types from './roomActionTypes';

export const retrieveRoom = (roomName, room) => {
  return {
    type: types.RETRIEVE_ROOM,
    roomName,
    room
  }
};

export const joininRoom = (roomName) => {
  return {
    type: types.ROOM_JOINED_IN,
    roomName
  }
};

export const leaveRoom = () => {
  return {
    type: types.ROOM_LEFT,
  }
};
export const refreshRoom = () => {
  return {
    type: types.REFRESH_ROOM,
  }
};

