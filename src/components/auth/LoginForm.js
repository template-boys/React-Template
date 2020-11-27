import React, { useState } from 'react';
import Link from '../common/Link';
import { loginUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoginLoading, loginFailed } = useSelector(
    (state) => state.userReducer
  );

  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(formValues) => {
        try {
          dispatch(loginUser(formValues));
        } catch (e) {
          console.error('Login failed');
        }
      }}
      validationSchema={loginSchema}
    >
      <Form className='form login-form'>
        <Field name='email'>
          {({ field, form: { touched, errors }, meta }) => (
            <div className='form-field'>
              <label className={meta.touched && meta.error ? 'error' : ''}>
                Email
              </label>
              <input
                className={meta.touched && meta.error ? 'error' : ''}
                type='text'
                {...field}
              />
              <ErrorMessage name='email'>
                {(message) => <div className='error'>{message}</div>}
              </ErrorMessage>
            </div>
          )}
        </Field>

        <Field name='password'>
          {({ field, form: { touched, errors }, meta }) => (
            <div className='form-field'>
              <label className={meta.touched && meta.error ? 'error' : ''}>
                Password
              </label>
              <input
                className={meta.touched && meta.error ? 'error' : ''}
                type='password'
                {...field}
              />
              <ErrorMessage name='password'>
                {(message) => <div className='error'>{message}</div>}
              </ErrorMessage>
            </div>
          )}
        </Field>

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
      </Form>
    </Formik>
  );
}
