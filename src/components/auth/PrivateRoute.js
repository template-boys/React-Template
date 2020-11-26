import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkForLogin } from '../../redux/User/user.actions';

export default function PrivateRoute({ exact, path, component }) {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        dispatch(checkForLogin());
      }
    };
    checkLoggedIn();
  }, [history, dispatch, user]);

  return !!user ? (
    <div>
      <Route exact={exact} path={path} component={component} />
    </div>
  ) : (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: history?.location?.pathname || '/' },
      }}
    />
  );
}
