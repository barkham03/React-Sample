import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import { render } from '@testing-library/react';
import { getToken } from './Common';

function PublicRoute({component: Component, ...rest}) {
    console.log(rest);
    // console.log(component);
    // console.log(props);
    return(
        <Route
        {...rest}
        render = {(props) => !getToken() ? <Component {...props} /> : <Redirect to={{pathname: '/dashboard'}} /> }
        />
    )
}

export default PublicRoute;