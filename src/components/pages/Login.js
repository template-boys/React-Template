import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import { toggleTheme } from '../../redux/Settings/settings.actions';

export default function Login() {
  const dispatch = useDispatch();

  return (
    <div className='login-page'>
      <div className='page-item page-space page-title'>React Template</div>
      <div className='page-item page-form'>
        <div style={{ marginTop: '1rem', fontSize: '30px' }}>Login</div>
        <div style={{ marginTop: '1rem', fontSize: '15px' }}>
          Welcome back! Please login to your account.
        </div>
        <LoginForm />
        <button
          className='primaryButton'
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          Toggle Theme
        </button>
      </div>
    </div>
  );
}
