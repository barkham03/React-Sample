import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route, NavLink} from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import SignIn from './Signup';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      removeUserSession();
      setAuthLoading(false);
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }

  return(
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <NavLink activeClassName="active" to="/">Signup</NavLink>
          <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
          <NavLink activeClassName="active" to="/dashboard">Dashboard<small>(Access with token only)</small></NavLink>
          <NavLink exact activeClassName="active" to="Home">Home</NavLink>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={SignIn} />
            <PublicRoute path="/login" component={Login} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PublicRoute path="/home" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
