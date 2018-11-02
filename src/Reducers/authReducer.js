import * as types from '../Actions/authActionTypes';

const initialState = {
  isUserSignedIn: false,
  isInProgress: false,
  hasError: false,
  errorMessage: '',
  photoURL: '',
  displayName: '',
  uid: 0
};

export function auth(state = initialState, action) {
  const { user } = action;
  switch (action.type) {
    case types.FETCH_USER:
      if (user)
        return {
          ...state,
          isUserSignedIn: true,
          isInProgress: false,
          photoURL: user.photoURL,
          uid: user.uid,
          displayName: user.displayName
        }
      else
        return state;
    case types.SIGNIN_SUCCESS:
      return {
        ...state,
        isUserSignedIn: true,
        isInProgress: false,
        photoURL: user.photoURL,
        uid: user.uid,
        displayName: user.displayName
      };
    case types.SIGNIN:
      return {
        ...state,
        isInProgress: true
      };
    case types.SIGNIN_ERROR:
      const { errorMessage } = action;
      return {
        ...state,
        hasError: true,
        errorMessage
      };
    case types.LOG_OUT:
      return initialState;
    default:
      return state;
  }
}
