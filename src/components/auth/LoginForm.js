import React from 'react';
import Link from '../common/Link';
import { loginUser } from '../../redux/User/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import InputField from '../common/forms/InputField';
import Form from '../common/forms/Form';
import PrimaryButton from '../common/buttons/PrimaryButton';

export default function Login() {
  const dispatch = useDispatch();
  const { isLoginLoading, loginFailed } = useSelector(
    (state) => state.userReducer
  );

  const loginSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = (formValues) => {
    try {
      dispatch(loginUser(formValues));
    } catch (e) {
      console.error('Login failed');
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
      classes='login-form'
    >
      <InputField name='email' label='Email' />
      <InputField name='password' label='Password' />

      {loginFailed && <div className='error'>Invalid credentials</div>}

      <div className='login-form-links'>
        <div className='login-form-item'>
          Don't have an account? <Link to='/register'>Sign up.</Link>
        </div>
        <div className='login-form-item'>
          <Link to='/password_reset'>Forget Password?</Link>
        </div>
      </div>
      <PrimaryButton
        isDataLoading={isLoginLoading}
        type='submit'
        title='Log in'
        style={{ width: '100%' }}
      />
    </Form>
  );
}
