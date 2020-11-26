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

export function checkForLogin() {
  return async (dispatch) => {
    let token = localStorage.getItem('auth-token');
    if (token === null || token === '') {
      localStorage.setItem('auth-token', '');
      token = '';
      dispatch(logoutUser());
    } else {
      let response;
      try {
        response = await axios.post(
          'http://localhost:5000/api/users/ping',
          null,
          { headers: { 'x-auth-token': token } }
        );
      } catch (error) {
        dispatch(logoutUser());
      }
      if (response) {
        dispatch(setUser(response?.data?.user));
      } else {
        dispatch(logoutUser());
      }
    }
  };
}
