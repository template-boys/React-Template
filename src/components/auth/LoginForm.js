import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const { isLoginLoading } = useSelector((state) => state.userReducer);

  const history = useHistory();
  const dispatch = useDispatch();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userBody = { email, password };
      dispatch(loginUser(userBody));
      history.push('/');
    } catch (err) {
      // const errorMessage =
      //   err?.response?.data?.msg ??
      //   'Sorry, something went wrong. Please try again later.';
      // setError(errorMessage);
    }
  };

  return (
    <div>
      <form className='form login-form' onSubmit={submit}>
        <label htmlFor='login-email'>Email</label>
        <input
          id='login-email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor='login-password'>Password</label>
        <input
          id='login-password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to='/password_reset'>Forgot Password?</Link>
        {isLoginLoading ? (
          <div>Loading...</div>
        ) : (
          <input type='submit' value='Log in' className='primaryButton' />
        )}
      </form>
    </div>
  );
}
