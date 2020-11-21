import React, { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute({ exact, path, component }) {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [history, user]);

  return (
    <div>
      <Route exact={exact} path={path} component={component} />
    </div>
  );
}
