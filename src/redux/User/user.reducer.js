import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_REQUEST,
} from './user.types';

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
          isLoggedIn: true,
        },
        isLoginLoading: false,
      };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    case LOGIN_ERROR:
      return {};
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoginLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
