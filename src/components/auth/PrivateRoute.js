import React, { useEffect, useContext } from "react";
import UserContext from "../../context/userContext";
import { Route, useHistory } from "react-router-dom";

export default function PrivateRoute({ exact, path, component }) {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <div>
      <Route exact={exact} path={path} component={component} />
    </div>
  );
}
