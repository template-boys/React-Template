import React from 'react';
import Form from '../common/forms/Form';
import PrimaryButton from '../common/buttons/PrimaryButton';
import * as Yup from 'yup';
import InputField from '../common/forms/InputField';
import Link from '../common/Link';

export default function PasswordReset() {
  const sendPasswordResetEmail = async (email) => {
    try {
      console.log(email);
      //TODO: RESET API CALL
    } catch (err) {}
  };

  const initialValues = {
    email: '',
  };

  const resetSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Must provide an email'),
  });

  return (
    <Form
      initialValues={initialValues}
      onSubmit={sendPasswordResetEmail}
      validationSchema={resetSchema}
      classes='login-form'
    >
      <InputField name='email' label='Email' />
      <div className='login-form-links'>
        <div className='login-form-item'>
          Change your mind? <Link to='/login'>Sign in.</Link>
        </div>
        <div className='login-form-item'>
          Don't have an account? <Link to='/register'>Sign up.</Link>
        </div>
      </div>
      <PrimaryButton title='Send' style={{ width: '100%' }} />
    </Form>
  );
}
