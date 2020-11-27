import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { authPing } from '../../redux/User/user.actions';

export default function PurePublicRoute({ path, component, location }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
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

  const { from } = location.state || { from: { pathname: '/' } };

  if (user) {
    return <Redirect to={from} />;
  } else if (isPinging) {
    return null;
  } else {
    return (
      <div>
        <Route path={path} component={component} />
      </div>
    );
  }
}
