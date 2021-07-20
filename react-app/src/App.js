import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from '../src/components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Calendar from './components/Calendar'
import DropDown from './components/DropDown'
import GoogleMap from './components/GoogleMap'
import Venue from './components/Venue'
import { authenticate } from './store/session';
import Splash from "./components/SplashPage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar loaded= { loaded } />
      <Switch>
        <Route path='/calendar' exact={true}>
          <Calendar></Calendar>
        </Route>
        <Route path='/dropdown' exact={true}>
          <DropDown></DropDown>
        </Route>
        <Route path='/google-map' exact={true}>
          <GoogleMap></GoogleMap>
        </Route>
        <Route exact path='/venues'>
          <Venue></Venue>
        </Route>
        <Route exact path='/venues/:id'>
          <GoogleMap></GoogleMap>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/splash' exact={true} >
          <Splash />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <h1>My Home Page</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
