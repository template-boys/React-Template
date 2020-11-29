import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Axios from 'axios';
import * as Yup from 'yup';

import { setUser } from '../../redux/User/user.actions';
import Form from '../common/forms/Form';
import InputField from '../common/forms/InputField';
import PrimaryButton from '../common/buttons/PrimaryButton';

export default function Register() {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialValues = {
    email: '',
    password: '',
    verifyPassword: '',
    displayName: '',
  };

  const registerSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
    verifyPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    displayName: Yup.string().required('Username is required'),
  });

  const handleSubmit = async ({ email, password, displayName }) => {
    try {
      const newUser = { email, password, name: displayName };
      await Axios.post('http://localhost:5000/api/users/register', newUser);
      const loginRes = await Axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        }
      );
      dispatch(setUser(loginRes?.data?.user));
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      console.error('Register failed');
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={registerSchema}
      classes='login-form'
    >
      <InputField name='email' label='Email' />
      <InputField name='password' label='Password' type='password' />
      <InputField
        name='verifyPassword'
        label='Verify Password'
        type='password'
      />
      <InputField name='displayName' label='Username' />
      <div className='login-form-links'>
        <div className='login-form-item'>
          Already have an account? <Link to='/login'>Sign in.</Link>
        </div>
        <div className='login-form-item'>
          <Link to='/forgot_password'>Forget Password?</Link>
        </div>
      </div>
      <PrimaryButton type='submit' title='Register' style={{ width: '100%' }} />
    </Form>
  );
}
