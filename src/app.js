import React, { useState, useEffect } from 'react';

import { useAuth } from './auth/provider';
import { Login } from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './lib/PrivateRoute';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);

  const { ...userState } = useAuth();

  const appState = {
    ...userState,
    isAuthenticated,
    setAuthenticated,
    isLoading
  };
  useEffect(() => {
    if (userState.user) {
      setAuthenticated(true);
    }
  }, [appState.user]);

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path={['/', '/login']}
            exact
            render={(props) =>
              isAuthenticated ? (
                <Redirect to={`/profile/${appState.user.id}`} />
              ) : (
                <Login {...props} onSubmit={userState.login} {...appState} />
              )
            }
          />
          <PrivateRoute
            strict
            path={['/profile/:user']}
            component={Dashboard}
            {...appState}
          />

          <Route render={(props) => <div>Not Found</div>} />
        </Switch>
      </div>
    </Router>
  );
};

export { App };
