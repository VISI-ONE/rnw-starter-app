import React from 'react';
import { any } from 'prop-types';
import { connect } from 'react-redux';
import Routing from '../../utils/routing';

const { Route, Redirect } = Routing;

export const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={
      (props) => {
        if (isLoggedIn) {
          return <Component {...props} />;
        }
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        );
      }
    }
  />
);

PrivateRoute.propTypes = {
  component: any.isRequired,
};

export const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
