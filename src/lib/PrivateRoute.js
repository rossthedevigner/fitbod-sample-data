import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      rest.isAuthenticated
        ? <Component {...props} {...rest} />
        : <Redirect
            to={`/login?redirect=${props.location.pathname}`}
          />}
  />;