import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {getToken} from './Common';

//handle Private Routes
function PrivateRoute({component: Component, ...rest}) {
    console.log(rest);
    console.log(Component);
    // console.log(props);
    return(
    <Route 
    {...rest}
    render={(props) => getToken() ? <Component {...props} /> : <Redirect to = {{ pathmame: '/login', state: {from: props.location } }} />}
    />
    )
}

export default PrivateRoute;