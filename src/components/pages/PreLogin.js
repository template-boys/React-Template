import React from 'react';
import { useDispatch } from 'react-redux';
import LoginForm from '../auth/LoginForm';
import { toggleTheme } from '../../redux/Settings/settings.actions';
import RegisterForm from '../auth/RegisterForm';
import { useRouteMatch } from 'react-router-dom';
import ForgotPassword from '../auth/ForgotPassword';
import Lottie from 'react-lottie';
import rocketJSON from '../../static/rocket.json';

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
    case '/forgot_password':
      form = <ForgotPassword />;
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

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: rocketJSON,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

export default function PreLogin() {
  const dispatch = useDispatch();
  const match = useRouteMatch();

  const dynamicContent = getDynamicContent(match.url);
  return (
    <div className='login-page'>
      <div className='page-item page-space page-title-container'>
        <div className='page-title'>dabr</div>
        <div className='page-helper-text'>Beautify your Slippi stats</div>
        <Lottie
          options={defaultOptions}
          isClickToPauseDisabled
          height={300}
          width={300}
          style={{ marginTop: '5rem' }}
        />
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
