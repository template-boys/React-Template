import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import { toggleTheme } from '../../redux/Settings/settings.actions';
import RegisterForm from '../auth/RegisterForm';

export default function Login(props) {
  const dispatch = useDispatch();
  const isRegistering = props.match.url === '/register';

  const welcomeText = isRegistering ? 'Create an Account' : 'Login';
  const wlecomeHelper = isRegistering
    ? 'Please fill out your details below.'
    : 'Welcome back! Please login to your account.';

  return (
    <div className='login-page'>
      <div className='page-item page-space page-title'>React Template</div>
      <div className='page-item page-form'>
        <div style={{ marginTop: '1rem', fontSize: '30px' }}>{welcomeText}</div>
        <div style={{ marginTop: '1rem', fontSize: '15px' }}>
          {wlecomeHelper}
        </div>
        {isRegistering ? <RegisterForm /> : <LoginForm />}
        <button
          className='secondary-button'
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          <div>Toggle Theme</div>
        </button>
      </div>
    </div>
  );
}
