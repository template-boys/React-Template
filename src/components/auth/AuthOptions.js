import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logoutUser } from '../../redux/User/user.actions';

export default function AuthOptions() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    dispatch(logoutUser());
    localStorage.setItem('auth-token', '');
    history.push('/login');
  };

  return (
    <nav className='auth-options'>
      {user?.isLoggedIn ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </nav>
  );
}
