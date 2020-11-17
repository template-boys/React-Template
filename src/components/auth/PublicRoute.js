import React, { useContext, useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import userContext from '../../context/userContext';

export default function PublicRoute({ path, component }) {
  const history = useHistory();
  const { user } = useContext(userContext);

  useEffect(() => {
    if (!!user) {
      history.push('/');
    }
  }, [history, user]);

  return (
    <div>
      <Route path={path} component={component} />
    </div>
  );
}
