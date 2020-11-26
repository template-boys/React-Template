import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { authPing } from '../../redux/User/user.actions';

export default function PurePublicRoute({ path, component, location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        dispatch(authPing());
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
