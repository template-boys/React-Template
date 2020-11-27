import React, { useEffect, useState } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authPing } from '../../redux/User/user.actions';

export default function AuthorizedRoute({ exact, path, component }) {
  const history = useHistory();
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const [isPinging, setIsPinging] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (!user) {
        dispatch(authPing()).then(() => {
          setIsPinging(false);
        });
      }
    };
    checkLoggedIn();
  }, [history, dispatch, user]);

  if (isPinging) {
    return null;
  } else if (!!user) {
    return (
      <div>
        <Route exact={exact} path={path} component={component} />
      </div>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: history?.location?.pathname || '/' },
        }}
      />
    );
  }
}
