import { combineReducers } from 'redux';
import * as authReducers from './authReducer';


export default combineReducers({
    auth: authReducers.auth,

  });
  