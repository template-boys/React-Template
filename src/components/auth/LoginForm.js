import React, { useState } from 'react';
import Link from '../common/Link';
import { loginUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoginLoading, loginFailed } = useSelector(
    (state) => state.userReducer
  );

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: (formValues) => {
      try {
        dispatch(loginUser(formValues));
      } catch (e) {
        console.error('Login failed');
      }
    },
  });

  const emailError = !!(loginForm.touched.email && loginForm.errors.email);
  const passwordError = !!(
    loginForm.touched.password && loginForm.errors.password
  );

  return (
    <div>
      <form className='form login-form' onSubmit={loginForm.handleSubmit}>
        <div className='form-field'>
          <label className={emailError ? 'error' : ''} htmlFor='email'>
            Email
          </label>
          <input
            className={emailError ? 'error' : ''}
            id='email'
            name='email'
            type='text'
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.email}
          />
          {emailError && <div className='error'>{loginForm.errors.email}</div>}
        </div>
        <div className='form-field'>
          <label className={passwordError ? 'error' : null} htmlFor='password'>
            Password
          </label>
          <input
            className={passwordError ? 'error' : null}
            id='password'
            name='password'
            type='password'
            onChange={loginForm.handleChange}
            onBlur={loginForm.handleBlur}
            value={loginForm.values.password}
          />
          {passwordError && (
            <div className='error'>{loginForm.errors.password}</div>
          )}
        </div>
        {loginFailed && <div className='error'>Invalid credentials</div>}
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
