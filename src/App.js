import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/common/header/Header';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PasswordReset from './components/auth/PasswordReset';
import UserVerified from './components/pages/UserVerified';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import './style.scss';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add(`theme-light`);
  }, []);

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
