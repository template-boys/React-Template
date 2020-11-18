import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from './user.types';
import axios from 'axios';

export const setUser = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const setLoginError = () => ({ type: LOGIN_ERROR });
export const logoutUser = () => ({ type: LOGOUT_SUCCESS });

export function loginUser(loginBody) {
  return async (dispatch) => {
    try {
      const response = await axios
        .post('http://localhost:5000/api/users/login', loginBody)
        .then((res) => res.data);
      localStorage.setItem('auth-token', response.token);
      return dispatch(setUser(response.user));
    } catch (e) {
      dispatch(setLoginError());
    }
  };
}
