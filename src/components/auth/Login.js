import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../../context/userContext';
import Axios from 'axios';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        'http://localhost:5000/api/users/login',
        loginUser
      );
      setUser(loginRes.data.user);
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      const errorMessage =
        err?.response?.data?.msg ??
        'Sorry, something went wrong. Please try again later.';
      setError(errorMessage);
    }
  };
  return (
    <div className="page">
      <h2>Welcome Back</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/password_reset">Forgotten Password</Link>

        <input type="submit" value="Log in" className="primaryButton" />
      </form>
    </div>
  );
}
