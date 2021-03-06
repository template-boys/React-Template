import React, { useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authPing } from '../../redux/User/user.actions';

export default function AuthorizedRoute({ exact, path, component }) {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        dispatch(authPing());
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
