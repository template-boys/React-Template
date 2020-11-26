import React, { useState } from 'react';
import Link from '../common/Link';
import { loginUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoginLoading } = useSelector((state) => state.userReducer);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userBody = { email, password };
      dispatch(loginUser(userBody));
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
        <div className='login-form-links'>
          <div className='login-form-item'>
            Don't have an account? <Link to='/register'>Sign up.</Link>
          </div>
          <div className='login-form-item'>
            <Link to='/password_reset'>Forget Password?</Link>
          </div>
        </div>
        {isLoginLoading ? (
          <div>Loading...</div>
        ) : (
          <input type='submit' value='Log in' className='primary-button' />
        )}
      </form>
    </div>
  );
}
