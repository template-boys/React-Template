import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';

export default function AuthOptions() {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUser(null);
    localStorage.setItem('auth-token', '');
    history.push('/login');
  };

  return (
    <nav className='auth-options'>
      {user ? (
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
