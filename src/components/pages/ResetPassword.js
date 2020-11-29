import React, { useState } from 'react';
import Form from '../common/forms/Form';
import InputField from '../common/forms/InputField';
import PrimaryButton from '../common/buttons/PrimaryButton';
import * as Yup from 'yup';
import Axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function ResetPassword() {
  const [passwordResetFailed, setPasswordResetFailed] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const { slug } = useParams();

  const resetPassword = async ({ newPassword }) => {
    try {
      await Axios.post(
        'http://localhost:5000/api/users/reset_password',
        { newPassword },
        {
          headers: { 'reset-password-token': slug },
        }
      );
      setPasswordReset(true);
    } catch (e) {
      console.error('Password reset failed');
      setPasswordResetFailed(true);
    }
  };

  const controlNames = {
    newPassword: 'newPassword',
    verifyPassword: 'verifyPassword',
  };

  const initialValues = {
    [controlNames.newPassword]: '',
    [controlNames.verifyPassword]: '',
  };

  const resetPasswordSchema = Yup.object({
    [controlNames.newPassword]: Yup.string().required('Password is required'),
    [controlNames.verifyPassword]: Yup.string()
      .required('Required')
      .oneOf([Yup.ref(controlNames.newPassword), null], 'Passwords must match'),
  });

  return passwordReset ? (
    <>
      <h1>Password Reset!</h1>
      <p>
        Try to <Link to='/login'>sign in</Link> using your new password.
      </p>
    </>
  ) : (
    <Form
      initialValues={initialValues}
      onSubmit={resetPassword}
      validationSchema={resetPasswordSchema}
      classes='login-form'
    >
      <InputField
        type='password'
        name={controlNames.newPassword}
        label='New Password'
      />
      <InputField
        type='password'
        name={controlNames.verifyPassword}
        label='Verify Password'
      />
      {passwordResetFailed && (
        <div className='error'>Password reset failed</div>
      )}
      <PrimaryButton title='Reset Password' style={{ width: '100%' }} />
    </Form>
  );
}

export default ResetPassword;
