import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import Header from './components/common/header/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PasswordReset from './components/auth/PasswordReset';
import * as authUtil from './components/auth/utils/authUtils';
import { setUser } from './redux/User/user.actions';

import './style.scss';
import UserVerified from './components/pages/UserVerified';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import { useDispatch } from 'react-redux';

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.add(`theme-light`);
    const checkLoggedIn = async () => {
      const user = await authUtil.checkForLogin();
      if (!!user) {
        dispatch(setUser(user));
      }
    };
    checkLoggedIn();
  }, [history, dispatch]);

  return (
    <>
      <Header />
      <Switch>
        <PrivateRoute exact path='/' component={Home} />
        <PublicRoute path='/login' component={Login} />
        <PublicRoute path='/register' component={Register} />
        <Route path='/user_verified/:slug' component={UserVerified} />
        <Route path='/password_reset' component={PasswordReset} />
      </Switch>
    </>
  );
}
