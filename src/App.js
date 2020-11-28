import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/common/header/Header';
import {
  Home,
  Login,
  Register,
  NotFound,
  UserVerified,
} from './components/pages/index';
import PasswordReset from './components/auth/PasswordReset';
import { toggleTheme } from './redux/Settings/settings.actions';
import AuthorizedRoute from './components/auth/AuthorizedRoute';
import PurePublicRoute from './components/auth/PurePublicRoute';
import './style.scss';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //set theme from local storage or default to light
    let theme = localStorage.getItem('theme');
    dispatch(toggleTheme(!theme ? 'light' : theme));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <AuthorizedRoute exact path='/' component={Home} />
        <PurePublicRoute path='/login' component={Login} />
        <PurePublicRoute path='/register' component={Login} />
        <Route path='/user_verified/:slug' component={UserVerified} />
        <Route path='/password_reset' component={PasswordReset} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
