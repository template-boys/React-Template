import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGIN_REQUEST,
} from './user.types';
import axios from 'axios';

export const setUser = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const setLoginError = () => ({ type: LOGIN_ERROR });
export const logoutUser = () => ({ type: LOGOUT_SUCCESS });
export const loginLoading = () => ({ type: LOGIN_REQUEST });

export function loginUser(loginBody) {
  return async (dispatch) => {
    try {
      dispatch(loginLoading());
      const response = await axios
        .post('http://localhost:5000/api/users/login', loginBody)
        .then((res) => res.data);
      localStorage.setItem('auth-token', response.token);
      dispatch(setUser(response.user));
    } catch (e) {
      dispatch(setLoginError());
    }
  };
}

export function authPing() {
  return async (dispatch) => {
    let token = localStorage.getItem('auth-token');
    if (!token) {
      dispatch(logoutUser());
    } else {
      try {
        const response = await axios.post(
          'http://localhost:5000/api/users/ping',
          null,
          { headers: { 'x-auth-token': token } }
        );
        dispatch(setUser(response?.data?.user));
      } catch (error) {
        dispatch(logoutUser());
      }
    }
  };
}
