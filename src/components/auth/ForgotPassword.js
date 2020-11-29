import React, { useState } from 'react';
import Form from '../common/forms/Form';
import PrimaryButton from '../common/buttons/PrimaryButton';
import * as Yup from 'yup';
import InputField from '../common/forms/InputField';
import Link from '../common/Link';
import Axios from 'axios';

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState(false);

  const sendPasswordResetEmail = async (formValues) => {
    try {
      await Axios.post(
        'http://localhost:5000/api/users/send_reset_password',
        formValues
      );
    } catch (err) {
      console.error('Password reset email failed');
    }
    setEmailSent(true);
  };

  const initialValues = {
    email: '',
  };

  const resetSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Must provide an email'),
  });

  return emailSent ? (
    <>
      <h1>Email Sent!</h1>
      <p>Can't find the email?</p>
      <PrimaryButton
        title='Try again'
        onClick={() => {
          setEmailSent(false);
        }}
      />
    </>
  ) : (
    <>
      <h2>Reset your password.</h2>
      <p>Type your email to recieve a link to change your password.</p>
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
        <PrimaryButton title='Send Email' style={{ width: '100%' }} />
      </Form>
    </>
  );
}
