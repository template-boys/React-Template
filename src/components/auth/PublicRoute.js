import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory } from 'react-router-dom';

export default function PublicRoute({ path, component }) {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user?.name) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <div>
      <Route path={path} component={component} />
    </div>
  );
}
