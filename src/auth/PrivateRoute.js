// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

// Private Routes only for authorized users
const PrivateRoute = ({ component: Component, ...rest }) => (

    // Props will be components passed down to this component
    <Route {...rest} render={props => isAuthenticated() ? (
        <Component {...props} />
    ) : (
            <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )} />
);

export default PrivateRoute;
