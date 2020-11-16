import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";

import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PasswordReset from "./components/auth/PasswordReset";
import UserContext from "./context/userContext";
import * as authUtil from "./components/auth/authUtil";

import "./style.css";
import UserVerified from "./components/auth/UserVerified";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";

export default function App() {
  const history = useHistory();
  const [user, setUser] = useState();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await authUtil.checkForLogin();
      if (!!user) {
        setUser(user);
      }
    };
    checkLoggedIn();
  }, [history]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <div className="container">
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/user_verified/:slug" component={UserVerified} />
            <Route path="/password_reset" component={PasswordReset} />
          </Switch>
        </div>
      </UserContext.Provider>
    </>
  );
}
