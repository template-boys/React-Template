import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { checkForLogin } from '../../redux/User/user.actions';

export default function PublicRoute({ path, component, location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        dispatch(checkForLogin());
      }
    };
    checkLoggedIn();
  }, [history, dispatch, user]);

  const { from } = location.state || { from: { pathname: '/' } };

  return user ? (
    <Redirect to={from} />
  ) : (
    <div>
      <Route path={path} component={component} />
    </div>
  );
}
