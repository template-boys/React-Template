import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from './components/common/header/Header';
import {
  Home,
  PreLogin,
  NotFound,
  UserVerified,
} from './components/pages/index';
import { toggleTheme } from './redux/Settings/settings.actions';
import AuthorizedRoute from './components/auth/AuthorizedRoute';
import PurePublicRoute from './components/auth/PurePublicRoute';
import './style.scss';
import ResetPassword from './components/pages/ResetPassword';

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
        <PurePublicRoute path='/login' component={PreLogin} />
        <PurePublicRoute path='/register' component={PreLogin} />
        <Route path='/user_verified/:slug' component={UserVerified} />
        <Route path='/reset_password/:slug' component={ResetPassword} />
        <Route path='/forgot_password' component={PreLogin} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}
