import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'
import * as authReducers from './authReducer';
import * as messageReducers from './messageReducers';
import * as userReducers from './userReducers';
import * as roomReducer from './roomReducer';
import * as inboxReducer from './inboxReducer';

export default combineReducers({
  firebase: firebaseReducer,
  favList: authReducers.favList,
  messageThread: messageReducers.messageThread,
  users: userReducers.users,
  userInbox: inboxReducer.userInbox,
  roomName: roomReducer.roomName
});
