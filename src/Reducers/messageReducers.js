import * as inboxtypes from '../Actions/inboxActiontype'
import * as roomtypes from '../Actions/roomActionTypes'

export const messageThread = (state = "", action) => {
  switch (action.type) {
    case inboxtypes.INBOX_JOINED_IN:
      if (state !== action.messageThread)
        return action.messageThread;
      return state;
    case roomtypes.ROOM_JOINED_IN:
      if (state !== action.roomName)
        return action.roomName;
      return state;
    default:
      return state;
  }
};

