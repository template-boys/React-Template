import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import { toggleTheme } from '../../redux/Settings/settings.actions';
import RegisterForm from '../auth/RegisterForm';
import { useRouteMatch } from 'react-router-dom';
import PasswordReset from '../auth/PasswordResetForm';

const getDynamicContent = (url) => {
  let title;
  let helper;
  let form;
  switch (url) {
    case '/register':
      helper = 'Please fill out your details below.';
      title = 'Create an Account';
      form = <RegisterForm />;
      break;
    case '/password_reset':
      title = 'Reset Your Password';
      helper = 'Type your email to recieve a link to change your password.';
      form = <PasswordReset />;
      break;
    case '/login':
      title = 'Login';
      helper = 'Welcome back! Please login to your account.';
      form = <LoginForm />;
      break;
    default:
      break;
  }
  return { title, helper, form };
};

export default function Login() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const dynamicContent = getDynamicContent(match.url);
  return (
    <div className='login-page'>
      <div className='page-item page-space page-title-container'>
        <div className='page-title'>peppi.</div>
        <div className='page-helper-text'>Beautify your Slippi stats</div>
      </div>

      <div className='page-item page-form'>
        <div style={{ marginTop: '1rem', fontSize: '30px' }}>
          {dynamicContent.title}
        </div>
        <div style={{ marginTop: '1rem', fontSize: '15px' }}>
          {dynamicContent.helper}
        </div>
        {dynamicContent.form}
        {/* <button
          className='secondary-button'
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          <div>Toggle Theme</div>
        </button> */}
      </div>
    </div>
  );
}
