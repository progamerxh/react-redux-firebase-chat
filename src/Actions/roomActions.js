import * as types from './roomActionTypes';

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

